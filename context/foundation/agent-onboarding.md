# M1L4 — Agent Onboarding: reguły dla AI

## Sedno lekcji

1. Reguła dla agenta powinna opisywać lokalną, nieoczywistą konwencję i mówić, jak działać. Ogólne hasła o jakości kodu i treść już dostępną w README pomijamy.
2. Plik `AGENTS.md` jest dla Codexa instrukcją odczytywaną automatycznie. Dlatego propozycja dla tego projektu jest zapisana jako nieaktywny `agent-rules-draft.md`.
3. Reguły warto oceniać przez ich wpływ na konkretną pracę, a nie przez samą długość pliku.

## Co zrobiliśmy w projekcie

- Przejrzeliśmy README, strukturę motywu i wtyczki oraz skrypt kontroli składni.
- Przygotowaliśmy krótki szkic dotyczący granic pracy, podziału odpowiedzialności i sprawdzenia kalkulatora. Nie zmieniliśmy ustawień użytkownika.

## Próba A/B

Na prośbę użytkownika wykonaliśmy trzy świeże próby bez reguły i trzy z jedną regułą w `AGENTS.md`, wyłącznie w izolowanych kopiach repozytorium. Wyniki i kryteria są w `agent-rule-experiment.md`. Wszystkie próby były poprawne, więc testowana reguła została usunięta ze szkicu. Główne repozytorium nie ma aktywnego `AGENTS.md`.

Nie uruchomiliśmy dosłownie kursowych komend `/init` i `/10x-rule-review`: szkic oraz przegląd powstały ręcznie, aby nie zmieniać ustawień użytkownika.
