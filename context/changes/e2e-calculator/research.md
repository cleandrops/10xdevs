# M3L4 — research E2E

Ryzyko wymagające przeglądarki: wtyczka renderuje blok, skrypt reaguje na wpis użytkownika, kwota pojawia się w realnym WordPressie i kontakt ma właściwe `mailto:`. To przekracza granicę PHP → HTML → JS; test F-01 z modelem DOM jej nie obejmuje. Drugie ryzyko to mobilny stan błędu i powrót do poprawnej wartości, możliwe do sprawdzenia tylko w wyrenderowanym UI. Źródła: `prd.md` FR-002–FR-005 i kryterium telefonu/komputera oraz `context/foundation/test-plan.md`.

Local udostępnia gotowy WordPress pod `http://localhost:10003/`. E2E nie potrzebuje konta, bazy testowej ani zapisu ustawień. Parametry wyceny test odczytuje z renderowanego bloku, a oczekiwany wynik liczy według reguły z PRD. To nie testuje uprawnień administratora ani zapisu opcji.

Wybrano Playwright Test z jednym workerem i istniejącym w pamięci komputera Chromium v1228; pakiet Playwright 1.61.1 wymaga właśnie tej rewizji. [Oficjalna dokumentacja](https://playwright.dev/docs/browsers) opisuje wybór przeglądarek. Konfiguracja wskazuje Local; uruchomienie wymaga włączonej witryny w aplikacji Local. Początkowo użyty systemowy Chrome zamykał się przed testem; domyślny Chromium również nie uruchamia się w ograniczonym środowisku tej sesji (`MachPortRendezvousServer: Permission denied`). To ograniczenie uruchamiania procesu, nie wynik asercji testów.
