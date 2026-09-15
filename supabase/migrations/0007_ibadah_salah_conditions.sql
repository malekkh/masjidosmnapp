-- إضافة حكم "شروط الصلاة" (شروط الوجوب وشروط الصحة) ضمن قسم أحكام الصلاة،
-- بما أن الشروط تختلف فقهيًا عن الأركان (انظر 0005) ولم تكن مذكورة سابقًا.
-- المصدر: إسلام ويب - مركز الفتوى (نفس مصادر المشروع المعتمدة).

update public.ibadah_rulings set sort_order = 2 where source_url = 'https://www.islamweb.net/ar/fatwa/12455/';
update public.ibadah_rulings set sort_order = 3 where source_url = 'https://binbaz.org.sa/fatwas/4986/';

insert into public.ibadah_rulings (category_id, title, definition, question, answer, source_name, source_url, scholar, sort_order)
select c.id, r.title, r.definition, r.question, r.answer, r.source_name, r.source_url, r.scholar, r.sort_order
from (values
  ('salah', 'شروط الصلاة: شروط الوجوب وشروط الصحة',
   'الشرط في اصطلاح الفقهاء: ما يلزم من عدمه عدم المشروط، ولا يلزم من وجوده وجود المشروط ولا عدمه؛ فشروط الصلاة أمور خارجة عنها يجب توافرها قبل الدخول فيها، بخلاف الأركان التي هي أجزاء داخلة في حقيقة الصلاة.',
   'كم هي شروط الصلاة؟',
   'شروط الصلاة قسمان: شروط وجوب وشروط صحة. فأما شروط الوجوب فهي: الإسلام، والبلوغ، والعقل، والخلو من الموانع كالحيض والنفاس بالنسبة للأنثى؛ فتجب الصلاة على كل مسلم بالغ عاقل خالٍ من الموانع. وأما شروط الصحة فستة: دخول الوقت، والطهارة من الحدثين الأصغر والأكبر، والطهارة من النجاسة الحقيقية (الخبث) في الثوب والبدن والمكان، وستر العورة، واستقبال القبلة، والنية.',
   'إسلام ويب - مركز الفتوى', 'https://www.islamweb.net/ar/fatwa/1742/', null, 1)
) as r(cat_slug, title, definition, question, answer, source_name, source_url, scholar, sort_order)
join public.ibadah_categories c on c.slug = r.cat_slug;
