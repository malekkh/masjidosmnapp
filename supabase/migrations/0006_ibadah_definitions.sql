-- إضافة حقل "التعريف" لكل حكم، وفصل فريضة الزكاة (زكاة المال) عن زكاة الفطر
-- ضمن قسم أحكام الزكاة. كل المحتوى مأخوذ من نفس مصدري المشروع (إسلام ويب وموقع الشيخ ابن باز).

alter table public.ibadah_rulings add column definition text;

-- إعادة ترتيب أحكام الزكاة الحالية (زكاة الفطر) لتأتي بعد فريضة الزكاة العامة
update public.ibadah_rulings set sort_order = 3 where source_url = 'https://binbaz.org.sa/fatwas/5833/';
update public.ibadah_rulings set sort_order = 4 where source_url = 'https://www.islamweb.net/ar/fatwa/265213/';

-- حكمان جديدان عن فريضة الزكاة (زكاة المال) تمييزًا لها عن زكاة الفطر
insert into public.ibadah_rulings (category_id, title, definition, question, answer, source_name, source_url, scholar, sort_order)
select c.id, r.title, r.definition, r.question, r.answer, r.source_name, r.source_url, r.scholar, r.sort_order
from (values
  ('zakah', 'فريضة الزكاة: تعريفها ومكانتها',
   'الزكاة لغةً: النماء والزيادة والبركة. وشرعًا: حق واجب في مال مخصوص لطائفة مخصوصة في وقت مخصوص، وهي الركن الثالث من أركان الإسلام الخمسة.',
   'ما تعريف الزكاة في الشرع، وما هي خصائصها؟',
   'الزكاة لغةً من الزكاء: النماء والزيادة والبركة، وشرعًا: حق واجب في مال مخصوص لطائفة مخصوصة في وقت مخصوص. وهي ركن من أركان الإسلام الخمسة، ثبتت فرضيتها بالكتاب والسنة وإجماع الأمة. ومن خصائصها أنها عبادة يقترن أداؤها بالإيمان واحتساب الأجر عند الله بخلاف الضرائب الوضعية، وهي تُؤخذ من الأغنياء المستوفين لشروطها وتُرد على الفقراء والمساكين وسائر الأصناف المستحقين.',
   'إسلام ويب - مركز الفتوى', 'https://www.islamweb.net/ar/fatwa/16101/', null, 1),
  ('zakah', 'نصاب الزكاة وشروط وجوبها',
   'النصاب هو القدر الذي إذا بلغه المال وجبت فيه الزكاة، ويختلف مقداره باختلاف نوع المال من ذهب أو فضة أو نقود أو زروع أو ماشية.',
   'ما معنى النصاب؟ وكيف تُحسب زكاة المال؟',
   'النصاب هو القدر الذي إذا بلغه المال وجبت فيه الزكاة، ويختلف باختلاف نوع المال: فنصاب الذهب عشرون دينارًا (نحو 85 جرامًا)، ونصاب الفضة مائتا درهم (نحو 595 جرامًا)، ومقدار الواجب فيهما ربع العشر أي 2.5%. ويُشترط لوجوب الزكاة في المال بلوغ النصاب، وتمام الملك، ومضي حول كامل عليه، ما عدا الزروع والثمار فزكاتها عند الحصاد لا بحولان الحول.',
   'إسلام ويب - مركز الفتوى', 'https://www.islamweb.net/ar/fatwa/19959/', null, 2)
) as r(cat_slug, title, definition, question, answer, source_name, source_url, scholar, sort_order)
join public.ibadah_categories c on c.slug = r.cat_slug;

-- تعريفات الأحكام الخمسة عشر الموجودة مسبقًا، مأخوذة من نفس مصادرها
update public.ibadah_rulings set definition =
  'الطهارة لغةً: الخلوص من الأوساخ والدنس. وفي اصطلاح الفقهاء: رفع الحدث، أو إزالة النجس، أو ما في معناهما. وتنقسم إلى طهارة حسية (من الأنجاس) وطهارة معنوية (من الحدث).'
  where source_url = 'https://www.islamweb.net/ar/fatwa/95785/';

update public.ibadah_rulings set definition =
  'نواقض الوضوء هي الأحداث التي إذا وقعت من المتوضئ بطل وضوءه، ووجب عليه إعادته قبل الصلاة أو ما يُشترط له الوضوء.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/1795/';

update public.ibadah_rulings set definition =
  'التيمم لغةً: القصد. وشرعًا: التعبد لله تعالى بمسح الوجه واليدين بالتراب الطهور، بدلًا عن الوضوء أو الغسل عند تعذّر استعمال الماء أو العجز عنه.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/120551/';

update public.ibadah_rulings set definition =
  'الركن في الصلاة هو ما لا تصح الصلاة بدونه ولا يسقط عمدًا ولا سهوًا، كالركوع والسجود، بخلاف الواجب الذي يسقط بالسهو ويُجبر بسجود السهو، والسنة التي لا يترتب على تركها شيء.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/12455/';

update public.ibadah_rulings set definition =
  'سجود السهو: سجدتان يسجدهما المصلي جبرًا لما وقع في صلاته من زيادة أو نقصان أو شك، تكونان قبل السلام أو بعده بحسب موضعهما.'
  where source_url = 'https://binbaz.org.sa/fatwas/4986/';

update public.ibadah_rulings set definition =
  'المفطرات هي الأمور التي تُبطل الصيام إذا وقعت من الصائم عمدًا في نهار رمضان، وأجمع العلماء على أن أصولها الأكل والشرب والجماع، ويُلحق بها ما كان في معناها.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/2172/';

update public.ibadah_rulings set definition =
  'الفطر بالنسيان هو أن يأكل الصائم أو يشرب وهو ذاهل عن كونه صائمًا من غير قصد منه، وهو معفوٌّ عنه شرعًا فلا يُفسد الصوم.'
  where source_url = 'https://binbaz.org.sa/fatwas/6020/';

update public.ibadah_rulings set definition =
  'زكاة الفطر صدقة واجبة تُخرج عن كل نفس مسلمة عند الفطر من صوم رمضان، وهي غير زكاة المال في سببها ووقتها ومقدارها؛ فسببها الفطر من رمضان لا بلوغ نصاب.'
  where source_url = 'https://binbaz.org.sa/fatwas/5833/';

update public.ibadah_rulings set definition =
  'زكاة الفطر طُهرة للصائم من اللغو والرفث، وطُعمة للمساكين، تجب بدخول الفطر من رمضان لا بملك نصاب، وتُخرج صاعًا من طعام عن كل فرد.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/265213/';

update public.ibadah_rulings set definition =
  'الجمع: أداء صلاتين من الصلوات الخمس في وقت إحداهما تقديمًا أو تأخيرًا. وهو رخصة من رخص السفر يجوز للمسافر فعله أو تركه.'
  where source_url = 'https://binbaz.org.sa/fatwas/5982/';

update public.ibadah_rulings set definition =
  'القصر: أداء الصلاة الرباعية (الظهر والعصر والعشاء) ركعتين بدلًا من أربع في حال السفر، وهو سنة مؤكدة عند جمهور العلماء لمن استوفى شروطه.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/136133/';

update public.ibadah_rulings set definition =
  'غسل الميت: تطهير بدن المسلم المتوفى بالماء، بأن يُغسل جسده كله من رأسه إلى قدميه كما يغتسل الحي، وهو فرض كفاية إذا قام به من يكفي سقط الإثم عن الباقين.'
  where source_url = 'https://binbaz.org.sa/fatwas/1624/';

update public.ibadah_rulings set definition =
  'صلاة الجنازة: صلاة تُؤدى على المسلم المتوفى بعد تغسيله وتكفينه، تتكون من أربع تكبيرات بلا ركوع ولا سجود، يُدعى فيها للميت بالمغفرة والرحمة، وهي فرض كفاية.'
  where source_url = 'https://binbaz.org.sa/fatwas/14025/';

update public.ibadah_rulings set definition =
  'الحج لغةً: القصد. وشرعًا: قصد بيت الله الحرام لأداء مناسك مخصوصة في زمن مخصوص، وهو الركن الخامس من أركان الإسلام، وأركانه ما لا يصح الحج بدونه ولا يُجبر بدم.'
  where source_url = 'https://binbaz.org.sa/fatwas/14833/';

update public.ibadah_rulings set definition =
  'العمرة لغةً: الزيارة. وشرعًا: زيارة بيت الله الحرام لأداء الطواف والسعي والحلق أو التقصير، دون تقيّد بزمن محدد كالحج، وتختلف عنه في الحكم وعدد الأركان.'
  where source_url = 'https://www.islamweb.net/ar/fatwa/55629/';

-- كل حكم يجب أن يحمل تعريفًا؛ نمنع إدخال أي حكم جديد بلا تعريف من الآن فصاعدًا
alter table public.ibadah_rulings alter column definition set not null;
