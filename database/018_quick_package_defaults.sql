-- Keep individually edited rates when upgrading an existing installation.
update pricing_settings as p set value = v.new_price, updated_at = now()
from (values ('3_5_room_apartment_base_price','3700','3500'),
             ('4_5_room_apartment_base_price','5000','4500'),
             ('5_5_room_apartment_base_price','5900','5800'),
             ('6_5_room_apartment_base_price','6900','6500')) as v(key,old_price,new_price)
where p.key=v.key and p.value=v.old_price;
