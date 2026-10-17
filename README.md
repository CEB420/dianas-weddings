# Dianas Weddings

Website von **Dianas Weddings**, Hochzeitsfotografie in Leipzig (Diana Fedotov).

Live: https://ceb420.github.io/dianas-weddings/

## Seiten

- `index.html`: Startseite mit Portfolio-Galerie, Diana, Kundenstimmen, Begleitungen und Preisen, Einblicke-Vorschau, Fragen und Anfrageformular
- `einblicke.html`: drei Lookbook-Galerien (Standesamt 2 h, Halbtagsreportage 6 h, Ganztagsreportage 10 h)
- `impressum.html`, `datenschutz.html`

## Funktionen

- Kopf: Logo links, Menü mittig, Button „Termin anfragen“ rechts; mobil Logo, kleiner Button und Menü-Symbol
- Portfolio-Galerie mit 10 Fotos: Autoplay alle 5,5 s, Pfeile, Zähler, Fortschrittsbalken, Wischen und Trackpad, pausiert bei Hover, Fokus und außerhalb des Sichtbereichs, respektiert „Bewegung reduzieren“
- Über Diana mit zwei ineinandergreifenden Bildern (auch mobil)
- Kundenstimmen mit eigenen Pfeilen und Zähler
- Drei Begleitungen nebeneinander, auch auf dem Handy, „Meist gebucht“ und „Immer inklusive“
- Einblicke-Vorschau verlinkt direkt auf die jeweilige Galerie
- FAQ-Akkordeon mit sechs Fragen
- Anfrageformular mit Pflichtfeld-Prüfung; „Datum steht noch nicht fest“ deaktiviert das Datumsfeld. Beim Absenden gehen die Angaben an Jotform (Formular „Hochzeitsanfrage“, ID 262892332273056)
- Schrift Cormorant Infant lokal eingebunden, keine Cookies, kein Tracking

## Lokal ansehen

```bash
python3 -m http.server 4173
```

Danach http://127.0.0.1:4173 öffnen.

## Lizenzen und Rechte

Alle Fotos und Texte: © Diana Fedotov, alle Rechte vorbehalten. Schrift Cormorant Infant: SIL Open Font License (`fonts/OFL.txt`).
