# Propozycja reguł dla agenta — nieaktywna

Ten plik jest szkicem do przeglądu. Nie nazywa się `AGENTS.md`, więc nie jest automatycznie wczytywany jako instrukcja projektu.

## Reguły wynikające z pracy nad projektem

- Nie zmieniaj ustawień ani uprawnień użytkownika w Git, Codex, WordPressie i systemie bez jego wyraźnej dyspozycji. Zmiany zatwierdzone przez użytkownika wykonuj w uzgodnionym zakresie.
- Nie zapisuj sekretów ani prywatnych danych kontaktowych w repozytorium. Publiczny adres kontaktowy należy do ustawień wtyczki w bazie WordPressa; w kodzie pozostaje przykładowy adres.
- Edytuj źródło w repozytorium, a kopię w instalacji Local traktuj jako środowisko uruchomieniowe. Nie edytuj plików WordPress core.
- Po zmianie kodu uruchom `bash scripts/check-syntax.sh`, a po zmianie kalkulatora sprawdź jego zachowanie na lokalnej stronie. Szczegóły uruchomienia są w `README.md`.
