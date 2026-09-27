# M1L5 — plan pierwszego wdrożenia Pracowni WWW

Status: **wdrożono publicznie 27.09.2026** motyw WordPress i wtyczkę kalkulatora z commita `be24bc3f` pod <https://pracownia-www.cleandrops.pl/>. Szczegóły panelu hostingu i procedurę rollbacku trzeba jeszcze potwierdzić.

## 1. Warunki wejścia

1. Subdomena <https://pracownia-www.cleandrops.pl/> jest dostępna przez HTTPS. Użytkownik zalogował się do wp-admin i podał publiczny adres e-mail.
2. Użytkownik zaakceptował publikację przykładowych cen 1500 zł + 300 zł za dodatkową podstronę i treści oferty.
3. Ustalamy wersję kodu z konkretnego commita Git. W repo nie umieszczamy `wp-config.php`, bazy danych, haseł ani lokalnego adresu kontaktowego.
4. Na docelowej instalacji potwierdzono WordPress 7.1.2, PHP 8.5.9 i HTTPS. MariaDB 10.6.27 działa, lecz jest poniżej [rekomendacji WordPressa 10.11+](https://wordpress.org/about/requirements/) i wymaga późniejszego omówienia z hostingiem. Wtyczka deklaruje WordPress 6.6+.

## 2. Przygotowanie przez Codex

1. W wybranym commicie uruchomić `bash scripts/check-syntax.sh` i skontrolować brak sekretów w plikach przeznaczonych do publikacji.
2. Utworzyć dwie osobne paczki ZIP: `wordpress/pracownia-www/` jako motyw i `wordpress/pracownia-wycena/` jako wtyczkę. Nie pakować całego repozytorium ani WordPress core.
3. Zapisać numer commita i sumy kontrolne paczek w notatce wdrożenia. Przygotować listę kontroli strony i drogę wycofania.

## 3. Przygotowanie hostingu przez użytkownika

1. Założyć subdomenę i nową instalację WordPressa na istniejącym hostingu; sprawdzić wersje PHP i bazy.
2. Ustawić silne dane administratora i mechanizm kopii zapasowych. Wykonać kopię początkową plików i bazy.
3. Skonfigurować HTTPS i w razie potrzeby ograniczyć dostęp do subdomeny podczas testów. Nie przekazywać haseł ani tokenów w rozmowie lub repozytorium.

## 4. Pierwsza instalacja na staging

1. W panelu WordPressa wgrać ZIP wtyczki i ZIP motywu. Włączyć wtyczkę, następnie motyw.
2. W **Ustawienia → Wycena strony** wpisać zaakceptowany publiczny e-mail i ceny. Ustawić tytuł witryny. Dane opcji żyją w bazie hosta, nie w Git.
3. Porównać stronę z lokalną referencją: układ desktop/mobile, sekcje, kalkulator, stopka, dostępność podstawowych kontrolek.
4. Sprawdzić podstrony 1, 4 i 12, granice zakresu oraz puste pole; kwota i liczba podstron w temacie i treści `mailto:` muszą odpowiadać ekranowi. Potwierdzić brak błędów PHP/JS w dostępnych logach.

## 5. Publikacja i weryfikacja

1. Po ocenie stagingu użytkownik podejmuje decyzję o publikacji. Jeśli wybrał domenę, ustawia DNS i potwierdza HTTPS.
2. Wgrać te same paczki lub przenieść sprawdzony stan na produkcję zgodnie z możliwościami hosta; nie włączać automatycznego deployu z gałęzi `main` bez osobnej decyzji.
3. Otworzyć publiczny URL w przeglądarce prywatnej i powtórzyć krytyczny przepływ kalkulatora oraz `mailto:`. Sprawdzić, czy nie widać adresu przykładowego `kontakt@example.com`.
4. Zanotować URL, commit, datę, platformę, wynik kontroli i lokalizację punktu przywracania w tym planie. Nie zapisywać danych logowania.

## 6. Wycofanie

Jeśli po publikacji strona lub kalkulator nie działa, zatrzymać dalsze zmiany, odtworzyć ostatnią sprawdzoną kopię plików i — tylko gdy trzeba — bazy, a potem ponownie sprawdzić publiczny URL. Dokładną procedurę i czas wycofania doprecyzujemy po poznaniu panelu istniejącego hostingu.

## Stan po wdrożeniu — 27.09.2026

- Research i plan: przygotowane.
- Paczki motywu i wtyczki: przygotowane z commita `be24bc3f` w `../release/`; test integralności ZIP i kontrola składni przeszły. Sumy SHA-256 są w `../release/SHA256SUMS.txt`.
- Hosting: istniejący hosting użytkownika. WordPress 7.1.2, PHP 8.5.9, MariaDB 10.6.27, HTTPS.
- Sekrety: nie tworzone ani nie przekazywane.
- Wtyczka **Pracownia WWW — Wycena** i motyw **Pracownia WWW**: wgrane z paczek ZIP i aktywne przez wp-admin. Nie użyto SSH ani nie zmieniono ustawień Git.
- Opcje w bazie WordPressa: nazwa `Pracownia WWW`, slogan `Strony WordPress dla małych firm usługowych`, publiczny adres kontaktowy podany przez użytkownika, pakiet bazowy 1500 zł za 1 podstronę, dodatkowa podstrona 300 zł, maksimum 12.
- Publiczny URL: <https://pracownia-www.cleandrops.pl/>. Kontrola w przeglądarce: strona główna i sekcje widoczne, wyceny dla 1/4/12 podstron wynoszą 1500/2400/4800 zł, a `mailto:` zawiera poprawny adres, liczbę podstron i kwotę. Zmieniono domyślny slogan WordPressa i potwierdzono nowy tytuł strony.
- Osobnego stagingu nie utworzono. Nie potwierdzono kopii zapasowej, procedury odtwarzania, prywatnego widoku bez logowania ani logów PHP/JS. To pozostaje zadaniem administracyjnym przed dalszymi aktualizacjami i ogłoszeniem witryny klientom.
