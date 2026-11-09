# Kalkulator: stany interakcji (M2L5)

Cel: osoba korzystająca z kalkulatora ma łatwo zauważyć błędną liczbę podstron i pozycję fokusu klawiatury. Zakres: wyłącznie CSS kalkulatora w motywie; bez zmian cen, logiki i innych sekcji.

## Audyt widoku

1. `wordpress/pracownia-www/style.css:12`: pole z `aria-invalid` zachowuje zielony obrys fokusu, mimo czerwonego komunikatu. Błąd jest trudniejszy do powiązania z polem.
2. `wordpress/pracownia-www/style.css:12`: przyciski plus/minus mają styl hover, ale brak jawnego `:focus-visible`. Przy obsłudze klawiaturą aktywny przycisk jest słabo widoczny.
3. `wordpress/pracownia-www/style.css:12`: link e-mail ma styl hover, lecz brak jawnego `:focus-visible`. Trudniej rozpoznać ostatni krok klawiaturą.

## Kontrakt UI

- Kolor błędu jest lokalną zmienną `--prw-error`; stan `aria-invalid="true"` oraz komunikat używają jej razem.
- Fokus przycisków i linku używa istniejącego koloru motywu `--green`.
- Sprawdzić desktop i telefon: stan poprawny, błąd, powrót do poprawnej wartości oraz fokus klawiatury.
- Kalkulator liczy lokalnie, więc stan ładowania nie występuje. Granice licznika pozostają w zadaniu S-02 po F-01.
