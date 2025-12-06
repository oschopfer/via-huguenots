# Guide pas à pas : Identifier les communes traversées avec QGIS

## 📋 Ce dont vous avez besoin

1. **QGIS** (déjà installé ✓)
2. **Vos fichiers GPX** (déjà dans le dossier `gpx/` ✓)
3. **Les limites communales suisses** (à télécharger)

---

## 🗺️ MÉTHODE SIMPLIFIÉE : Utiliser directement les GPX

### Étape 1 : Ouvrir QGIS
- Lancez QGIS Desktop

### Étape 2 : Ajouter vos tracés GPX
1. Menu **Couche** → **Ajouter une couche** → **Ajouter une couche vecteur**
2. Cliquez sur les **trois points** à droite de "Jeu de données vecteur"
3. Naviguez vers `/home/user/via-huguenots/gpx/`
4. Sélectionnez **TOUS** les fichiers `.gpx` (Ctrl+A)
5. Cliquez sur **Ouvrir**
6. Pour chaque fichier GPX, QGIS vous demandera quelle couche importer :
   - Cochez **tracks** (les tracés)
   - Décochez waypoints et routes
   - Cliquez sur **OK**

Vous devriez maintenant voir tous les tracés du chemin sur la carte !

### Étape 3 : Télécharger les limites communales suisses

**TÉLÉCHARGEMENT MANUEL (RECOMMANDÉ)**

1. Allez sur : https://www.swisstopo.admin.ch/fr/geodata/landscape/boundaries3d.html
2. Cliquez sur le bouton **"Télécharger"** ou descendez jusqu'à la section téléchargements
3. **IMPORTANT** : Téléchargez le fichier **`swissboundaries3d_YYYY-MM_2056_5728.gpkg.zip`**
   - Format : **GeoPackage (.gpkg.zip)** - PAS le .gdb.zip !
   - Le GeoPackage fonctionne mieux avec QGIS
   - La date (YYYY-MM) correspond à la version la plus récente
4. **Décompressez** le fichier zip téléchargé
5. Dans le dossier décompressé, cherchez le dossier **`SWISSBOUNDARIES3D_YYYY_2056_5728.gpkg`** qui contient les différentes couches
6. Dans QGIS : Menu **Couche** → **Ajouter une couche** → **Ajouter une couche vecteur**
7. Cliquez sur les **trois points** et naviguez vers le fichier `.gpkg` décompressé
8. QGIS vous demandera quelle couche ouvrir - sélectionnez : **`tlm_hoheitsgebiet_gemeinde`** (= communes)
9. Cliquez sur **Ajouter**

Vous devriez maintenant voir toutes les communes suisses colorées sur la carte !

### Étape 4 : Fusionner tous vos tracés GPX en une seule couche

1. Menu **Vecteur** → **Outils de géotraitement** → **Fusion**
2. Dans "Couches en entrée", cliquez sur **...**
3. Sélectionnez toutes les couches GPX (celles qui commencent par votre nom de fichier)
4. Cliquez sur **OK**
5. Sous "Fusion", cliquez sur **...** → **Enregistrer dans un fichier**
6. Nommez-le `chemin_huguenot_complet.gpkg`
7. Cliquez sur **Exécuter**

### Étape 5 : Reprojeter dans le système de coordonnées suisse (LV95)

**Important !** Les fichiers GPX utilisent des degrés, mais pour créer un tampon en mètres, il faut utiliser le système suisse LV95 :

1. Clic droit sur la couche `chemin_huguenot_complet`
2. Sélectionnez **Exporter** → **Sauvegarder les entités sous...**
3. Format : **GeoPackage**
4. Nom du fichier : `chemin_huguenot_LV95.gpkg`
5. **SCR (Système de Coordonnées de Référence)** : Cliquez sur l'icône 🌐 à droite
6. Dans la recherche, tapez : **2056**
7. Sélectionnez **EPSG:2056 - CH1903+ / LV95** (le système officiel suisse)
8. Cliquez sur **OK**, puis **OK** à nouveau

Votre tracé est maintenant en coordonnées suisses avec des mètres !

### Étape 6 : Créer une zone tampon autour du chemin

Les tracés GPX sont des lignes fines. Pour capturer toutes les communes traversées (y compris voisines), on crée une "zone tampon" :

1. Menu **Vecteur** → **Géotraitement** → **Tampon**
2. Couche en entrée : `chemin_huguenot_LV95` (celle que vous venez de créer)
3. Distance : **`300`** (mètres - pour capturer aussi les communes voisines proches)
   - Vous pouvez augmenter à 500 ou 1000 si vous voulez un tampon encore plus large
4. Segments : laissez 5 (par défaut)
5. Sous "Tampon", cliquez sur **...** → **Enregistrer dans un fichier**
6. Nommez-le `chemin_huguenot_buffer.gpkg`
7. Cliquez sur **Exécuter**

Vous verrez une bande large autour du chemin - toutes les communes qui touchent cette bande seront identifiées !

### Étape 7 : Identifier les communes traversées

1. Menu **Vecteur** → **Outils d'analyse** → **Intersection**
2. Couche en entrée : votre couche des **communes suisses** (`tlm_hoheitsgebiet_gemeinde`)
3. Couche de recouvrement : `chemin_huguenot_buffer`
4. Sous "Intersection", cliquez sur **...** → **Enregistrer dans un fichier**
5. Nommez-le `communes_traversees.gpkg`
6. Cliquez sur **Exécuter**

Bravo ! Vous avez maintenant la liste complète des communes traversées.

### Étape 8 : Exporter la liste des communes

1. Faites un clic droit sur la couche `communes_traversees`
2. Sélectionnez **Ouvrir la table d'attributs**
3. Vous verrez toutes les communes traversées avec leurs informations !
4. Pour exporter en CSV :
   - Clic droit sur `communes_traversees` → **Exporter** → **Sauvegarder les entités sous**
   - Format : **CSV**
   - Nom du fichier : `liste_communes_huguenot.csv`
   - Cliquez sur **OK**

### Étape 9 : Nettoyer la liste

Ouvrez le CSV dans Excel/LibreOffice et vous verrez les colonnes :
- `NAME` ou `GEMNAME` = Nom de la commune
- `KANTON` ou `KT` = Canton
- `BFS_NUMMER` ou `BFS_NR` = Numéro OFS de la commune
- `ICC` = Code commune (optionnel)

**Pour nettoyer :**
1. Supprimez les colonnes inutiles (gardez juste : nom, canton, numéro OFS)
2. Triez par canton puis par nom alphabétique
3. Supprimez les doublons éventuels (sélectionnez tout → Données → Supprimer les doublons)

Vous avez votre liste finale ! 🎉

---

## 🎯 MÉTHODE ALTERNATIVE : Plus simple mais moins précise

Si QGIS vous semble trop complexe, vous pouvez utiliser un service en ligne :

### geojson.io (méthode visuelle simple)

1. Allez sur **https://geojson.io**
2. Ouvrez le fichier `chemin_huguenot_points.geojson` généré
3. Visualisez les points sur la carte
4. Identifiez manuellement les communes en cliquant sur chaque point

### uMap (OpenStreetMap)

1. Allez sur **https://umap.openstreetmap.fr**
2. Créez une nouvelle carte
3. Importez votre fichier `chemin_huguenot_points.geojson`
4. Visualisez et identifiez les communes

---

## ❓ Questions fréquentes

**Q : QGIS est en anglais, comment le mettre en français ?**
- Menu **Settings** → **Options** → **General** → **User Interface Translation** → Sélectionnez "Français"

**Q : Les tracés GPX ne s'affichent pas ?**
- Vérifiez que vous avez bien sélectionné "tracks" lors de l'import
- Essayez de zoomer (molette de la souris ou bouton loupe)

**Q : Je ne vois pas les menus "Vecteur" ?**
- Ils sont peut-être dans **Processing** → **Toolbox** → cherchez les outils par nom

**Q : Le tampon me demande une distance en degrés, pas en mètres ?**
- C'est normal ! Les fichiers GPX utilisent des coordonnées géographiques (degrés)
- Suivez l'étape 5 pour reprojeter dans le système suisse LV95 (EPSG:2056)
- Après la reprojection, le tampon fonctionnera en mètres

**Q : Quelle distance de tampon choisir ?**
- **100-300m** : communes directement traversées
- **500-1000m** : inclut les communes voisines proches
- Vous pouvez expérimenter avec différentes valeurs et comparer les résultats !

**Q : Combien de communes devrais-je trouver ?**
- La liste partielle en contient 31 (points de départ/arrivée)
- Avec l'analyse complète et un tampon de 300m : entre 80 et 150 communes
- Avec un tampon de 1000m : encore plus (incluant beaucoup de voisines)

---

## 🆘 Besoin d'aide ?

Si QGIS reste trop complexe, dites-le moi et je peux :
1. Créer un script Python plus simple qui fait tout automatiquement
2. Vous guider avec une autre méthode
3. Essayer de télécharger et analyser les données directement

---

## 📚 Ressources utiles

- Documentation QGIS (français) : https://docs.qgis.org/3.34/fr/docs/
- Tutoriels QGIS : https://www.qgistutorials.com/fr/
- Forum QGIS français : https://forum.qgis.org/

Bon courage ! N'hésitez pas à me dire où vous bloquez.
