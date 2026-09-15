# قاعدة بيانات المسجد على Supabase

## تطبيق المخطط (Schema)

في محرر SQL على لوحة تحكم Supabase، نفّذ الملفات بالترتيب التالي:

1. `schema.sql` — الجداول الأساسية: `profiles`, `questions`, الأدوار، وسياسات RLS.
2. `migrations/0001_social_links.sql` — جدول روابط التواصل الاجتماعي المعروضة في الصفحة الرئيسية. عدّل الروابط الفعلية بعد التنفيذ عبر:

```sql
update public.social_links set url = 'https://your-real-link' where platform = 'facebook';
```

3. `migrations/0002_drop_announcements.sql` — يحذف جدول `announcements` وسياساته (لم تعد الميزة مستخدمة في الموقع). نفّذه فقط على قاعدة بيانات كانت تحتوي على هذا الجدول مسبقًا.
4. `migrations/0004_restore_announcements.sql` — يعيد جدول الإعلانات وسياسات القراءة العامة الحالية وإدارة المسؤول.
5. `migrations/0005_ibadah_rulings.sql` — جدولا `ibadah_categories` و`ibadah_rulings` لقسم "أحكام العبادات"، مع بيانات أولية (15 حكمًا فقهيًا موثّقًا من إسلام ويب وموقع الشيخ ابن باز، برابط المصدر الأصلي لكل حكم).
6. `migrations/0006_ibadah_definitions.sql` — يضيف عمود `definition` (التعريف) لكل حكم، ويضيف حكمين جديدين عن فريضة الزكاة (زكاة المال) لتمييزها عن زكاة الفطر ضمن قسم أحكام الزكاة.
7. `migrations/0007_ibadah_salah_conditions.sql` — يضيف حكم "شروط الصلاة" (شروط الوجوب وشروط الصحة) ضمن قسم أحكام الصلاة.
8. `migrations/0008_ibadah_sawm_definition.sql` — يضيف حكم "الصيام: تعريفه وأنواعه" كمدخل عام ضمن قسم أحكام الصيام.

> إذا كانت قاعدة البيانات الجديدة ستُنشأ من `schema.sql`، نفّذ `0004_restore_announcements.sql` ثم `0005_ibadah_rulings.sql` ثم `0006_ibadah_definitions.sql` ثم `0007_ibadah_salah_conditions.sql` ثم `0008_ibadah_sawm_definition.sql` بالترتيب. لا تعاود تنفيذ `0002_drop_announcements.sql` بعد تفعيل الإعلانات.

## إنشاء أول حساب إدارة (Admin)

1. أنشئ مستخدمًا عبر Supabase Auth (تبويب Authentication → Users → Add user)، أو من خلال صفحة تسجيل الدخول في اللوحة إن وُجد رابط "نسيت كلمة المرور" لتفعيل الحساب.
2. بعد إنشاء المستخدم، ارفع صلاحيته إلى admin عبر محرر SQL:

```sql
update public.profiles set role = 'admin' where id = '<USER_UUID_FROM_AUTH>';
```

3. لإضافة شيخ/مفتٍ لإدارة الأسئلة فقط:

```sql
update public.profiles set role = 'sheikh' where id = '<USER_UUID_FROM_AUTH>';
```
