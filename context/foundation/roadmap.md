# Roadmapa MVP — Pracownia WWW (M2L1)

Źródło metody: [10xDevs 4.0, „Roadmapa MVP: milestony, zależności i priorytety”](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/04fd5d8a-b0df-4baf-8e90-f8dba7293def). Roadmapa powstała na podstawie `prd.md`, kodu i wcześniejszego audytu. Kursowy skill `/10x-roadmap` nie był instalowany. Nie zakładamy dodatkowego narzędzia do backlogu.

milestone_id: M-01  
milestone_seq: 1  
milestone_status: open

## Milestone

**M-01 — Zrozumiała wycena od oferty do e-maila.** Główny cel właściciela: nauczyć się 10xDevs Workflow na małych zmianach w działającym projekcie. Największa przeszkoda: ograniczony czas, około 2–4 godzin tygodniowo. Zamykamy milestone dopiero po wykonaniu i sprawdzeniu wszystkich poniższych elementów.

## Vision recap

Mała firma usługowa ma szybko poznać orientacyjny koszt strony WordPress i móc napisać do studia. Zachowujemy jeden pakiet i liczbę podstron jako jedyną zmienną wyceny. Nie dodajemy zamówień, formularza serwerowego ani kont klienta (`prd.md`: „Wizja i problem”, „Zakres MVP”, „Poza zakresem”).

## North star

Odwiedzający rozumie, co obejmuje pakiet bazowy i dopłata, wybiera liczbę podstron, widzi poprawną kwotę i rozpoczyna e-mail z czytelnym podsumowaniem. To najmniejszy pełny przepływ potwierdzający sens produktu (`prd.md`: „Pierwszy wartościowy przepływ”, US-001 i US-002).

## At a glance

| Kolejność | Element | Status | Zależność |
| --- | --- | --- | --- |
| 1 | S-01: jasny zakres pakietu przy wycenie | ready | brak |
| 2 | F-01: powtarzalna kontrola kalkulatora | planned | odblokowuje S-02 i S-03 |
| 3 | S-02: czytelne zachowanie na granicach liczby podstron | blocked | F-01 |
| 4 | S-03: pełniejsze podsumowanie zakresu w e-mailu | blocked | F-01, S-01 |

## Baseline

| Warstwa | Stan wynikający z repozytorium i wcześniejszych notatek |
| --- | --- |
| Frontend | Motyw blokowy z jedną stroną ofertową, blokiem kalkulatora i responsywnym CSS. Kalkulator ma przyciski ±, wynik i komunikat niepoprawnej wartości. |
| Backend / API | Wtyczka PHP renderuje blok i stronę ustawień; nie ma własnego API. |
| Dane | Cena, limit podstron i e-mail są w opcjach WordPressa; treści mogą być edytowane w Gutenbergu. Repo nie zawiera bazy. |
| Dostęp | Edycja cen wymaga `manage_options`; odwiedzający korzysta bez logowania. |
| Wdrożenie | Motyw i wtyczka są na publicznej subdomenie; dotychczas wdrażano je jako ZIP przez wp-admin. Aktualizacja produkcji jest osobnym krokiem po sprawdzeniu lokalnym i kopii zapasowej. |
| Obserwowalność / weryfikacja | Jest kontrola składni PHP/JS/JSON; brak automatycznego testu przepływu i CI. Nie zapisujemy historii wycen. |

Podstawa: `README.md`, `context/foundation/health-check.md`, `context/deployment/deploy-plan.md` i aktualny kod. W tym kroku nie robiliśmy nowego testu strony publicznej.

## Foundations

### F-01 — Powtarzalna kontrola kalkulatora

- **Unlocks:** S-02, S-03.
- Dodać najmniejszą praktyczną kontrolę głównego przepływu: poprawna kwota w pakiecie i ponad pakietem, niepoprawna liczba podstron oraz treść i adres linku e-mail. Wybrać narzędzie dopiero przy implementacji, bez wprowadzania zbędnych zależności.
- **Done:** jedna udokumentowana komenda daje jednoznaczny wynik i sprawdza zachowanie, nie tylko składnię. Odniesienie: `prd.md`, „Kryteria sukcesu”, FR-002–FR-005.

## Slices

### S-01 — Odwiedzający rozumie zakres kwoty

- **Status:** ready. **Priorytet:** pierwszy.
- **Efekt:** obok kalkulatora widać, co zawiera pakiet bazowy, za co naliczana jest dopłata i że kwota jest orientacyjna. Tekst da się edytować w Gutenbergu bez zmiany wtyczki.
- **Akceptacja:** przy wartości mieszczącej się w pakiecie i ponad nią człowiek potrafi powiązać opis z pokazanym rozbiciem ceny; widok pozostaje czytelny na telefonie. `prd.md`: FR-001, US-001.
- **Granica:** treść oferty wymaga decyzji właściciela przed publikacją; można przygotować roboczą wersję w repo i lokalnie. Nie zmieniamy wzoru ani przykładowych cen.

### S-02 — Odwiedzający łatwo wybiera poprawną liczbę podstron

- **Status:** blocked przez F-01.
- **Efekt:** przyciski ± i pole liczbowe jasno sygnalizują dolną i górną granicę; przy niepoprawnej wartości wynik oraz kontakt nie sugerują prawidłowej wyceny.
- **Akceptacja:** obsługa klawiaturą i przyciskami działa dla 1, maksimum oraz wartości spoza zakresu; test z F-01 wykrywa regresję. `prd.md`: FR-002, FR-003, „Kryteria sukcesu”.

### S-03 — Odwiedzający wysyła czytelny zakres zapytania

- **Status:** blocked przez F-01 i S-01.
- **Efekt:** przygotowany e-mail podaje liczbę podstron, cenę bazową, ewentualną dopłatę i sumę, zgodnie z opisem oferty. Widoczny adres e-mail nadal pozwala skontaktować się bez obsługi `mailto:`.
- **Akceptacja:** treść linku odpowiada wynikowi na stronie dla wartości w pakiecie i ponad pakietem; kontrola F-01 przechodzi. `prd.md`: FR-005, US-002.

## Backlog Handoff

Po S-01 przejść do planu i implementacji F-01 oraz S-02 w kolejnych lekcjach workflow. Każdą zmianę sprawdzić lokalnie, odnotować wynik i dopiero później rozważać wdrożenie na publiczną stronę. Ten plik jest backlogiem dla małego projektu; osobne issues nie są konieczne.

## Open Roadmap Questions

- Dokładny, uczciwy zakres pakietu bazowego i sformułowanie dopłaty do zatwierdzenia przez właściciela przed publikacją S-01. Obecne kwoty są przykładowe.
- Technika automatycznej kontroli F-01 zależy od możliwości lokalnego środowiska; najpierw sprawdzić, co jest już dostępne.

## Parked

- Automatyzacja wdrożeń przez SSH, pełne CI i integracja z zewnętrznym backlogiem. Nie odblokowują pierwszego wycinka i zwiększyłyby koszt pracy.
- Rozszerzanie kalkulatora o pakiety, rabaty, płatności lub formularz. To jest poza zakresem MVP w `prd.md`.

## Milestone History

- Przed M-01 powstał działający MVP: motyw, blok wyceny, ustawienia i wdrożenie. M-01 dotyczy jego dopracowania oraz ćwiczenia workflow, nie budowy od zera.

## Done

M-01 będzie `done`, gdy S-01, F-01, S-02 i S-03 spełnią swoje kryteria, a główny przepływ zostanie ponownie sprawdzony lokalnie. Publiczne wdrożenie wymaga osobnej kontroli kopii i wyniku na produkcji.
