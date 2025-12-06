#!/usr/bin/env python3
"""
Script automatisé pour identifier les communes traversées par le Chemin Huguenot
Utilise les fichiers GeoPackage déjà créés dans QGIS
"""

import geopandas as gpd
import pandas as pd
from pathlib import Path

print("="*60)
print("ANALYSE DES COMMUNES TRAVERSÉES PAR LE CHEMIN HUGUENOT")
print("="*60)

# Chemins des fichiers
chemin_gpkg = Path('/home/user/via-huguenots/chemin_huguenot_complet.gpkg')
communes_gpkg = Path('/home/user/via-huguenots/swissBOUNDARIES3D_1_5_LV95_LN02.gpkg')

print(f"\n1. Chargement du tracé du chemin...")
print(f"   Fichier: {chemin_gpkg}")

# Charger le tracé (déjà fusionné dans QGIS)
try:
    chemin_gdf = gpd.read_file(chemin_gpkg)
    print(f"   ✓ Tracé chargé: {len(chemin_gdf)} entités")
    print(f"   ✓ Système de coordonnées: {chemin_gdf.crs}")
except Exception as e:
    print(f"   ✗ Erreur: {e}")
    exit(1)

print(f"\n2. Chargement des limites communales...")
print(f"   Fichier: {communes_gpkg}")

# Charger les communes suisses
try:
    # Le fichier peut avoir plusieurs couches, essayons d'abord de lister
    import fiona
    layers = fiona.listlayers(str(communes_gpkg))
    print(f"   Couches disponibles: {layers}")

    # Chercher la couche des communes
    # La couche correcte est tlm_hoheitsgebiet qui contient les territoires avec leurs noms
    commune_layer = 'tlm_hoheitsgebiet'

    if commune_layer in layers:
        print(f"   Utilisation de la couche: {commune_layer}")
        communes_gdf = gpd.read_file(communes_gpkg, layer=commune_layer)
    else:
        # Fallback : chercher une couche contenant 'gebiet'
        for layer in layers:
            if 'gebiet' in layer.lower() and 'hoh' in layer.lower():
                commune_layer = layer
                break
        print(f"   Utilisation de la couche: {commune_layer}")
        communes_gdf = gpd.read_file(communes_gpkg, layer=commune_layer)

    print(f"   ✓ Communes chargées: {len(communes_gdf)} communes")
    print(f"   ✓ Système de coordonnées: {communes_gdf.crs}")
except Exception as e:
    print(f"   ✗ Erreur: {e}")
    exit(1)

print(f"\n3. Reprojection des données en LV95 (EPSG:2056)...")

# Reprojeter si nécessaire
target_crs = 'EPSG:2056'

if chemin_gdf.crs != target_crs:
    print(f"   Reprojection du tracé de {chemin_gdf.crs} vers {target_crs}")
    chemin_gdf = chemin_gdf.to_crs(target_crs)

if communes_gdf.crs != target_crs:
    print(f"   Reprojection des communes de {communes_gdf.crs} vers {target_crs}")
    communes_gdf = communes_gdf.to_crs(target_crs)

print("   ✓ Tous les systèmes de coordonnées sont harmonisés")

print(f"\n4. Création d'une zone tampon de 300 mètres...")

# Créer un tampon de 300m autour du tracé
buffer_distance = 300  # mètres
chemin_buffer = chemin_gdf.buffer(buffer_distance)
chemin_buffer_gdf = gpd.GeoDataFrame(geometry=chemin_buffer, crs=target_crs)

# Dissoudre tous les buffers en une seule géométrie
chemin_buffer_gdf = chemin_buffer_gdf.dissolve()

print(f"   ✓ Tampon créé: {buffer_distance} mètres de chaque côté du tracé")

print(f"\n5. Identification des communes traversées (intersection)...")

# Faire l'intersection
communes_traversees = gpd.overlay(communes_gdf, chemin_buffer_gdf, how='intersection')

print(f"   ✓ Nombre de communes traversées: {len(communes_traversees)}")

if len(communes_traversees) == 0:
    print("\n   ⚠ ATTENTION: Aucune commune trouvée!")
    print("   Cela peut indiquer un problème de système de coordonnées")
    print(f"   Limites du tracé: {chemin_gdf.total_bounds}")
    print(f"   Limites des communes: {communes_gdf.total_bounds}")
    exit(1)

print(f"\n6. Extraction et nettoyage des données...")

# Identifier les colonnes importantes
colonnes_utiles = []
for col in communes_traversees.columns:
    col_lower = col.lower()
    if any(keyword in col_lower for keyword in ['name', 'gem', 'kt', 'kanton', 'bfs', 'icc']):
        colonnes_utiles.append(col)

print(f"   Colonnes disponibles: {colonnes_utiles}")

# Mapping des numéros de cantons vers leurs abréviations
canton_mapping = {
    1: 'ZH', 2: 'BE', 3: 'LU', 4: 'UR', 5: 'SZ', 6: 'OW', 7: 'NW',
    8: 'GL', 9: 'ZG', 10: 'FR', 11: 'SO', 12: 'BS', 13: 'BL', 14: 'SH',
    15: 'AR', 16: 'AI', 17: 'SG', 18: 'GR', 19: 'AG', 20: 'TG', 21: 'TI',
    22: 'VD', 23: 'VS', 24: 'NE', 25: 'GE', 26: 'JU'
}

# Créer une liste propre
communes_liste = []
for idx, row in communes_traversees.iterrows():
    commune_info = {}

    # Chercher le nom
    for col in ['name', 'NAME', 'gemname', 'GEMNAME']:
        if col in row:
            commune_info['nom'] = row[col]
            break

    # Chercher le canton
    for col in ['kt', 'KT', 'kanton', 'KANTON', 'ak', 'AK']:
        if col in row:
            commune_info['canton'] = row[col]
            break

    # Si pas de canton en texte, utiliser le numéro de canton
    if 'canton' not in commune_info:
        for col in ['kantonsnummer', 'KANTONSNUMMER']:
            if col in row and row[col] in canton_mapping:
                commune_info['canton'] = canton_mapping[row[col]]
                break

    # Chercher le numéro BFS
    for col in ['bfs_nummer', 'BFS_NUMMER', 'bfs_nr', 'BFS_NR']:
        if col in row:
            commune_info['bfs'] = row[col]
            break

    # Chercher ICC
    for col in ['icc', 'ICC']:
        if col in row:
            commune_info['icc'] = row[col]
            break

    if 'nom' in commune_info:
        communes_liste.append(commune_info)

# Créer un DataFrame et supprimer les doublons
df_communes = pd.DataFrame(communes_liste)

if 'nom' in df_communes.columns:
    df_communes = df_communes.drop_duplicates(subset=['nom'])

    # Trier (gérer le cas où 'canton' n'existe pas)
    if 'canton' in df_communes.columns:
        df_communes = df_communes.sort_values(['canton', 'nom'])
    else:
        df_communes = df_communes.sort_values('nom')

print(f"   ✓ Liste nettoyée: {len(df_communes)} communes uniques")

print(f"\n7. Sauvegarde des résultats...")

# Sauvegarder en CSV
csv_file = Path('/home/user/via-huguenots/liste_communes_traversees.csv')
df_communes.to_csv(csv_file, index=False, encoding='utf-8-sig')
print(f"   ✓ CSV sauvegardé: {csv_file}")

# Sauvegarder aussi le GeoPackage complet
gpkg_output = Path('/home/user/via-huguenots/communes_traversees_complet.gpkg')
communes_traversees.to_file(gpkg_output, driver='GPKG')
print(f"   ✓ GeoPackage sauvegardé: {gpkg_output}")

print(f"\n8. Résumé par canton:")
print("="*60)

if 'canton' in df_communes.columns:
    for canton in df_communes['canton'].unique():
        communes_canton = df_communes[df_communes['canton'] == canton]
        print(f"\n{canton} ({len(communes_canton)} communes):")
        for idx, row in communes_canton.iterrows():
            bfs_str = f" (BFS: {row['bfs']})" if 'bfs' in row else ""
            print(f"  - {row['nom']}{bfs_str}")
else:
    print("\nListe complète:")
    for idx, row in df_communes.iterrows():
        print(f"  - {row['nom']}")

print(f"\n{'='*60}")
print(f"TOTAL: {len(df_communes)} communes traversées")
print(f"{'='*60}")
print(f"\nFichiers générés:")
print(f"  - {csv_file}")
print(f"  - {gpkg_output}")
print(f"\nVous pouvez ouvrir le fichier CSV dans Excel ou LibreOffice!")
