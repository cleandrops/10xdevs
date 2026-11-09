# M3L4 — stan przeglądu

- Seed: rzeczywisty blok WordPress, zmiana liczby podstron, kwota z reguły PRD i adres oraz treść `mailto:`.
- Drugi scenariusz: telefon 390 px, błędna wartość 0, brak wyceny i aktywnego kontaktu, powrót do poprawnej wartości, brak poziomego przewijania.
- Izolacja: testy tylko czytają stronę i zmieniają wartość pola w własnej sesji przeglądarki. Nie zapisują opcji WordPressa ani nie wysyłają e-maila. Jeden worker, brak współdzielonych danych testowych.
- Kontrola ręczna w przeglądarce: 2 podstrony → 1800 zł, 300 zł dopłaty i zgodne `mailto:`; przy 0 na telefonie widać błąd, wynik „—” i nieaktywny kontakt.
- `node --check` przechodzi dla konfiguracji i speca. Wersja Playwright 1.61.1 odpowiada obecnemu w pamięci Chromium v1228. W ograniczonym środowisku agenta przeglądarka nie startuje (`MachPortRendezvousServer: Permission denied`), ale właściciel uruchomił `npm run test:e2e` w zwykłym terminalu dwukrotnie: za każdym razem **2/2 testy przeszły** (2,0 s oraz 1,9 s). Konfiguracja nie korzysta z systemowego Chrome.
- Zrzuty docelowego widoku wykonane w przeglądarce: `../e2e-calculator-desktop.png` oraz `../e2e-calculator-mobile-error.png` (poza repozytorium). Automatyczne zrzuty Playwrighta pokazują początek strony, więc do oceny wizualnej użyto tych dwóch osobnych obrazów. Nie wykonano osobnego eksperymentu czerwonego testu E2E; wcześniejszy test mutacji F-01 wykrył usunięcie dopłaty na poziomie skryptu.
