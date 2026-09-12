-- Replaces placeholder social links with the mosque's real, official accounts
-- (sourced from https://masjid-osman-bn-affan-berqayel.netlify.app/).
delete from public.social_links;

insert into public.social_links (platform, url, sort_order) values
  ('whatsapp', 'https://whatsapp.com/channel/0029VaxPnt835fM3uGevMV1R', 1),
  ('facebook', 'https://www.facebook.com/share/1H537z2u5D/', 2),
  ('instagram', 'https://www.instagram.com/masjid_osman_bn_affan', 3),
  ('youtube', 'https://youtube.com/@masjid_osman_bn_affan', 4),
  ('tiktok', 'https://www.tiktok.com/@masjid_osman_bn_affan', 5);
