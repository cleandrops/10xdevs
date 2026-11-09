# Debugowanie z AI — cichy błąd zapisu ustawień wyceny

## Audyt przepływu

Przejrzany przepływ: administrator zapisuje parametry wtyczki → WordPress sanitizuje ustawienia → kalkulator pokazuje adres kontaktowy i buduje `mailto:`. Kalkulator nie ma własnego API ani wysyłki poczty; link otwiera program pocztowy odwiedzającego. Wybrano realny cichy błąd w zapisie ustawień, a nie fikcyjny błąd sieciowy.

## Objaw i przyczyna

Niepoprawny adres e-mail był po cichu zastępowany `kontakt@example.com`. Administrator mógł odnieść wrażenie, że nowe ustawienia zostały zapisane, a strona pokazywała przykładowy adres. Przyczyna: operator warunkowy w `prw_sanitize_quote_settings()` bez sygnału błędu.

## Reprodukcja i poprawka

`php tests/quote-settings.test.php` początkowo kończył się wyjątkiem: stary adres `studio@example.test` został zastąpiony wartością domyślną. Po poprawce niepoprawny adres odrzuca cały zapis, zachowuje poprzednie parametry, zgłasza błąd w panelu WordPress i zapisuje wpis bez adresu e-mail w logu PHP. Poprawny adres nadal się zapisuje.

## Weryfikacja

- `php tests/quote-settings.test.php` — przechodzi.
- `php -l wordpress/pracownia-wycena/pracownia-wycena.php` — poprawna składnia.
- `node --test tests/calculator.test.js` — 3/3 przechodzą.

Test PHP używa atrap funkcji WordPress i nie sprawdza panelu na działającej instalacji. Wpis logu trafi do standardowego celu `error_log` skonfigurowanego na serwerze; nie skonfigurowano zewnętrznego monitoringu. Zmiana jest wyłącznie w repozytorium i wymaga osobnego wdrożenia do WordPressa.
