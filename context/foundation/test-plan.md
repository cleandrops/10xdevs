# Plan testów — Pracownia WWW (M3L1)

Źródło metody: [10xDevs 4.0, „Plan testów z AI”](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/f7ee9b20-dbac-4368-8ff8-4520a7a593db). Plan dotyczy obecnego prototypu WordPress; nie uruchamiano kursowego skilla `/10x-test-plan` ani nie instalowano nowych zależności.

## 1. Kontekst i granice

Pierwszy wartościowy przepływ: odwiedzający czyta ofertę, wybiera liczbę podstron, widzi orientacyjną kwotę i otwiera e-mail z podsumowaniem. Ceny są przykładowe, a treść oferty czeka na decyzję właściciela przed publikacją zmian. Projekt nie ma płatności, kont klienta, API wycen ani historii danych odwiedzających (`prd.md`, „Zakres MVP” i „Poza zakresem”). Czas dostępny na naukę: 2–4 godziny tygodniowo.

## 2. Źródła i stan obecny

| Źródło | Co wnosi |
| --- | --- |
| `prd.md` | Reguła ceny, FR-001–FR-006, US-001–US-004 i kryteria sukcesu; niezależne źródło oczekiwanych wyników. |
| `context/foundation/roadmap.md` | F-01 ma chronić główny przepływ i odblokować S-02 oraz S-03. |
| `context/foundation/health-check.md`, `stack-assessment.md` | Brak automatycznego testu zachowania i CI; stos WordPress/PHP/JS bez bundlera. |
| Historia Git, pliki źródłowe | Ostatnie zmiany dotyczyły widoku wyceny w motywie i wtyczce; to sygnał aktywnego obszaru, a nie dowód usterki. |

`scripts/check-syntax.sh` sprawdza składnię PHP, JS i JSON. W repo nie ma plików testowych, konfiguracji PHPUnit/Playwright ani CI. Dotychczasowy przegląd działania był ręczny na lokalnym WordPressie. Nie ma aktywnego `AGENTS.md`; wcześniejszy eksperyment z regułami opisano w `agent-rule-experiment.md`.

## 3. Mapa ryzyk

Skala: **wysoki wpływ** = główny przepływ nie działa lub publicznie pokazuje błędną ofertę; **średni** = część użytkowników ma utrudnienie z obejściem; **niski** = kosmetyka. **Wysokie prawdopodobieństwo** = obszar aktywnie zmieniany; **średnie** = zmieniany okazjonalnie; **niskie** = stabilny. Oceny są hipotezami do rewizji po pierwszych testach, nie diagnozą kodu.

| Priorytet | Scenariusz awarii widoczny dla użytkownika | Wpływ | Prawdopodobieństwo | Sygnał / wyrocznia |
| --- | --- | --- | --- | --- |
| P1 | Klient wybiera podstrony, a kwota nie odpowiada cenie bazowej plus dopłacie tylko za nadwyżkę. | wysoki | wysoki | `prd.md`: reguła biznesowa, FR-003/004, US-001; aktywny obszar wyceny w historii Git. |
| P1 | Po niepoprawnej liczbie podstron klient widzi kwotę lub aktywne zapytanie sugerujące prawidłową wycenę. | wysoki | średni | `prd.md`: FR-002 i kryteria sukcesu; roadmapa S-02. |
| P1 | E-mail zawiera inną liczbę podstron lub kwotę niż widok albo trafia na błędny adres. | wysoki | średni | `prd.md`: FR-005, US-002; roadmapa S-03. |
| P2 | Osoba bez uprawnień zmienia ceny lub adres kontaktowy. | wysoki | niski | `prd.md`: FR-006, US-004; to scenariusz nadużycia. Nie stwierdzono podatności. |
| P2 | Zmiana parametrów przez administratora nie trafia do kolejnej wyceny. | średni | średni | `prd.md`: FR-004, US-003; parametry pochodzą z opcji WordPressa. |
| P3 | Kalkulator jest trudny w obsłudze na telefonie lub klawiaturą. | średni | średni | `prd.md`: kryteria sukcesu; przegląd UI M2L5 sprawdził jeden widok, wymaga ponawiania przy zmianach. |

Najpierw weryfikujemy regułę z PRD, nie przepisujemy do asercji aktualnych wyników kodu. Przykład przy ustawieniach 1500 zł / 1 podstrona / 300 zł za dodatkową: 1 → 1500 zł, 2 → 1800 zł, 0 → brak wyceny. Przy innych ustawieniach test musi wyliczyć oczekiwanie z konfiguracji i reguły, bez kopiowania wyniku z UI.

## 4. Stack i dobór kontroli

- **Lokalnie:** WordPress przez Local; motyw blokowy PHP/HTML/CSS i wtyczka PHP/JS. Repo nie zawiera bazy ani danych produkcyjnych.
- **Teraz:** `bash scripts/check-syntax.sh` po zmianie PHP/JS/JSON; ręczny przegląd konkretnego scenariusza po zmianie UI.
- **Faza 1 — F-01:** znaleźć najlżejszą powtarzalną kontrolę przepływu kalkulatora i e-maila, uruchamianą jedną udokumentowaną komendą. Research porówna test skryptu JS z minimalnym testem przeglądarkowym; wybór narzędzia dopiero po sprawdzeniu środowiska. Kryteria: 1, 2 i 0 podstron, zgodność kwot i `mailto:` z PRD, wynik jednoznaczny dla kolejnej osoby.
- **Faza 2 — S-02/S-03:** rozszerzyć tę samą kontrolę o granice licznika i pełniejsze podsumowanie e-maila, zanim zmieni się kod produkcyjny.
- **Faza 3 — dostęp i ustawienia:** przy zmianach panelu opcji sprawdzić brak zapisu bez `manage_options` oraz wpływ poprawnego zapisu na następną wycenę. Dobrać poziom testu po researchu; bez rozbudowy środowiska wyłącznie dla pokrycia.

## 5. Quality gates

1. **Przed commitem zmiany kodu:** kontrola składni, jeśli dotyczy PHP/JS/JSON; dla kalkulatora od fazy 1 także komenda testu zachowania.
2. **Review:** porównać asercje z PRD, sprawdzić diff, uruchomić scenariusz ryzyka zmienionego w danym commicie. Test musi zawieść przy celowo błędnej regule w izolowanej próbie, zanim uznamy go za ochronę.
3. **Przed publikacją:** lokalny przepływ na telefonie i komputerze, zatwierdzenie tekstu oferty oraz kopia zapasowa i możliwość przywrócenia po stronie właściciela. Produkcja jest osobną decyzją.

Na razie nie dodajemy hooków, triggerów ani CI: projekt nie ma jeszcze testu zachowania, a automatyzacja pustej bramki nie chroniłaby użytkownika. Nie inwestujemy w snapshoty całej strony, testowanie WordPress core ani sztuczny cel procentowego coverage.

## 6. Cookbook i status

**Cookbook:** do uzupełnienia po F-01: lokalizacja testu, komenda, przygotowanie danych i polityka mockowania. Nie wpisujemy wzorca, zanim nie powstanie działający przykład.

**Status:** plan gotowy; faza 1 (F-01) następna. Wejście do kolejnej sesji: research sposobu uruchomienia najtańszego testu głównego przepływu, potem plan i implementacja. Po każdej fazie wrócić do mapy ryzyk i zaktualizować status.
