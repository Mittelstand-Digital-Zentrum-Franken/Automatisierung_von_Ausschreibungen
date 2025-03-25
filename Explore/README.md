<a id="readme-top"></a>
# Explorative Analyse zur Automatisierung der Prozessschritte

Zu Beginn des Projekts wurde der gesamte Prozess zur Erstellung einer Ausschreibung aufgezeichnet, um diesen besser zu verstehen und die Möglichkeiten für den Einsatz von künstlicher Intelligenz zu identifizieren

<p align="center">
  <img src="Prozess.png" alt="Mengengerüst" width="1000">
</p>

Der Code und nähere Erläuterungen sind in den entsprechenden Notebooks zu finden:
1. <a href="Grundriss">Erfassung der Stückzahlen</a>
2. <a href="Technischer_Vorbeschrieb">Erstellung des technischen Vorbeschriebs</a>
3. <a href="Mengengeruest">Erstellung des Mengengerüsts</a>

<br>
<p align="right">(<a href="./README.md">back to main</a>)</p>

## Planung und Produktfestlegung

Der erste Schritt in der Büroplanung umfasst die Festlegung der benötigten Möbel und Einrichtungen, wobei Architekten und Planungsteams die Fläche optimal nutzen und funktionale sowie ergonomische Anforderungen berücksichtigen. Zu diesem Zeitpunkt werden noch keine spezifischen Produkte oder Hersteller ausgewählt, sondern nur geometrische Formen verwendet, um die Möbel zu visualisieren. Nach der Erstellung des Grundrisses erfolgt die Auswahl konkreter Produkte, die im Warenwirtschaftssystem dokumentiert und für den Ausschreibungsprozess genutzt werden.

> **Dieser Prozessschritt kann im Rahmen des Digitalisierungsprojekts nicht berücksichtigt werden**, weshalb die beiden vorliegenden Grundrisse als festgelegte Ausgangsbasis dienen.

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

##  1. <a href="Grundriss">Erfassung der Stückzahlen</a>

Nachdem der Grundriss und die Produktfestlegungen erstellt wurden, bildet dieser die Basis für die Erfassung der benötigten Stückzahlen. Bisher erfolgte dies manuell, indem die Stückzahlen direkt aus den Grundrissen abgelesen wurden, was arbeitsintensiv und fehleranfällig war. Das Ergebnis ist eine detaillierte Liste mit den Bezeichnungen der Möbelstücke und deren Anzahl in den verschiedenen Projektbereichen, die die genaue Menge und die spezifischen Produkte für weitere Arbeitsschritte bereitstellt.

> Es wurde zunächst eine Lösung mit <a href="https://yolov8.com/">**Computer Vision**</a> und <a href="https://github.com/tesseract-ocr/tesseract">**OCR-Algorithmen**</a> in Erwägung gezogen, jedoch aufgrund von Fehlerpotenzial und hohem Implementierungsaufwand verworfen. Stattdessen wurde die <a href="https://pypi.org/project/pyautocad/">**Python-API von AutoCAD**</a> vorgeschlagen, um direkt die Metadaten aus den Grundrissen auszulesen, was eine präzisere und ressourcenschonendere Lösung darstellt.

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 2. <a href="Technischer_Vorbeschrieb">Erstellung des technischen Vorbeschriebs</a>

Die Erstellung des technischen Vorbeschriebs ist ein aufwendiger Schritt, der eine standardisierte Struktur folgt und die technischen Kriterien jedes Möbelstücks wie Abmessungen, Materialien, Farben, Serviceaspekte, Nachhaltigkeit und Skizzen detailliert beschreibt. Für jedes Möbelstück wird ein separates Dokument erstellt, wobei die Informationen aus verschiedenen Quellen wie PDF-Dokumenten, Webseiten oder internen Portalen stammen und neutralisiert werden müssen, um herstellerspezifische Angaben zu vermeiden.

> Dieser Prozessschritt wurde im Rahmen des Digitalisierungsprojekts mithilfe des <a href="https://ollama.com/"> **Sprachmodells OLLAMA**</a> und durch die Erstellung eines Templates mit <a href="https://openpyxl.readthedocs.io/en/stable/">**Openpyxl**</a> erfolgreich umgesetzt.

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## <a href="Mengengeruest">3. Erstellung des Mengengerüsts</a>

Der abschließende Schritt bei der Vorbereitung der Ausschreibungsunterlagen ist die Erstellung eines Mengengerüsts, einer Excel-Tabelle, die den Produktnamen, eine detaillierte Beschreibung und die benötigte Menge enthält. Weitere Spalten für die vorgeschlagenen Preise der Bewerber sowie eine Formel zur Berechnung der Gesamtpreise sind ebenfalls erforderlich. Zudem müssen die Herstellerinformationen neutralisiert werden, um einen fairen Wettbewerb zu gewährleisten.

> Durch eines standardisierten Templates, welches mithilfe von <a href="https://openpyxl.readthedocs.io/en/stable/">**Openpyxl**</a> erstellt wurde, konnte die Formatierung in Python abgebildet werden. Die Produktinformationen ließen sich aus dem Warenwirtschaftssystem auslesen, transformieren, mithilfe des <a href="https://ollama.com/"> **Sprachmodells OLLAMA**</a> neutralisieren und in das Template übertragen.