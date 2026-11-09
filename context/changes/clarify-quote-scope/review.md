# Solo Code Review — `clarify-quote-scope`

Przegląd z 09.11.2026 według [lekcji 10xDevs M2L3](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/3de0476d-a31b-41da-9230-db786985a6f9). Zakres: commit `f56d7b3`, plan zmiany i S-01 z roadmapy. To ręczny przegląd w Codexie według sześciu wymiarów; kursowego `/10x-impl-review` nie instalowano.

## Scorecard

| Wymiar | Ocena | Dowód |
| --- | --- | --- |
| Plan Adherence | częściowo | Zmieniono wskazane dwa pliki kodu. Stawka jest dynamiczna, ale opis nadal nie określa faktycznego zakresu usług w pakiecie. |
| Scope Discipline | tak | Bez zmian wzoru, cen, uprawnień, danych i konfiguracji wdrożenia. |
| Safety & Quality | tak dla kodu; bramka treści otwarta | Wartość stawki jest formatowana funkcją WordPressa i escapowana. Treść wymaga decyzji właściciela przed publikacją. |
| Architecture | tak | Oferta pozostaje w blokowym szablonie, a dane cenowe we wtyczce i opcjach WordPressa. |
| Pattern Consistency | tak | Użyto istniejących bloków akapitu i `esc_html`; nie dodano zależności. |
| Success Criteria | częściowo | Lokalnie sprawdzono kwoty i widok mobilny. Samo „ile podstron” nie odpowiada jeszcze na pytanie „co zawiera pakiet”. |

## Findings i triage

### R-01 — Niepełny zakres pakietu

- **Severity:** observation dla prototypu; warning przed użyciem jako realnej oferty. **Impact:** medium (decyzja produktowa i treść strony). **Miejsce:** `wordpress/pracownia-www/templates/front-page.html:22`.
- **Dowód:** nowy akapit mówi, że pakiet obejmuje liczbę podstron z kalkulatora. Nie wskazuje, jakie prace i materiały są w cenie bazowej. `prd.md` FR-001 i roadmapa S-01 oczekują jasnego opisu pakietu, ale dokładny zakres usług pozostaje otwartą decyzją właściciela.
- **Decyzja:** **accept risk dla prototypu**. Właściciel pytał, które podejście będzie lepsze; rekomendacja to zachować neutralny opis na potrzeby szkolenia i nie dopisywać nieuzgodnionych obietnic. Przed użyciem strony jako realnej oferty określić zakres i ponownie przejrzeć tekst. Ta decyzja nie jest zgodą na publikację nowej wersji.

### R-02 — Brak nowego testu automatycznego

- **Severity:** observation. **Impact:** low dla tego commita. **Miejsce:** cały wycinek.
- **Dowód:** kontrola składni nie sprawdza zachowania kalkulatora. W tej zmianie algorytm i `view.js` pozostały bez zmian; w poprzedniej sesji ręcznie sprawdzono 1 i 2 podstrony oraz widok 390 px.
- **Decyzja:** **skip**. Nie dokładamy doraźnego testu tylko dla etykiety; powtarzalny test całego przepływu jest już zaplanowany jako F-01 i odblokuje S-02/S-03. To świadome ograniczenie zakresu, nie uznanie testu składni za test funkcjonalny.

### R-03 — Trudny do czytania diff szablonu

- **Severity:** observation. **Impact:** low. **Miejsce:** `front-page.html:22`.
- **Dowód:** cała sekcja `#wycena` jest jednym wierszem HTML z komentarzami bloków, więc drobna zmiana tekstu wygląda jak wymiana długiej linii. Format istniał przed tym commitem.
- **Decyzja:** **skip**. Przeformatowanie całego szablonu zwiększyłoby diff i ryzyko dla prostego wycinka. Wrócić do tego tylko przy większej edycji szablonu.

## Weryfikacja i werdykt

- `bash scripts/check-syntax.sh`: passed.
- `git show --check --format= f56d7b3`: passed.
- Oba zmienione pliki w Local mają tę samą sumę SHA-1 co pliki w repo. To potwierdza kopię plików, nie bieżący stan strony ani produkcję.
- **Werdykt: approve dla prototypu szkoleniowego; publikacja nowej wersji pozostaje osobną decyzją.** Kod jest mały i zgodny z planem technicznym. R-01 jest świadomie przyjętym ograniczeniem treści, a R-02 i R-03 są rozstrzygnięte jako skip z uzasadnieniem. Nie ma potrzeby tworzyć nowej ogólnej reguły w `lessons.md` na podstawie jednego przypadku.
