# M1L5 — infrastruktura Pracowni WWW

Data: 27.09.2026. Status: **wybrany istniejący hosting użytkownika; motyw i wtyczka wdrożone na publicznej subdomenie**. Źródło metody: [lekcja 10xDevs M1L5](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/01302189-eb98-4767-9f50-7a45d1a0a6db). Porównanie wykonaliśmy dla własnego projektu WordPress, bez uruchamiania kursowego skilla `/10x-infra-research`.

## Wymagania projektu

- Motyw blokowy WordPress, wtyczka PHP i JavaScript, ustawienia cen i adresu e-mail w bazie WordPressa. Nie ma osobnej bazy Supabase ani procesu Node w produkcji.
- Hosting musi obsługiwać PHP, MySQL/MariaDB i HTTPS. [WordPress zaleca PHP 8.3+, MariaDB 10.11+ lub MySQL 8.0+](https://wordpress.org/about/requirements/).
- Repozytorium zawiera tylko własny motyw i wtyczkę. WordPress core, baza danych, treści edytowane w Gutenbergu i sekrety pozostają poza repozytorium.
- Potrzebujemy drogi do podglądu, kopii zapasowej, aktualizacji dwóch katalogów kodu i wycofania wadliwej wersji. Region UE jest rozsądnym założeniem do sprawdzenia przy wyborze konta; nie został jeszcze narzucony przez użytkownika.

## Porównanie

Użytkownik potwierdził, że ma własny hosting i przygotuje subdomenę z WordPressem. To jest wybrana ścieżka, pod warunkiem sprawdzenia wymagań runtime'u, HTTPS, kopii zapasowych i metody dostępu. Opcje poniżej są punktem odniesienia, gdyby istniejący hosting nie spełnił tych warunków.

| Opcja | Dopasowanie i obsługa przez agenta | Podgląd i wycofanie | Orientacyjna cena bazowa* |
| --- | --- | --- | --- |
| **Cloudways Flexible** | PHP/MySQL, SSH/SFTP, Git i WP-CLI. Dobrze nadaje się do pracy z terminala, ale wymaga skonfigurowania serwera i dostępu. [SSH/WP-CLI](https://support.cloudways.com/en/articles/5119485-guide-to-connecting-to-your-application-using-ssh-sftp), [Git](https://support.cloudways.com/en/articles/5124087-how-to-deploy-code-to-your-application-using-git-on-cloudways-flexible). | Staging i kopie aplikacji; możliwe przywrócenie plików, bazy lub całości. [Staging](https://support.cloudways.com/en/articles/5124886-how-to-create-a-staging-environment), [restore](https://support.cloudways.com/en/articles/5123320-how-to-do-a-point-in-time-restore-of-your-application). | [Od 14 USD/mies.](https://www.cloudways.com/en/wordpress-hosting.php). |
| **WordPress.com Personal** | Można wgrać własny motyw i wtyczkę, ale plan nie daje SSH/WP-CLI ani wdrożeń z GitHub. Praca agenta kończy się na przygotowaniu paczek, a wdrożenie wykonuje się w panelu. [Motywy](https://wordpress.com/support/themes/uploading-setting-up-custom-themes/), [wtyczki](https://wordpress.com/support/plugins/install-a-plugin/), [SSH](https://wordpress.com/support/ssh/). | Brak wbudowanego stagingu na Personal; wymaga wyższego planu. [Staging](https://wordpress.com/support/how-to-create-a-staging-site/). | [Od 4 USD/mies. przy płatności rocznej](https://wordpress.com/pricing/). |
| **Kinsta Single** | Zarządzany WordPress z SSH, Git i WP-CLI; mało administracji serwerem, ale wyższy koszt. [SSH](https://kinsta.com/docs/wordpress-hosting/connect-to-ssh/). | Oddzielny staging dla instalacji; kopie zapasowe w planie. [Staging](https://kinsta.com/docs/wordpress-hosting/staging-environment/), [plany](https://kinsta.com/pricing/). | [35 USD/mies. przy płatności miesięcznej](https://kinsta.com/pricing/). |

*Ceny z witryn dostawców, odczytane 27.09.2026; bez przeliczania walut i bez zakładania podatków, dodatków lub promocji. Przed zakupem trzeba sprawdzić pełną cenę konkretnej konfiguracji.*

## Decyzja dla tego projektu

**Istniejący hosting użytkownika** został wybrany i wdrożony. Instalacja działa pod <https://pracownia-www.cleandrops.pl/> i panel jest pod <https://pracownia-www.cleandrops.pl/wp-admin/>. Potwierdziliśmy publiczny HTTPS, WordPress 7.1.2 i PHP 8.5.9. MariaDB ma wersję 10.6.27: panel stanu witryny oznacza ją jako przestarzałą wobec obecnej rekomendacji 10.11+, więc warto zapytać hosting o aktualizację, choć instalacja działa. Backup/restore wymaga jeszcze sprawdzenia. Użytkownik ma dostęp SSH, ale nie korzystał z niego na tym hostingu, więc pierwsze wdrożenie wykonano dwiema paczkami ZIP przez wp-admin. Nie pobierano całego monorepo do katalogu WordPressa.

Jeśli hosting ma SSH/WP-CLI, będzie można później przygotować powtarzalne wdrożenia przez terminal. Jeśli ma tylko wp-admin, paczki wgramy ręcznie. Porównanie z Cloudways, WordPress.com i Kinsta pozostaje alternatywą, nie planem zakupu.

## Test przeciw założeniom

- **Sceptyczny architekt:** Własny hosting usuwa koszt nowego konta, ale może nie mieć stagingu, SSH lub wygodnego przywracania. Wtedy ręczne wgrywanie ZIP będzie działało, lecz kolejne wdrożenia będą mniej powtarzalne.
- **Scenariusz za trzy miesiące:** Najbardziej prawdopodobny błąd to pomieszanie kodu z treścią w bazie WordPressa. Zmiany w Edytorze witryny nie wrócą automatycznie do szablonów w Git; aktualizacja motywu może je ominąć. Przed wdrożeniem trzeba ustalić, co jest źródłem treści i wykonać test po przywróceniu kopii.
- **Pominięte ryzyka:** użytkownik zaakceptował publiczny adres kontaktowy i przykładowe ceny; trzeba sprawdzić region przechowywania danych oraz częstotliwość i sposób odtwarzania backupów. Obecny kalkulator używa `mailto:`, więc nie wymaga serwera poczty, ale zależy od klienta pocztowego odwiedzającego.

## Kontrakt przyszłego wdrożenia

- **Podgląd:** nowa instalacja na subdomenie może służyć jako środowisko testowe przed publicznym ogłoszeniem. Jeśli ma pozostać niepubliczna, trzeba ograniczyć dostęp; samo `noindex` nie stanowi ochrony.
- **Sekrety i dane:** hasła hosta, bazy i WordPressa pozostają u właściciela konta, poza Git i rozmową. Publiczny adres e-mail oraz przykładowe ceny zapisano w opcjach WordPressa za zgodą użytkownika.
- **Rollback:** przed instalacją kodu wykonać kopię plików i bazy; po awarii przywrócić stan aplikacji z wybranego punktu i ponownie sprawdzić stronę. Dokładna procedura zależy od panelu istniejącego hostingu. Nie przywracać samej bazy bez oceny zmian treści po dacie kopii.
- **Granica działań:** Użytkownik wyraźnie zlecił wdrożenie i publikację na swojej subdomenie; wykonano je przez wp-admin. Dalsze wdrożenia i automatyzacja wymagają ustalenia procedury kopii zapasowej i przywrócenia.
- **Sygnał zmiany wyboru:** jeśli istniejący hosting nie spełnia wymagań WordPressa, nie daje HTTPS albo nie pozwala wykonać i odtworzyć kopii, wracamy do alternatyw z tabeli.
