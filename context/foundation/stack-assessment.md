# Ocena stacku — Pracownia WWW (M1L2)

Źródło metody: [10xDevs 4.0, „Od Chatbota do Agenta: tech stack, skille i metaprompting”](https://platforma.przeprogramowani.pl/courses/10xdevs-4/pl/7e42265b-9f99-4f94-b850-af4f1bc41361). Ocena została wykonana dla naszego kodu w Codexie według czterech bramek opisanych w lekcji; nie jest wynikiem uruchomienia kursowego skilla `/10x-stack-assess`.

**Werdykt: `ready-with-compensation`.** Zachowujemy WordPress i Gutenberg. To odpowiada celowi nauki: zamianie projektu HTML w edytowalny motyw blokowy. Najważniejsze tarcie dla agenta wynika z braku kontroli typów w bieżącym kodzie oraz z braku testów i automatycznej weryfikacji.

## Co istnieje

- Instalacja WordPress przez Local, działająca pod <http://localhost:10003/>.
- Motyw blokowy `pracownia-www`: `theme.json`, szablony i części w HTML blokowym, CSS oraz mały plik PHP.
- Wtyczka `pracownia-wycena`: dynamiczny blok Gutenberg, ustawienia cen i adresu e-mail w WordPressie, kalkulator w JavaScript.
- Statyczny projekt odniesienia w `reference/` oraz wymagania w `prd.md`.
- Działający przepływ: zmiana liczby podstron → zmiana kwoty → link e-mail z podsumowaniem.

## Cztery bramki jakości

| Składnik | Typowanie | Konwencje | Popularność | Dokumentacja |
| --- | --- | --- | --- | --- |
| WordPress i motyw blokowy | Częściowo: PHP i JSON, bez statycznej kontroli typów w tym projekcie | Tak: `theme.json`, `templates/`, `parts/` | Tak | Tak |
| Wtyczka PHP | Częściowo: możliwe deklaracje typów, obecnie ich brak | Częściowo: API WordPress jest ustalone, nazwy i układ własnej wtyczki trzeba opisać | Tak | Tak |
| JavaScript bloku | Nie: bieżące pliki są w zwykłym JS | Częściowo: `block.json` wskazuje skrypty, ale nie ma narzędzia kontroli kodu | Tak | Tak |
| Weryfikacja projektu | Nie dotyczy | Brak ustalonego sposobu uruchamiania testów i CI | Nie dotyczy | PRD określa oczekiwany przepływ |

## Plan kompensacji

1. **Zasady projektu:** w M1L4 zapisać krótkie `AGENTS.md` z mapą katalogów, zakresem motywu i wtyczki oraz regułą liczenia ceny. Agent powinien sprawdzać dokumentację API WordPressa przy zmianach w blokach i ustawieniach.
2. **Weryfikacja kodu:** dodać powtarzalne polecenia sprawdzające składnię PHP i JS. Bundler nie jest potrzebny dla tak małego bloku korzystającego z gotowych zależności WordPressa.
3. **Test przepływu:** dodać jeden test odwiedzającego obejmujący zmianę liczby podstron, wyliczoną kwotę i adres w linku e-mail. Dodać też przypadek niepoprawnej liczby podstron, bo to granica reguły biznesowej.
4. **CI:** uruchamiać te kontrole przy zmianach kodu. Żaden mechanizm CI nie jest obecnie skonfigurowany.
5. **Dane i dostęp:** pozostawić ceny w opcjach WordPressa, treść w Gutenbergu, a zmianę cen tylko administratorowi. Nie zapisujemy danych odwiedzających.

## Przekazanie do M1L3

W następnej lekcji użyć tej oceny jako wejścia do audytu istniejącego projektu (`/10x-health-check`). Sprawdzić strukturę, bezpieczeństwo edycji ustawień i możliwość odtworzenia instalacji z plików projektu. Nie wybierać nowego startera i nie zastępować działającego motywu innym frameworkiem bez wymagania z PRD.

## Lekcja w 60 sekund

- Skill to zapisana procedura z określonym wejściem i wynikiem. Warto po niego sięgać, gdy zadanie powtarza się między sesjami.
- Agent widzi krótki opis dostępnego skilla; pełne instrukcje i dodatkowe pliki czyta dopiero, gdy są potrzebne. To oszczędza kontekst.
- Istniejący projekt oceniamy zamiast wybierać stack od początku. Wynik powinien wskazywać tarcia i sposób ich usunięcia.
- Przed instalacją obcego skilla trzeba obejrzeć jego instrukcje i ewentualne skrypty. W tym projekcie nie instalowaliśmy dodatkowego skilla.
