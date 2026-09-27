# Health check — Pracownia WWW (M1L3)

Data: 27.09.2026. Metoda: [lekcja 10xDevs „AI-Powered Bootstrap”](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/7c9fe782-63f7-4019-a083-a749bd055bfa), ścieżka dla istniejącego projektu. To audyt wykonany w Codexie na podstawie plików i lokalnej instalacji; kursowy skill `/10x-health-check` nie został uruchomiony.

**Werdykt: `needs-attention`.** Projekt działa lokalnie i ma mało zależności, ale nie ma jeszcze powtarzalnej ścieżki kontroli zmian. Najważniejszy brak to test głównego przepływu.

## Pre-check: stan projektu i zależności

| Kontrola | Status | Dowód / uwaga |
| --- | --- | --- |
| Wejście z M1L2 | `passed` | `context/foundation/stack-assessment.md` zawiera ocenę stacku i plan kompensacji. |
| Istniejący projekt | `passed` | Motyw blokowy, wtyczka kalkulatora i statyczny projekt odniesienia są w `outputs/`. |
| Zgodność z Local | `passed` | Każdy z 11 plików motywu i wtyczki w `outputs/wordpress/` ma identyczną zawartość jak aktywna kopia w `wp-content/`. |
| Zależności aplikacji | `passed` | Motyw i wtyczka nie deklarują zależności npm ani Composer; używają API WordPressa. Brak lockfile'a jest tutaj konsekwencją braku zewnętrznych pakietów. |
| Audyt podatności pakietów | `skipped` | Nie ma manifestu npm/Composer, więc `npm audit` i odpowiednik Composer nie mają czego sprawdzać. Ten krok nie ocenia bezpieczeństwa samego WordPressa ani innych wtyczek instalacji Local. |

## In-check: weryfikacja i organizacja

| Kontrola | Status | Dowód / uwaga |
| --- | --- | --- |
| Składnia PHP | `passed` | `php -l` dla `functions.php` i `pracownia-wycena.php`: bez błędów. |
| Składnia JavaScript | `passed` | `node --check` dla plików JS projektu: bez błędów. |
| JSON | `passed` | `theme.json` i `block.json` parsują się bez błędów. |
| Uruchomienie strony | `passed` | W poprzednim kroku sprawdzono lokalnie zmianę liczby podstron, wyniku i linku e-mail. Nie jest to test automatyczny. |
| Test runner i testy | `warned` | Brak testów oraz polecenia do ich uruchamiania. Nie można wykazać automatycznie poprawności przepływu z PRD. |
| CI/CD | `warned` | Brak konfiguracji pipeline w plikach projektu. |
| Repozytorium Git | `passed` | Po audycie utworzono i sklonowano `cleandrops/10xdevs` z historią `main`; kod projektu jest przygotowywany w tej lokalnej kopii. Instalacja Local pozostaje środowiskiem uruchomieniowym. |
| Reguły dla agenta | `warned` | Brak lokalnego `AGENTS.md` opisującego granice motywu, wtyczki i instalacji Local. Temat M1L4. |
| Konfiguracja formatowania | `warned` | Brak `.editorconfig`, formatowania PHP/JS i kontroli stylu. Przy tej skali może poczekać do ustawienia repozytorium. |

## Priorytety

### A — przed dalszą rozbudową

1. Dodać powtarzalny test najważniejszego przepływu: wybór liczby podstron → kwota → `mailto:`. Uwzględnić wartość niepoprawną i granicę zakresu.
2. Utrzymywać `cleandrops/10xdevs` jako jedno źródło kodu. Instalacja Local powinna być kopią do uruchamiania. Instrukcja instalacji jest w README repozytorium; opcje zapisane w bazie WordPressa trzeba ustawiać osobno.

### B — następne lekcje

1. M1L4: krótkie reguły projektu w `AGENTS.md`, obejmujące strukturę i bezpieczną pracę z instalacją Local.
2. Kolejny etap jakości: dodać do CI kontrolę składni i test przepływu. Bez repozytorium zdalnego nie ma jeszcze miejsca do uruchomienia pipeline.
3. Przed publicznym użyciem: zatwierdzić ceny i treść oferty; obecne kwoty są przykładowe.

## Przekazanie do M1L4

Wejście: ten raport oraz `stack-assessment.md`. W `AGENTS.md` zapisać, gdzie jest kod źródłowy, jak trafia do Local, kto może zmieniać ceny, jak liczy się kwotę i które kontrole trzeba wykonać po zmianie. Nie kopiować szerokiej polityki uprawnień z przykładu dla Claude Code do konfiguracji Codexa.

## Lekcja w 60 sekund

- Nowy projekt można postawić ze sprawdzonego startera. Istniejący projekt najpierw się audytuje.
- Praca agenta ma trzy bramki: sprawdzenie wejścia, kontrolowane wykonanie i raport z wynikiem.
- Zgody na działania powinny odpowiadać ich rzeczywistemu zasięgowi. Szerokie zezwolenia na wszystkie komendy nie są potrzebne do pracy nad tym lokalnym projektem.
- Raport na dysku pozwala kolejnej sesji zacząć od faktów, bez odtwarzania całej rozmowy.
