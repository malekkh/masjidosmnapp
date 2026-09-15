-- إضافة حكم "الصيام: تعريفه وأنواعه" كمدخل عام لقسم أحكام الصيام،
-- قبل أحكامه التفصيلية (المفطرات، والفطر بالنسيان).
-- المصدر: إسلام ويب - مركز الفتوى (نفس مصادر المشروع المعتمدة).

update public.ibadah_rulings set sort_order = 2 where source_url = 'https://www.islamweb.net/ar/fatwa/2172/';
update public.ibadah_rulings set sort_order = 3 where source_url = 'https://binbaz.org.sa/fatwas/6020/';

insert into public.ibadah_rulings (category_id, title, definition, question, answer, source_name, source_url, scholar, sort_order)
select c.id, r.title, r.definition, r.question, r.answer, r.source_name, r.source_url, r.scholar, r.sort_order
from (values
  ('sawm', 'الصيام: تعريفه وأنواعه',
   'الصيام لغةً: الإمساك. وشرعًا: الإمساك عن المفطرات (شهوتي البطن والفرج) من طلوع الفجر الصادق إلى غروب الشمس مع النية، وينقسم إلى صيام واجب وصيام مستحب.',
   'ما هو الصيام؟ وما هي أنواعه؟',
   'الصيام شرعًا: الإمساك عن شهوتي البطن والفرج، أي المفطرات، من طلوع الفجر الصادق إلى غروب الشمس مع النية. وينقسم إلى واجب ومستحب: فالواجب صوم رمضان، وما يلزم الشخص من كفارات أو نذور. والمستحب كثير، ومنه صيام ستة أيام من شوال لمن صام رمضان، وصوم يوم عرفة لغير الحاج، وصوم يوم عاشوراء، وغير ذلك.',
   'إسلام ويب - مركز الفتوى', 'https://www.islamweb.net/ar/fatwa/11813/', null, 1)
) as r(cat_slug, title, definition, question, answer, source_name, source_url, scholar, sort_order)
join public.ibadah_categories c on c.slug = r.cat_slug;
