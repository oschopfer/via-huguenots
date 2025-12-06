#!/usr/bin/env python3
"""
Script pour extraire les coordonnées du chemin huguenot et créer des fichiers
utilisables pour identifier les communes traversées.
"""

import xml.etree.ElementTree as ET
import json
import math
from pathlib import Path
from typing import List, Tuple, Dict, Set
from collections import defaultdict

# Namespace pour les fichiers GPX
GPX_NS = {'gpx': 'http://www.topografix.com/GPX/1/1'}

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calcule la distance en mètres entre deux points GPS."""
    R = 6371000  # Rayon de la Terre en mètres

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi/2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c

def parse_gpx_file(gpx_path: Path) -> Tuple[str, List[Tuple[float, float]]]:
    """Parse un fichier GPX et retourne le nom et une liste de coordonnées."""
    tree = ET.parse(gpx_path)
    root = tree.getroot()

    # Extraire le nom du tracé
    name_elem = root.find('.//gpx:name', GPX_NS)
    track_name = name_elem.text if name_elem is not None else gpx_path.stem

    coordinates = []

    # Extraire tous les trackpoints
    for trkpt in root.findall('.//gpx:trkpt', GPX_NS):
        lat = float(trkpt.get('lat'))
        lon = float(trkpt.get('lon'))
        coordinates.append((lat, lon))

    return track_name, coordinates

def sample_coordinates(coordinates: List[Tuple[float, float]], min_distance: float = 1000) -> List[Tuple[float, float]]:
    """Échantillonne les coordonnées (un point tous les min_distance mètres)."""
    if not coordinates:
        return []

    sampled = [coordinates[0]]  # Toujours inclure le premier point

    for coord in coordinates[1:]:
        last_sampled = sampled[-1]
        distance = haversine_distance(last_sampled[0], last_sampled[1], coord[0], coord[1])

        if distance >= min_distance:
            sampled.append(coord)

    # Toujours inclure le dernier point
    if coordinates[-1] != sampled[-1]:
        sampled.append(coordinates[-1])

    return sampled

def extract_city_names_from_filename(filename: str) -> List[str]:
    """Extrait les noms de villes probables depuis le nom du fichier."""
    # Enlever l'extension et les préfixes
    name = filename.replace('.gpx', '').replace('wf', '')

    # Patterns courants dans les noms de fichiers
    cities = []

    # Séparer les parties en camelCase ou par tirets
    import re
    parts = re.findall(r'[A-Z][a-z]+|[0-9]+', name)

    # Filtrer les nombres et garder les noms
    for part in parts:
        if not part.isdigit() and len(part) > 2:
            cities.append(part)

    return cities

# Mapping manuel basé sur la connaissance géographique des étapes
KNOWN_MUNICIPALITIES = {
    'Genève': {'canton': 'GE', 'coords': (46.2044, 6.1432)},
    'Versoix': {'canton': 'GE', 'coords': (46.2847, 6.1622)},
    'Nyon': {'canton': 'VD', 'coords': (46.3833, 6.2389)},
    'Rolle': {'canton': 'VD', 'coords': (46.4564, 6.3381)},
    'Morges': {'canton': 'VD', 'coords': (46.5107, 6.4987)},
    'Cossonay': {'canton': 'VD', 'coords': (46.6138, 6.5116)},
    'Romainmôtier': {'canton': 'VD', 'coords': (46.6938, 6.4650)},
    'Orbe': {'canton': 'VD', 'coords': (46.7241, 6.5313)},
    'Yverdon-les-Bains': {'canton': 'VD', 'coords': (46.7784, 6.6410)},
    'Neuchâtel': {'canton': 'NE', 'coords': (47.0000, 6.9300)},
    'Berne': {'canton': 'BE', 'coords': (46.9480, 7.4474)},
    'Bern': {'canton': 'BE', 'coords': (46.9480, 7.4474)},
    'Aarberg': {'canton': 'BE', 'coords': (47.0447, 7.2757)},
    'Büren an der Aare': {'canton': 'BE', 'coords': (47.1356, 7.3644)},
    'Solothurn': {'canton': 'SO', 'coords': (47.2084, 7.5371)},
    'Aarau': {'canton': 'AG', 'coords': (47.3905, 8.0464)},
    'Lenzburg': {'canton': 'AG', 'coords': (47.3888, 8.1784)},
    'Brugg': {'canton': 'AG', 'coords': (47.4862, 8.2099)},
    'Baden': {'canton': 'AG', 'coords': (47.4745, 8.3064)},
    'Zürich': {'canton': 'ZH', 'coords': (47.3769, 8.5417)},
    'Zurich': {'canton': 'ZH', 'coords': (47.3769, 8.5417)},
    'Kloten': {'canton': 'ZH', 'coords': (47.4515, 8.5847)},
    'Eglisau': {'canton': 'ZH', 'coords': (47.5729, 8.5264)},
    'Schaffhausen': {'canton': 'SH', 'coords': (47.6974, 8.6345)},
    'Winterthur': {'canton': 'ZH', 'coords': (47.5006, 8.7243)},
    'Elgg': {'canton': 'ZH', 'coords': (47.4965, 8.8724)},
    'Stein am Rhein': {'canton': 'SH', 'coords': (47.6596, 8.8596)},
    'Chancy': {'canton': 'GE', 'coords': (46.1485, 5.9720)},
    'Barzheim': {'canton': 'DE', 'coords': (47.7, 8.7)},  # Allemagne
    'Murten': {'canton': 'FR', 'coords': (46.9284, 7.1119)},
    'Morat': {'canton': 'FR', 'coords': (46.9284, 7.1119)},
    'Ins': {'canton': 'BE', 'coords': (47.0069, 7.1069)},
    'Gummenen': {'canton': 'BE', 'coords': (46.9827, 7.2377)},
    'Zofingen': {'canton': 'AG', 'coords': (47.2878, 7.9453)},
    'Aarwangen': {'canton': 'BE', 'coords': (47.2368, 7.7682)},
    'Staubin': {'canton': 'VD', 'coords': (46.8220, 6.6780)},
}

def find_closest_known_municipality(lat: float, lon: float, max_distance_km: float = 10.0) -> str:
    """Trouve la commune connue la plus proche d'un point donné."""
    closest = None
    min_dist = float('inf')

    for mun_name, mun_data in KNOWN_MUNICIPALITIES.items():
        mun_lat, mun_lon = mun_data['coords']
        dist = haversine_distance(lat, lon, mun_lat, mun_lon)

        if dist < min_dist:
            min_dist = dist
            closest = (mun_name, mun_data['canton'], dist)

    # Seulement retourner si la distance est raisonnable (< max_distance_km)
    if closest and min_dist < max_distance_km * 1000:
        return f"{closest[0]} ({closest[1]}) - {min_dist/1000:.1f}km"

    return None

def main():
    """Fonction principale."""
    gpx_dir = Path('/home/user/via-huguenots/gpx')
    gpx_files = sorted(gpx_dir.glob('*.gpx'))

    print(f"Analyse de {len(gpx_files)} fichiers GPX...\n")

    all_routes = []
    all_sampled_points = []
    municipalities_found = set()

    for gpx_file in gpx_files:
        print(f"Traitement de {gpx_file.name}...")

        # Parser le fichier GPX
        track_name, coordinates = parse_gpx_file(gpx_file)
        print(f"  Nom: {track_name}")
        print(f"  Points GPS: {len(coordinates)}")

        # Échantillonner les coordonnées
        sampled = sample_coordinates(coordinates, min_distance=1000)
        print(f"  Points échantillonnés (1 tous les 1km): {len(sampled)}")

        # Coordonnées de début et fin
        if coordinates:
            start = coordinates[0]
            end = coordinates[-1]
            print(f"  Début: {start[0]:.4f}, {start[1]:.4f}")
            print(f"  Fin: {end[0]:.4f}, {end[1]:.4f}")

            # Chercher les communes connues proches du début et de la fin
            start_mun = find_closest_known_municipality(start[0], start[1])
            end_mun = find_closest_known_municipality(end[0], end[1])

            if start_mun:
                print(f"  Proche du début: {start_mun}")
                municipalities_found.add(start_mun.split(' (')[0])
            if end_mun:
                print(f"  Proche de la fin: {end_mun}")
                municipalities_found.add(end_mun.split(' (')[0])

        print()

        # Sauvegarder les données
        all_routes.append({
            'file': gpx_file.name,
            'name': track_name,
            'points_count': len(coordinates),
            'sampled_count': len(sampled),
            'start': list(start) if coordinates else None,
            'end': list(end) if coordinates else None,
        })

        # Ajouter les points échantillonnés avec métadonnées
        for i, (lat, lon) in enumerate(sampled):
            all_sampled_points.append({
                'lat': lat,
                'lon': lon,
                'route': track_name,
                'file': gpx_file.name,
                'point_index': i
            })

    # Créer un GeoJSON pour visualisation dans un SIG
    geojson = {
        'type': 'FeatureCollection',
        'features': []
    }

    for point in all_sampled_points:
        feature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [point['lon'], point['lat']]
            },
            'properties': {
                'route': point['route'],
                'file': point['file'],
                'point_index': point['point_index']
            }
        }
        geojson['features'].append(feature)

    # Sauvegarder les résultats
    output_geojson = Path('/home/user/via-huguenots/chemin_huguenot_points.geojson')
    with open(output_geojson, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)

    output_json = Path('/home/user/via-huguenots/routes_summary.json')
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(all_routes, f, ensure_ascii=False, indent=2)

    # Créer un fichier CSV simple pour import dans Excel/SIG
    csv_file = Path('/home/user/via-huguenots/chemin_huguenot_points.csv')
    with open(csv_file, 'w', encoding='utf-8') as f:
        f.write('latitude,longitude,route,file,point_index\n')
        for point in all_sampled_points:
            f.write(f"{point['lat']},{point['lon']},{point['route']},{point['file']},{point['point_index']}\n")

    print("="*60)
    print(f"\nFichiers générés:")
    print(f"  - {output_geojson} (GeoJSON pour QGIS/SIG)")
    print(f"  - {csv_file} (CSV pour Excel/SIG)")
    print(f"  - {output_json} (Résumé JSON)")
    print(f"\nTotal de points échantillonnés: {len(all_sampled_points)}")
    print(f"\nCommunes probablement traversées (basées sur les points de départ/arrivée):")
    print("(Cette liste est partielle - utilisez le GeoJSON dans un SIG pour la liste complète)")
    for mun in sorted(municipalities_found):
        canton = KNOWN_MUNICIPALITIES.get(mun, {}).get('canton', '?')
        print(f"  - {mun} ({canton})")

    print("\n" + "="*60)
    print("\nPROCHAINES ÉTAPES:")
    print("1. Téléchargez les limites communales suisses depuis:")
    print("   https://www.swisstopo.admin.ch/fr/geodata/landscape/boundaries3d.html")
    print("2. Importez le fichier chemin_huguenot_points.geojson dans QGIS")
    print("3. Importez la couche des communes suisses")
    print("4. Utilisez 'Jointure spatiale' ou 'Intersection' pour obtenir")
    print("   la liste complète des communes traversées")

if __name__ == '__main__':
    main()
