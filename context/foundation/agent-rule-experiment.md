# M1L4 — eksperyment A/B jednej reguły

## Pytanie

Czy reguła o zgodności linku e-mail z kalkulatorem poprawia wynik zadania: dodać rabat 10% od 5 podstron, pokazać go w rozbiciu i uwzględnić w kwocie końcowej?

Testowana reguła w trzech izolowanych kopiach:

> Przy każdej zmianie wyceny zachowaj zgodność kwoty i liczby podstron w treści linku `mailto:` z wartościami widocznymi w kalkulatorze. Sprawdź także, czy błędne dane nadal wyłączają link e-mail.

Każda próba zaczęła się z tego samego commita `be24bc3f`, tym samym promptem i domyślnym modelem lokalnego Codex CLI przy niskim poziomie rozumowania. Wariant „z” zawierał tylko powyższą regułę w `AGENTS.md`; wariant „bez” nie miał tego pliku. Wszystkie zmiany kodu pozostały w katalogach prób, poza głównym repozytorium i instalacją WordPressa.

## Kryteria i wyniki

Niezależny skrypt uruchomił kod `view.js` na uproszczonym modelu DOM. Sprawdził kwotę, rabat oraz zgodność tematu i treści `mailto:` dla 4, 5 i 12 podstron; blokadę e-maila dla 0, 13, 5,5 i pustego pola; obecność wiersza rabatu w PHP. To daje osiem sprawdzeń na próbę. Dodatkowo dla każdej kopii przeszedł `bash scripts/check-syntax.sh`.

| Próba | Czas | Polecenia agenta | Sprawdzenia | Tokeny wejściowe (w tym cache) | Tokeny wyjściowe |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bez 1 | ok. 74 s | 6 | 8/8 | 165 315 (121 600) | 3 229 |
| Bez 2 | 124 s | 9 | 8/8 | 263 279 (222 080) | 5 396 |
| Bez 3 | 82 s | 6 | 8/8 | 176 853 (117 760) | 3 356 |
| Z 1 | 112 s | 6 | 8/8 | 247 103 (211 456) | 4 334 |
| Z 2 | 122 s | 8 | 8/8 | 355 605 (319 744) | 4 903 |
| Z 3 | 104 s | 5 | 8/8 | 160 391 (142 720) | 4 271 |

Mediana czasu: **82 s bez reguły**, **112 s z regułą**. Mediana liczby poleceń: **6** w obu wariantach. Suma tokenów wejściowych: **605 447 bez reguły** i **763 099 z regułą**; większość była oznaczona jako cache. W żadnej z sześciu prób nie była potrzebna interwencja człowieka ani dodatkowy prompt.

## Decyzja

Nie ma dowodu na korzyść z tej reguły w tym zadaniu: bez niej agent za każdym razem utrzymał zgodność e-maila i walidację. Zgodnie z kryterium lekcji usuwamy ją ze szkicu reguł. Próba jest mała i dotyczy jednego zadania; nie dowodzi, że reguła nigdy się nie przyda.

Pierwsze techniczne uruchomienia przed sześcioma próbami nie zostały wliczone: jedno zakończyło się błędem sandboxa, a wcześniejsze nie wystartowały z powodu dostępności modelu i bazy stanu CLI. Uruchomienie z błędem sandboxa zużyło dodatkowo 84 869 tokenów wejściowych i 852 wyjściowe. Przedstawione czasy i zużycie dotyczą tylko sześciu skutecznych prób; pierwszy czas jest przybliżony z czasu wywołania narzędzia.
