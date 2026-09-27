# PRD — strona studia WordPress z orientacyjną wyceną

Wersja 0.1, 27.09.2026. Dokument opisuje produkt i zachowanie użytkownika. Szczegóły implementacji będą ustalone w dalszych lekcjach.

## Wizja i problem

Studio tworzące strony WordPress dla małych firm usługowych prezentuje ofertę i pozwala szybko oszacować koszt podstawowej strony. Klient może sprawdzić, czy zakres mieści się w jego oczekiwaniach, zanim napisze wiadomość.

## Użytkownicy

- **Odwiedzający:** przedstawiciel małej firmy usługowej, który chce poznać orientacyjny koszt i skontaktować się ze studiem.
- **Redaktor studia:** utrzymuje treść oferty. **Administrator:** utrzymuje parametry wyceny i konta.

## Pierwszy wartościowy przepływ

Odwiedzający czyta ofertę na jednej stronie, wybiera liczbę podstron, natychmiast widzi orientacyjną kwotę i może rozpocząć e-mail z podsumowaniem. Cały przepływ działa bez zakładania konta.

## Zakres MVP

1. Jedna strona ofertowa z jasnym opisem pakietu bazowego i oznaczeniem, że kwota jest orientacyjna.
2. Kalkulator oparty na jednym pakiecie i liczbie podstron.
3. Kontakt e-mail z podsumowaniem wybranego zakresu oraz widocznym adresem do skopiowania.
4. Edycja treści przez redaktora i parametrów wyceny przez administratora.
5. Widok dostosowany do telefonu i komputera.

## Wymagania funkcjonalne

- **FR-001:** Strona przedstawia ofertę, zawartość pakietu i sposób liczenia dopłaty.
- **FR-002:** Formularz przyjmuje dodatnią, całkowitą liczbę podstron z ustalonego zakresu; niepoprawna wartość nie daje wyceny.
- **FR-003:** Wynik aktualizuje się po zmianie liczby podstron, bez przeładowania strony.
- **FR-004:** Kalkulator używa aktualnych parametrów zapisanych przez studio.
- **FR-005:** Kontakt e-mail zawiera liczbę podstron i orientacyjną kwotę; adres e-mail pozostaje widoczny także bez skonfigurowanego programu pocztowego.
- **FR-006:** Zmiana treści i parametrów wymaga zalogowania oraz odpowiednich uprawnień.

## Reguła biznesowa

`wycena = cena_bazowa + max(0, liczba_podstron - podstrony_w_pakiecie) × cena_dodatkowej_podstrony`

Kwota jest szacunkiem. Ostateczna oferta wymaga rozmowy o zakresie prac. Parametry cenowe są edytowalne przez studio. MVP używa przykładowych wartości, które nie stanowią publicznej oferty handlowej.

## User stories i akceptacja

- **US-001:** Jako odwiedzający chcę podać liczbę podstron i zobaczyć koszt, aby ocenić, czy warto wysłać zapytanie. **Given** pakiet obejmuje określoną liczbę podstron, **When** wybieram ich większą liczbę, **Then** wynik obejmuje dopłatę tylko za nadwyżkę.
- **US-002:** Jako odwiedzający chcę napisać e-mail z gotowym podsumowaniem, aby nie przepisywać danych. **Given** widzę wynik, **When** klikam kontakt, **Then** otrzymuję przygotowaną wiadomość z liczbą podstron i kwotą.
- **US-003:** Jako administrator studia chcę zmienić cenę pakietu i dopłatę, aby kalkulator odzwierciedlał aktualną ofertę. **Given** mam uprawnienia administratora, **When** zapisuję nowe parametry, **Then** następna wycena korzysta z nich.
- **US-004:** Jako osoba prowadząca studio chcę chronić cennik przed osobami postronnymi. **Given** nie jestem zalogowany, **When** próbuję edytować parametry, **Then** nie mogę ich zmienić.

## Kryteria sukcesu

- Odwiedzający przechodzi główny przepływ na telefonie i komputerze.
- Wycena zgadza się z regułą dla liczby podstron w pakiecie, powyżej pakietu i wartości niepoprawnej.
- Po zmianie parametrów przez uprawnioną osobę kolejna wycena pokazuje nowy wynik.
- Test automatyczny weryfikuje najważniejszy przepływ z perspektywy odwiedzającego.

## Dostęp i dane

Odwiedzający ma dostęp tylko do publikowanej strony i kalkulatora. Edycja treści wymaga uprawnień redaktora lub administratora; edycja cen w prototypie wymaga uprawnień administratora. Produkt nie zapisuje danych osobowych odwiedzającego ani historii wycen. Dane oferty i parametry kalkulatora są utrzymywane przez studio.

## Poza zakresem

Płatności, zamówienia, formularz wysyłany przez serwer, konta klientów, historia wycen, rabaty, wiele pakietów, integracje zewnętrzne i wielostronicowy serwis.

## Open Questions

- Nazwa studia: „Pracownia WWW”; adres kontaktowy jest ustawiony lokalnie w WordPressie. W kodzie źródłowym pozostaje adres przykładowy. Robocze teksty oferty wymagają oceny przed publikacją.
- Przykładowa cena bazowa, liczba podstron w pakiecie, dopłata i maksymalna liczba podstron.
- Czy docelowo redaktor ma móc zmieniać parametry wyceny? W prototypie robi to administrator.
