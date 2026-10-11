# Plan — clarify-quote-scope

## End state

Sekcja wyceny wyjaśnia, że przykład dotyczy edytowalnej strony WordPress, ile podstron obejmuje pakiet bazowy i jak liczone są kolejne. Kwoty i liczba podstron pozostają pobierane z ustawień. Tekst oferty da się edytować w Gutenbergu.

## Scope and contracts

- `wordpress/pracownia-www/templates/front-page.html`: zmienić tylko bloki akapitu w sekcji `#wycena`; zachować blok kalkulatora i strukturę szablonu. Nie wpisywać na stałe ceny ani liczby podstron, bo administrator może je zmienić.
- `wordpress/pracownia-wycena/pracownia-wycena.php`: przy rozbiciu ceny pokazać stawkę za jedną dodatkową podstronę z aktualnej opcji `extra_page_price`; nie zmieniać obliczeń w `view.js` ani formularza ustawień.

## Phases

1. Dodać zwięzły, edytowalny opis zakresu i dopłaty przy kalkulatorze.
2. Pokazać dynamiczną stawkę za dodatkową podstronę w rozbiciu ceny.
3. Sprawdzić składnię oraz ręcznie zweryfikować obie wersje wyceny i układ na telefonie. Zatwierdzenie treści i wdrożenie produkcyjne są osobną bramką.

## Success criteria

- Odwiedzający widzi wyjaśnienie pakietu, stawkę za dodatkową podstronę i orientacyjny charakter kwoty.
- Przy liczbie podstron w pakiecie dopłata wynosi 0; ponad pakietem zachowuje dotychczasowy wzór.
- Etykieta czyta tę samą bieżącą opcję `extra_page_price`, której kalkulator używa do wyliczenia dopłaty.
- `bash scripts/check-syntax.sh` przechodzi; sekcja pozostaje czytelna na wąskim ekranie.

## Risks / open questions

- Dokładny zakres usług pakietu nie jest jeszcze uzgodniony, więc opis ogranicza się do faktów z obecnego produktu. Właściciel powinien zatwierdzić tekst przed publikacją.
- Edycje szablonu zapisane w bazie przez Edytor witryny mogą nadpisywać plikowy szablon. Sprawdzić lokalny widok po wdrożeniu do Local.

## Plan review

- Roadmap match: tak, S-01; jeden wycinek i dwa pliki kodu.
- Fazy i kontrakty: rozdzielone, bez zmiany algorytmu.
- Weryfikacja: zachowanie i widok, nie samo istnienie plików.
- Werdykt: ready for implementation; tekst pozostaje roboczy do decyzji właściciela przed publikacją.

## Progress

- Phase 1: done — dwa edytowalne akapity w sekcji wyceny.
- Phase 2: done — etykieta stawki w rozbiciu ceny czyta `extra_page_price` z ustawień.
- Phase 3: done locally — `bash scripts/check-syntax.sh` i `git diff --check` przeszły; w Local wynik dla 1 podstrony to 1500 zł + 0 zł, dla 2 podstron 1500 zł + 300 zł = 1800 zł; widok mobilny 390 px był czytelny. Nie zmieniano ustawień WordPressa, więc alternatywnej stawki nie sprawdzono ręcznie. Produkcja i zatwierdzenie tekstu pozostają poza tą fazą.
