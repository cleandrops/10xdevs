# Studio stron WordPress — notatki z doprecyzowania pomysłu

Status: pierwszy zakres projektu kursowego, 27.09.2026.

## Checkpoint

Uzgodniono użytkownika, problem, pierwszy przepływ, regułę wyceny i granice MVP. Projekt jest nowym produktem uruchamianym na istniejącej, lokalnej instalacji WordPressa „ClearWP”; nie ma obecnych funkcji produktu, które trzeba zachować.

## Vision & problem

Małe firmy usługowe potrzebują prostej strony internetowej. Przed kontaktem ze studiem chcą szybko poznać orientacyjny koszt wykonania strony WordPress. Studio chce pokazać ofertę w czytelnej, estetycznej formie i ograniczyć zapytania bez podstawowych informacji o zakresie.

## Persona & access control

- Odwiedzający: właściciel lub pracownik małej firmy usługowej. Bez logowania przegląda ofertę, oblicza orientacyjną cenę i może rozpocząć wiadomość e-mail.
- Redaktor studia: po zalogowaniu do WordPressa edytuje treść strony.
- Administrator: zarządza kontami, konfiguracją serwisu oraz przykładowymi cenami w prototypie.
- Odwiedzający nie może zmieniać cen ani treści.

## MVP discipline

Pierwszy pełny przepływ: odwiedzający otwiera stronę, widzi opis usługi, wybiera liczbę podstron, otrzymuje orientacyjną wycenę i klika kontakt e-mail. Pierwsza wersja zawiera jedną stronę ofertową, jeden pakiet bazowy i dopłatę za dodatkowe podstrony.

Projekt wizualny powstanie najpierw jako statyczna strona HTML. Następnie zostanie przeniesiony do motywu blokowego WordPressa z edytowalnymi sekcjami Gutenberga. Styl: jasny i minimalistyczny. Źródłem jest nowy projekt referencyjny, ponieważ nie ma jeszcze gotowego HTML ani makiety.

## Functional requirements

- **FR-001** Odwiedzający widzi opis oferty, zakres pakietu bazowego i informację, że wycena jest orientacyjna.
- **FR-002** Odwiedzający podaje liczbę podstron w dozwolonym zakresie i widzi wynik bez przeładowania strony.
- **FR-003** System oblicza wycenę z ceny bazowej, liczby podstron zawartych w pakiecie i ceny za każdą dodatkową podstronę.
- **FR-004** Odwiedzający może rozpocząć wiadomość e-mail do studia z podsumowaniem wybranego zakresu i wyceny.
- **FR-005** Uprawniony redaktor może edytować treść strony, a administrator także parametry wyceny w panelu WordPressa.
- **FR-006** Osoba niezalogowana nie może edytować treści ani parametrów wyceny.

## User stories i kryteria

1. **Wycena:** Given odwiedzający jest na stronie oferty i widzi pakiet bazowy, When wybiera liczbę podstron, Then widzi orientacyjną cenę obliczoną według jawnej reguły.
2. **Kontakt:** Given odwiedzający widzi wycenę, When wybiera kontakt, Then otwiera się jego program pocztowy z adresem studia i podsumowaniem zakresu; jeśli program pocztowy nie jest skonfigurowany, na stronie nadal widzi adres e-mail do skopiowania.
3. **Edycja:** Given administrator jest zalogowany, When zmienia cenę bazową lub dopłatę i zapisuje, Then kolejne wyceny używają nowych wartości.
4. **Ochrona:** Given odwiedzający nie jest zalogowany, When próbuje dostać się do edycji, Then WordPress wymaga uwierzytelnienia.

## Business logic & data

Reguła domenowa: **orientacyjna cena = cena pakietu bazowego + max(0, liczba podstron − liczba podstron w pakiecie) × cena dodatkowej podstrony**. Liczba podstron musi być dodatnią liczbą całkowitą i mieścić się w zakresie ustawionym przez studio. Wynik jest opisany jako orientacyjny, bez obietnicy ostatecznej ceny.

Dane edytowane przez studio: treści strony, opis pakietu, cena bazowa, liczba podstron w pakiecie, cena dodatkowej podstrony, limit podstron i adres kontaktowy. Wycena odwiedzającego jest tymczasowa; MVP nie zapisuje danych klienta.

## Non-goals

- Płatności, koszyk, zamówienie i automatyczne zawieranie umowy.
- Konto klienta, historia wycen i wysyłanie wiadomości przez serwer.
- Wiele pakietów, rabaty, podatki, waluty i integracje zewnętrzne.
- Wielostronicowy serwis oraz rozbudowany katalog usług.

## Closing soft-gate

- Kontrola dostępu: tak — edycja wymaga uprawnień WordPressa.
- Logika biznesowa: tak — wycena według jawnej reguły.
- Artefakty: niniejsze notatki i `prd.md`.
- Koszt czasu: pierwszy przepływ jest ograniczony do jednej strony i jednego kalkulatora; założenie do weryfikacji po przygotowaniu HTML.
- Non-goals: zapisane powyżej.
- Zachowanie istniejących funkcji: standardowe działanie WordPressa; brak własnych funkcji produktu do zachowania.

## Open questions

- Czy robocze ceny 1500 zł za pierwszą podstronę i 300 zł za każdą kolejną oraz limit 12 podstron pasują do docelowej oferty? Adres kontaktowy jest ustawiony lokalnie w WordPressie; w źródłach używamy adresu przykładowego.
- Czy słowo „podstrona” oznacza również stronę główną? Propozycja: tak.
- Nazwa „Pracownia WWW” została zaakceptowana. Czy robocze treści marketingowe mają zostać w docelowej wersji?
- Czy docelowo edytować parametry wyceny może także redaktor? W prototypie może to robić wyłącznie administrator.
