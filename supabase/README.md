# قاعدة بيانات المسجد على Supabase

## تطبيق المخطط (Schema)

في محرر SQL على لوحة تحكم Supabase، نفّذ الملفات بالترتيب التالي:

1. `schema.sql` — الجداول الأساسية: `profiles`, `questions`, الأدوار، وسياسات RLS.
2. `migrations/0001_social_links.sql` — جدول روابط التواصل الاجتماعي المعروضة في الصفحة الرئيسية. عدّل الروابط الفعلية بعد التنفيذ عبر:

```sql
update public.social_links set url = 'https://your-real-link' where platform = 'facebook';
```

3. `migrations/0002_drop_announcements.sql` — يحذف جدول `announcements` وسياساته (لم تعد الميزة مستخدمة في الموقع). نفّذه فقط على قاعدة بيانات كانت تحتوي على هذا الجدول مسبقًا.
4. `migrations/0004_restore_announcements.sql` — يعيد جدول الإعلانات وسياسات القراءة العامة الحالية وإدارة المسؤول، مع حقل صورة اختياري.

> إذا كانت قاعدة البيانات الجديدة ستُنشأ من `schema.sql`، نفّذ `0004_restore_announcements.sql` بعده. لا تعاود تنفيذ `0002_drop_announcements.sql` بعد تفعيل الإعلانات.

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
