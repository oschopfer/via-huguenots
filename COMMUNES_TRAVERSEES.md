# Communes traversées par le Chemin Huguenot en Suisse

## Résumé

Ce document présente les communes suisses traversées par le Chemin Huguenot (Via Huguenots), basé sur l'analyse de 32 fichiers GPX représentant les différentes étapes du parcours.

**Note importante :** Cette liste est basée sur les points de départ et d'arrivée de chaque étape. Pour obtenir une liste exhaustive de toutes les communes traversées (y compris celles en cours de route), il est recommandé d'utiliser les fichiers GeoJSON générés avec un logiciel SIG comme QGIS.

## Statistiques

- **Fichiers GPX analysés :** 32
- **Points GPS totaux :** ~52 000
- **Points échantillonnés (1 tous les 1km) :** 677
- **Communes identifiées :** 31 (liste partielle)
- **Cantons traversés :** GE, VD, NE, FR, BE, SO, AG, ZH, SH

## Liste des communes par canton

### Canton de Genève (GE)
1. **Chancy** - Début du parcours en Suisse
2. **Genève**
3. **Versoix**

### Canton de Vaud (VD)
4. **Nyon**
5. **Rolle**
6. **Morges**
7. **Cossonay**
8. **Romainmôtier** (Romainmôtier-Envy)
9. **Orbe**
10. **Yverdon-les-Bains**

### Canton de Neuchâtel (NE)
11. **Neuchâtel**

### Canton de Fribourg (FR)
12. **Murten** (Morat)

### Canton de Berne (BE)
13. **Ins**
14. **Gummenen** (Gampelen ou Gümmenen)
15. **Berne** (Bern)
16. **Aarberg**
17. **Büren an der Aare**
18. **Aarwangen**

### Canton de Soleure (SO)
19. **Solothurn** (Soleure)

### Canton d'Argovie (AG)
20. **Zofingen**
21. **Aarau**
22. **Lenzburg**
23. **Brugg**
24. **Baden**

### Canton de Zurich (ZH)
25. **Zürich** (Zurich)
26. **Kloten**
27. **Eglisau**
28. **Winterthur** (variante)
29. **Elgg** (variante)

### Canton de Schaffhouse (SH)
30. **Schaffhausen** (Schaffhouse)
31. **Stein am Rhein** (mentionné dans les tracés)

### Hors Suisse
- **Barzheim** (Allemagne) - Point de passage vers l'Allemagne

## Itinéraire principal

### Étapes 1-11: De Chancy à Neuchâtel
1. Chancy → Genève (Plainpalais)
2. Genève (Plainpalais) → Versoix
3. Versoix → Nyon
4. Nyon → Rolle
5. Rolle → Morges
6. Morges → Cossonay
7. Cossonay → Romainmôtier
8. Romainmôtier → Orbe
9. Orbe → Yverdon-les-Bains
10. Yverdon-les-Bains → St-Aubin
11. St-Aubin → Neuchâtel

### Variante: Morges → Murten
- Étape 5bis: Morges → Murten (passage par le canton de Fribourg)

### Étapes 12-18: De Neuchâtel à Solothurn
12. Neuchâtel → Ins
12bis. Neuchâtel → Büren (variante)
13. Ins → Gümmenen
14. Gümmenen → Bern
15. Bern → Aarberg
16. Aarberg → Büren an der Aare
17. Büren an der Aare → Solothurn

### Étapes 18-24: De Solothurn à Zürich
18. Solothurn → Aarwangen
19. Aarwangen → Zofingen
20. Zofingen → Aarau
21. Aarau → Lenzburg
22. Lenzburg → Brugg
23. Brugg → Baden
24. Baden → Zürich

### Étapes 25-28: De Zürich à Schaffhausen et sortie de Suisse
25. Zürich → Kloten
26. Kloten → Eglisau
27. Eglisau → Schaffhausen
28. Schaffhausen → Barzheim (Allemagne)

### Variante par Winterthur
- Étape 36A: Zürich → Winterthur → Stein am Rhein → Schaffhausen
- Étape 36B: Winterthur → Elgg

## Communes bourgeoises

**Note :** La distinction entre communes politiques et communes bourgeoises nécessite une analyse plus approfondie avec les données cadastrales officielles. Les communes bourgeoises sont une particularité suisse et ne sont pas automatiquement identifiables par géocodage.

Pour identifier précisément les communes bourgeoises traversées, il faudrait :
1. Croiser les coordonnées GPS avec les registres des communes bourgeoises
2. Consulter les données cantonales spécifiques (car chaque canton gère différemment)
3. Utiliser les données de swissBOUNDARIES3D qui incluent potentiellement cette information

## Fichiers générés pour analyse approfondie

Les fichiers suivants ont été créés pour permettre une analyse plus détaillée :

1. **chemin_huguenot_points.geojson** - Format GeoJSON pour import dans QGIS ou autre SIG
2. **chemin_huguenot_points.csv** - Format CSV pour Excel ou tableur
3. **routes_summary.json** - Résumé structuré de toutes les étapes

## Méthodologie

1. Parsing des 32 fichiers GPX contenant les tracés du Chemin Huguenot
2. Extraction de ~52 000 points GPS
3. Échantillonnage (1 point tous les 1 km) pour réduire à 677 points représentatifs
4. Identification des communes par proximité avec les points de début/fin d'étape
5. Génération de fichiers GeoJSON et CSV pour analyse SIG

## Limites de cette analyse

- Cette liste est **partielle** et basée uniquement sur les points de départ et d'arrivée des étapes
- De nombreuses communes sont traversées entre les étapes mais ne sont pas listées ici
- La précision dépend de la granularité des fichiers GPX
- Les communes bourgeoises ne sont pas identifiées dans cette version

## Pour une liste complète

Pour obtenir la liste exhaustive de toutes les communes traversées :

1. Télécharger les limites communales officielles depuis [swissBOUNDARIES3D](https://www.swisstopo.admin.ch/fr/geodata/landscape/boundaries3d.html)
2. Importer le fichier `chemin_huguenot_points.geojson` dans QGIS
3. Importer la couche des communes suisses
4. Utiliser l'outil de "Jointure spatiale" ou "Intersection"
5. Exporter la liste unique des communes

## Date de création

Généré le : 6 décembre 2025

## Sources

- Fichiers GPX du Chemin Huguenot (32 fichiers)
- Coordonnées GPS WGS84
- Documentation SwissMobility
