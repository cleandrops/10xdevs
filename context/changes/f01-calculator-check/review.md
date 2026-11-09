# F-01 — review

| Test | Chronione zachowanie | Regresja wykrywana przez asercję |
| --- | --- | --- |
| Pakiet i dopłata | 1 → 1500 zł; 2 → 1800 zł oraz e-mail do właściwego adresu z 2 podstronami i kwotą | Zła dopłata, nieaktualny wynik lub niespójny `mailto:`. |
| Błędna wartość | 0 nie ma kwoty ani aktywnego zapytania; 2 przywraca wynik | Aktywne zapytanie mimo błędu albo brak powrotu po korekcie. |
| Inne parametry | 2500/2/400 i 3 podstrony → 2900 zł, nowy adres w e-mailu | Ignorowanie ustawień WordPress przekazanych do widoku. |

`node --test tests/calculator.test.js`: 3/3 przechodzą. `bash scripts/check-syntax.sh`: przechodzi. W tymczasowej kopii `view.js` zastąpiono dopłatę zerem; testy zakończyły się 3/3 błędami, więc asercje wykrywają wskazaną regresję. Kod produkcyjny nie został zmieniony. Test działa na poziomie skryptu i modelu DOM; nie sprawdza PHP, Gutenberga ani przeglądarki.
