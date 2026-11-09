# Pracownia WWW — projekt 10xDevs

Motyw blokowy WordPress zbudowany na podstawie statycznego HTML oraz wtyczka z kalkulatorem orientacyjnej ceny strony. Projekt służy do ćwiczeń z 10xDevs 4.0.

## Struktura

- `reference/` — projekt odniesienia w HTML, CSS i JavaScript.
- `wordpress/pracownia-www/` — motyw blokowy z szablonami Gutenberga.
- `wordpress/pracownia-wycena/` — wtyczka z blokiem kalkulatora i ustawieniami.
- `prd.md`, `shape-notes.md`, `context/foundation/` — wymagania i wyniki kolejnych lekcji.

## Uruchomienie lokalnie

1. Przygotuj lokalną instalację WordPressa, na przykład w Local.
2. Skopiuj `wordpress/pracownia-www/` do `wp-content/themes/pracownia-www/` i `wordpress/pracownia-wycena/` do `wp-content/plugins/pracownia-wycena/` tej instalacji.
3. W panelu WordPressa włącz wtyczkę **Pracownia WWW — Wycena** i motyw **Pracownia WWW**. Ustaw tytuł witryny na **Pracownia WWW**.
4. W **Ustawienia → Wycena strony** wpisz własny adres kontaktowy oraz ceny. Adres w stopce jest pobierany z tych samych ustawień. W repozytorium domyślnie jest `kontakt@example.com`.
5. Otwórz stronę główną i sprawdź zmianę kwoty po zmianie liczby podstron oraz adres i treść linku e-mail.

Ustawienia zapisane w bazie WordPressa nie są częścią repozytorium. Początkowe kwoty 1500 zł + 300 zł za dodatkową podstronę są tylko przykładami.

## Kontrola kodu

Uruchom `bash scripts/check-syntax.sh` w katalogu repozytorium. Skrypt wymaga lokalnych `php` i `node` i sprawdza składnię plików PHP, JavaScript oraz JSON.

Uruchom `node --test tests/calculator.test.js` (Node 18+), aby sprawdzić regułę wyceny, odrzucenie niepoprawnej wartości i zawartość linku e-mail. Test wykonuje rzeczywisty `view.js` w małym modelu DOM; nie wymaga WordPressa ani nowych pakietów. Nie zastępuje testu E2E w przeglądarce. CI jest osobnym późniejszym etapem.

## E2E na lokalnym WordPressie

Włącz witrynę ClearWP w aplikacji Local, a potem w katalogu repozytorium uruchom `npm ci` i `npm run test:e2e`. Test używa Chromium Playwrighta w osobnym profilu, nie zmienia ustawień przeglądarki ani danych WordPressa. Jeśli Chromium nie jest zainstalowany, uruchom `npx playwright install chromium`. Domyślny adres to `http://localhost:10003`; dla innej instalacji ustaw `PRW_BASE_URL` na jej lokalny adres. Uruchom test dwukrotnie, aby sprawdzić powtarzalność. Zrzuty z testów trafiają do ignorowanego przez Git katalogu `test-results/`.
