import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FatawaForm from "@/components/FatawaForm";
import SelectedAnswers from "@/components/SelectedAnswers";
import AccountPrompt from "@/components/AccountPrompt";
import { getCurrentProfile } from "@/lib/auth";

export default async function FatawaPage() {
  const profile = await getCurrentProfile();

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-6">
        <Link href="/" className="text-sm font-bold text-[var(--emerald)]">
          ← العودة للرئيسية
        </Link>

        <div className="mt-8 grid gap-10 pb-16 lg:grid-cols-2">
          <section>
            <MessageCircleQuestion className="text-[var(--emerald)]" size={40} />
            <h1 className="mt-4 text-4xl font-black text-[var(--emerald-deep)]">اسأل أهل الذكر</h1>
            <div className="mt-6">
              <AccountPrompt loggedIn={!!profile} fullName={profile?.full_name} />
            </div>
            <FatawaForm canSubmitAnonymously={!!profile?.full_name} />
          </section>

          <SelectedAnswers />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
