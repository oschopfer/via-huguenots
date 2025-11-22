# Via Huguenots - Interaktive Karte (Deutsche Version)

## Installation in Joomla / Page Builder CK

### Schritt 1: Dateien hochladen

Laden Sie die folgenden Dateien auf Ihren Joomla-Server in den Ordner `files/clickable_map/`:

- `map_chemin_layer.jpg` - Kartenbild
- `via_huguenots_map_de.js` - JavaScript-Datei (deutsche Version)

**Hinweis:** Der Ordner `files/` ist in Joomla öffentlich zugänglich, im Gegensatz zu Ordnern im Stammverzeichnis.

### Schritt 2: HTML und CSS integrieren

1. Öffnen Sie die Datei `via_huguenots_pagebuilderck.html`
2. Kopieren Sie den CSS-Code (SCHRITT 1) und fügen Sie ihn in den `<head>`-Bereich Ihres Templates oder in ein Custom HTML-Modul ein
3. Kopieren Sie den HTML-Code (SCHRITT 2) und fügen Sie ihn in Page Builder CK ein
4. Fügen Sie das Script-Tag (SCHRITT 3) am Ende der Seite hinzu

### Schritt 3: Testen

Öffnen Sie die Seite in der Vorschau und überprüfen Sie, ob:
- Die Karte angezeigt wird
- Die Markierungen sichtbar sind
- Die Tooltips beim Überfahren mit der Maus erscheinen
- Die Links zu den deutschen Seiten führen

## Dateien in diesem Ordner

- `via_huguenots_pagebuilderck.html` - HTML-Template mit CSS für Joomla
- `via_huguenots_map_de.js` - JavaScript mit eingebetteten deutschen Daten
- `map_chemin_layer.jpg` - Kartenbild (identisch mit französischer Version)
- `README_INSTALLATION_DE.md` - Diese Anleitung

## Datenstruktur

Die Daten sind direkt im JavaScript eingebettet und enthalten:
- 28 Hauptetappen (type: "stage")
- 3 alternative Routen (type: "alternative"): 01bis, 05bis, 12bis
- 5 Stadtrundgänge (type: "urban"): 02bis, 05bis2, 15bis, 25bis, 28bis
- 1 Spezialroute (type: "special"): 16bis (Visioguide)
- 1 Regionalrouten-Button (type: "regional")

**Insgesamt:** 38 Einträge

## Unterschiede zur französischen Version

- Verwendet `name_full_de` statt `name_full_fr` für die Anzeige der Etappennamen
- Verwendet `url_de` statt `url_fr` für die Links zu den Etappenseiten
- Alle UI-Texte sind auf Deutsch (Legende, Tooltips, etc.)
- Dateiname des JavaScript: `via_huguenots_map_de.js`

## Anpassungen

### Farben ändern
Die Farben werden im CSS definiert:
- Etappen: `#ff6b6b` (rot)
- Alternativen: `#FF9800` (orange)
- Stadtrundgänge: `#2196F3` (blau)
- Spezial: `#9C27B0` (lila)
- Regional: `#4CAF50` (grün)

### Transparenz ändern
Die Standard-Transparenz ist `opacity: 0.5`. Beim Hover wird sie auf `0.8` erhöht.

### Größe der Markierungen ändern
Im JavaScript-Code können Sie die Größe anpassen:
- Kreise: `setAttribute('r', '10')` (Radius in Pixeln)
- Regional-Button: `width='50'` und `height='20'`

## Support

Bei Fragen zur Installation oder Anpassung, konsultieren Sie die Joomla-Dokumentation oder kontaktieren Sie den Support.
