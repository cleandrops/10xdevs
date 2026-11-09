# F-01 — research

Ryzyko z `context/foundation/test-plan.md`: odwiedzający widzi niepoprawną kwotę, niepoprawną wycenę dla błędnej liczby podstron albo e-mail niespójny z wynikiem. Wyrocznia: `prd.md` FR-002–FR-005, reguła biznesowa i US-001/US-002.

- Parametry są wypisywane jako `data-*` przez `wordpress/pracownia-wycena/pracownia-wycena.php`; `view.js` czyta je, przelicza cenę i aktualizuje elementy oraz `mailto:`. To jest najwęższa granica, która chroni wszystkie trzy ryzyka naraz.
- Nie ma test runnera ani bundlera. `node --test` jest dostępny w lokalnym Node 24 i nie wymaga instalacji. Mały model DOM pozwoli uruchomić niezmieniony `view.js` i sprawdzić wynik zewnętrzny.
- Taki test nie sprawdzi renderowania PHP, Gutenberga ani działania `mailto:` w programie pocztowym. Kontrola tych granic pozostaje dla testu E2E i ręcznej bramki przed publikacją.
- Wartości oczekiwane pochodzą z PRD: przy cenach 1500/1/300 wynik dla 1 to 1500 zł, dla 2 to 1800 zł; dla 0 nie ma wyceny. Dodatkowy przypadek z innymi parametrami wykryje ignorowanie ustawień.
