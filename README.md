# vefforritun_lokaverkefni
Vinnusvæði fyrir lokaverkefni í vefforritun.

## Til að keyra:
npm install
npm start

## Til að villukeyra:
npm run lint -s

## Til keyra stylelint á css
npm run stylelint -s

## Dump file af gagnagrunn er að finna í db möppunni.
## Í local gagnagrunni þarf að búa til nýjan gagnagrunn:
CREATE DATABASE rebbit;

## Keyra þarf svo eftirfarandi skipun í command line:
psql -U [username] rebbit < C:\...\rebbit\db\rebbit