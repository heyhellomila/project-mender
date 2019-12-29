INSERT INTO sectors (type, kind)
    values ('APPLIANCES', 'COOKING'), ('APPLIANCES', 'DRYER'), ('APPLIANCES', 'WASHER'),
            ('BUILDING', 'EXTERIOR DOORS'), ('UTILITY', 'SEPTIC SYSTEM');

UPDATE sectors set kind = 'WINDOWS' where kind = 'WINDOWS & DOORS';

UPDATE sectors set kind = 'ELECTRICAL PANEL' WHERE kind = 'ELECTRICAL PANEL AND WIRING';

UPDATE sectors set kind = 'WATER RADIATOR' WHERE kind = 'HOT WATER RADIATOR';

UPDATE sectors set kind = 'OIL OR GAS TANK' WHERE kind = 'FUEL OIL HEATING SYSTEM';

delete from sectors where kind = 'PARKING SPACE';

delete from sectors where kind = 'HEAT PUMP';

delete from sectors where kind = 'GAS HEATING SYSTEM';

delete from sectors where kind = 'CEILING';

update sectors set kind = replace(kind, ' ', '_');

update sectors set type = replace(type, ' ', '_');
