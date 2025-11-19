# Carte Interactive Via Huguenots - Guide d'Installation
## Version pour Joomla avec Page Builder CK

---

## 📋 Contenu du package

Vous avez reçu les fichiers suivants :

1. **map_chemin_layer.jpg** - L'image de la carte de Suisse avec le tracé
2. **via_huguenots_carte_interactive.html** - Version standalone complète (pour test)
3. **via_huguenots_pagebuilderck.html** - Code à intégrer dans Joomla
4. **via_huguenots_data.json** - Données structurées des 28 étapes
5. **README_INSTALLATION.md** - Ce fichier

---

## 🚀 Installation dans Joomla avec Page Builder CK

### Étape 1 : Uploader l'image

1. Connectez-vous à votre administration Joomla
2. Allez dans **Contenu → Média**
3. Créez un dossier `via-huguenots` (optionnel)
4. Uploadez le fichier **map_chemin_layer.jpg**
5. Notez le chemin complet (ex: `images/via-huguenots/map_chemin_layer.jpg`)

### Étape 2 : Ajouter le CSS

Vous avez deux options :

**Option A - Dans le template (recommandé)**
1. Allez dans **Système → Templates → Templates**
2. Cliquez sur votre template actif
3. Ouvrez le fichier `custom.css` (ou créez-le)
4. Copiez-collez le CSS depuis la section "ÉTAPE 1" du fichier `via_huguenots_pagebuilderck.html`

**Option B - Dans Page Builder CK**
1. Ouvrez votre article/page avec Page Builder CK
2. Ajoutez un module "Custom HTML"
3. Ajoutez une balise `<style>` avec le CSS

### Étape 3 : Ajouter le HTML dans Page Builder CK

1. Ouvrez votre page dans Page Builder CK
2. Créez une nouvelle ligne (Row)
3. Ajoutez un bloc (Block) avec largeur 100%
4. Insérez un module "Custom HTML" ou "Code"
5. Copiez-collez le HTML depuis la section "ÉTAPE 2"
6. **IMPORTANT** : Modifiez le chemin de l'image :
   ```html
   <img src="images/via-huguenots/map_chemin_layer.jpg" alt="Carte Via Huguenots">
   ```

### Étape 4 : Ajouter le JavaScript

**Option A - En bas de la page (recommandé)**
1. Dans Page Builder CK, ajoutez un nouveau module "Custom HTML" en bas
2. Copiez-collez le JavaScript depuis la section "ÉTAPE 3"

**Option B - Dans le template**
1. Éditez votre template
2. Ajoutez le script avant la balise `</body>`

### Étape 5 : Tester

1. Sauvegardez votre article/page
2. Prévisualisez en frontend
3. Vérifiez que :
   - L'image s'affiche correctement
   - Les points numérotés apparaissent sur la carte
   - Au survol, un tooltip s'affiche avec le nom de l'étape
   - Au clic, vous êtes redirigé vers la page de l'étape

---

## 🎨 Personnalisation

### Changer les couleurs des points

Dans le CSS, modifiez ces valeurs :

```css
.via-stage-marker circle {
    fill: #14a232;  /* Couleur normale (vert) */
}

.via-stage-marker:hover circle {
    fill: #bf7514;  /* Couleur au survol (orange) */
}
```

### Modifier la taille des points

Dans le JavaScript, trouvez cette ligne :
```javascript
circle.setAttribute('r', '10');  // Rayon du cercle en pixels
```

### Changer le style du tooltip

Dans le CSS, section `.via-tooltip` :
```css
.via-tooltip {
    background: rgba(0, 0, 0, 0.9);  /* Fond noir transparent */
    color: white;                      /* Texte blanc */
    padding: 10px 15px;                /* Espacement interne */
    border-radius: 4px;                /* Coins arrondis */
}
```

---

## 📱 Responsive

La carte est automatiquement responsive et s'adapte à tous les écrans :
- Desktop : Points de 10px de rayon
- Mobile : Points légèrement plus petits (automatique)
- Tooltip : Adapté aux petits écrans

---

## 🔧 Dépannage

### Les points n'apparaissent pas
- Vérifiez que le JavaScript est bien chargé (console du navigateur F12)
- Vérifiez que les IDs correspondent : `viaMapSvg` et `viaTooltip`

### L'image ne s'affiche pas
- Vérifiez le chemin dans `src="..."`
- Assurez-vous que l'image est bien uploadée dans Joomla

### Les liens ne fonctionnent pas
- Vérifiez les URLs dans le JavaScript
- Assurez-vous qu'elles sont relatives à votre site

### Les tooltips ne s'affichent pas
- Vérifiez que le CSS est bien chargé
- Regardez dans la console du navigateur pour des erreurs

---

## 🌍 Version allemande

Pour créer une version allemande :

1. Dupliquez le code
2. Dans le JavaScript, modifiez :
   - Les URLs : remplacez `/fr/` par `/de/`
   - Les noms d'étapes si nécessaire
3. Créez une page séparée pour la version allemande

---

## 💡 Fonctionnalités

### Ce qui est inclus :
✅ 28 étapes principales cliquables
✅ Points interactifs avec effet de survol
✅ Tooltips informatifs (nom + distance)
✅ Liens directs vers chaque page d'étape
✅ 100% responsive
✅ Compatible tous navigateurs modernes
✅ Léger et performant

### Extensions possibles :
- Ajouter les étapes alternatives (bis) avec une couleur différente
- Intégrer une légende dynamique
- Ajouter des icônes selon le type d'étape
- Créer une version avec tracé du chemin en SVG
- Ajouter un zoom sur la carte

---

## 📞 Support

Si vous rencontrez des difficultés :
1. Vérifiez que tous les fichiers sont correctement uploadés
2. Consultez la console du navigateur (F12) pour les erreurs
3. Testez d'abord avec la version standalone `via_huguenots_carte_interactive.html`

---

## 📝 Notes techniques

- **Dimensions de l'image** : 1170 x 705 pixels
- **Format** : JPG
- **Coordonnées** : Système SVG (0,0 en haut à gauche)
- **Point de départ** : (48, 689) - Chancy
- **Point d'arrivée** : (839, 7) - Schaffhausen

---

## ✨ Crédits

Carte interactive créée pour Association VIA-Sur les pas des Huguenots et des Vaudois du Piémont
Version 1.0 - Novembre 2024
