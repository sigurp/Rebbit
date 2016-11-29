# vefforritun_lokaverkefni
Vinnusvæði fyrir lokaverkefni í vefforritun.

## Til að keyra:
npm install
npm start

## Til að villukeyra javascript skrár:
npm run lint -s

## Til að keyra stylelint á css
npm run stylelint -s

## Til að villuprófa pug
Ná í pug-lint (https://www.npmjs.com/package/pug-lint) og keyra á .pug skrám.

## Dump file af gagnagrunn er að finna í db möppunni.
## Í local gagnagrunni þarf að búa til nýjan gagnagrunn:
CREATE DATABASE rebbit;

## Keyra þarf svo eftirfarandi skipun í command line:
psql -U [username] rebbit < C:\...\rebbit\db\rebbit