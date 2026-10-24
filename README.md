# Betreuungsanfrage für die Selbständige Arbeit und Maturarbeit

Ein deutschsprachiges Formular auf Basis der Word-Vorlage «Modelltext Betreuungsanfrage Selbständige Arbeit». Aus eigenen Angaben entsteht eine bearbeitbare E-Mail an eine Betreuungsperson.

## Funktionen

- Umschaltung zwischen Selbständiger Arbeit und Maturarbeit; passt Betreff, Mailtext, Seitentitel und Export-Dateinamen an und erhält bestehende Eingaben sowie manuelle Textänderungen

- Formular mit Formulierungshilfen und Live-Vorschau
- Beispiel, Fortschrittsanzeige und Checkliste
- Betreff und Text direkt überarbeiten und kopieren
- Echte Word-Datei (.docx) und UTF-8-Textdatei herunterladen
- Drucken / als PDF speichern über den Browser
- E-Mail im eigenen Mailprogramm vorbereiten (kein automatischer Versand)
- Platzhalterprüfung vor Export; optionale Empfängeradresse
- Responsive und ohne externe Dienste, Schriftdateien oder Bibliotheken

Eingaben liegen nur im Arbeitsspeicher des Browsers. Neuladen oder Schliessen löscht sie. Formularänderungen erstellen die Vorschau neu und ersetzen manuelle Textkorrekturen; ein Hinweis steht direkt bei der Vorschau. Die Word-Datei enthält den aktuellen Betreff und Mailtext, keine Formularhinweise.

## Lokal starten

Im Projektordner:

```sh
python3 -m http.server 8080
```

Dann http://localhost:8080 öffnen. Ein lokaler Server ist wegen der JavaScript-Module erforderlich. Es gibt keinen Build und keine Installation.

## GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository hochladen. `index.html` muss im Hauptverzeichnis liegen.
2. Unter **Settings → Pages → Build and deployment** die Quelle **Deploy from a branch** wählen.
3. Branch `main`, Ordner `/ (root)` auswählen und speichern.

Alle Ressourcen verwenden relative Pfade, sodass auch Projektseiten unter einem Repository-Pfad funktionieren. `.nojekyll` deaktiviert die unnötige Jekyll-Verarbeitung. Es werden keine API-Schlüssel benötigt.

## Entwicklung und Prüfung

```sh
node --test tests.mjs
```

`app.mjs` enthält Formulardefinition, Textgenerierung, UI und einen kleinen ZIP-Writer für das standardkonforme DOCX-Paket. `style.css` enthält Bildschirm- und Druckgestaltung. Die Formulierungen folgen dem Textgerüst der gelieferten Vorlage; das Beispiel ergänzt daraus eine vollständige Anfrage. Die sprachliche Prüfung bleibt Teil der Checkliste.

Das Öffnen des Mailprogramms hängt von der lokalen Konfiguration ab. Manche Programme begrenzen die Länge von mailto-Links; Kopieren und Dateiexport stehen als Alternativen bereit. Die PDF-Ausgabe erfolgt mit dem Druckdialog des Browsers.
