# Πλάνο Προπόνησης

Εφαρμογή γυμναστικής με πρόγραμμα προπόνησης, καταγραφή βαρών και επαναλήψεων, σωματικό βάρος και 3D οδηγό τεχνικής για κάθε άσκηση (κίνηση με ανθρώπινο χαρακτήρα και ανατομικό μοντέλο μυών).

**Εφαρμογή:** https://petrosfs.github.io/Gym-app-3D/

## Εικόνες

<table>
  <tr>
    <td align="center"><img src="screenshots/sima.png" width="220" alt="Προπόνηση της ημέρας"><br><sub>Προπόνηση της ημέρας</sub></td>
    <td align="center"><img src="screenshots/evdomada.png" width="220" alt="Εβδομαδιαίο πρόγραμμα"><br><sub>Εβδομαδιαίο πρόγραμμα</sub></td>
    <td align="center"><img src="screenshots/askisi-3d.png" width="220" alt="3D κίνηση της άσκησης"><br><sub>3D κίνηση της άσκησης</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/mues.png" width="220" alt="Ανατομικό μοντέλο μυών"><br><sub>Μύες που δουλεύουν</sub></td>
    <td align="center"><img src="screenshots/antigrafo.png" width="220" alt="Αντίγραφο ασφαλείας"><br><sub>Αντίγραφο ασφαλείας</sub></td>
    <td></td>
  </tr>
</table>

## Δεδομένα και αντίγραφο ασφαλείας

Όλα τα δεδομένα (προφίλ, πρόγραμμα, καταγραφές, σωματικό βάρος) αποθηκεύονται μόνο στη συσκευή και τον browser που χρησιμοποιείς. Αν καθαρίσεις τα δεδομένα του browser ή αλλάξεις συσκευή, χάνονται.

Στην ενότητα **Προφίλ** υπάρχουν τα κουμπιά **Εξαγωγή** και **Εισαγωγή** για αντίγραφο ασφαλείας. Η εφαρμογή σου θυμίζει να πάρεις αντίγραφο όταν έχουν περάσει 7 μέρες από το τελευταίο.

## Αρχεία

- `index.html`: η εφαρμογή
- `char_f.json`, `char_m.json`: οι 3D χαρακτήρες
- `muscles.json`: το ανατομικό μοντέλο μυών
- `screenshots/`: οι εικόνες αυτού του README

Η εφαρμογή είναι στατική σελίδα και δεν χρειάζεται build. Για τοπική εκτέλεση σέρβιρε τον φάκελο με οποιονδήποτε στατικό server, π.χ. `python3 -m http.server`.

## Πηγές και άδειες

- Χαρακτήρες κίνησης: [Universal Base Characters](https://quaternius.com/packs/universalbasecharacters.html) του Quaternius (CC0).
- Ανατομικό μοντέλο: [Z-Anatomy](https://github.com/Z-Anatomy/The-blend) (CC BY-SA 4.0), βασισμένο στο [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/), © The Database Center for Life Science (CC BY 4.0). Το `muscles.json` είναι απλοποιημένη εκδοχή του και ισχύει για αυτό η άδεια CC BY-SA 4.0.
