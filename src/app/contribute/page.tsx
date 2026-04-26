import Link from 'next/link';
import { GitPullRequest, MessageSquarePlus } from 'lucide-react';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import Breadcrumb from '@/components/Breadcrumb';

const GITHUB_REPO = 'https://github.com/bbinarygo/vquotes';
const GITHUB_NEW_ISSUE = `${GITHUB_REPO}/issues/new?template=new-quote.yml`;
const GOOGLE_FORM_URL = 'https://forms.gle/placeholder';

export default async function ContributePage() {
  const lang = await getLang();

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <Breadcrumb items={[
        { label: lang === 'vi' ? 'Trang chủ' : 'Home', href: '/' },
        { label: t('contribute_title', lang) },
      ]} />

      <div>
        <h1 className="font-playfair text-4xl font-bold text-ink mb-4">
          {t('contribute_title', lang)}
        </h1>
        <div className="h-px bg-rule" />
      </div>

      <div className="border-l-4 border-sienna bg-parchment rounded-r-lg p-5">
        <p className="text-sm text-ink-muted leading-relaxed mb-2">
          {t('contribute_disclaimer_vi', lang)}
        </p>
        <p className="text-sm text-ink-faint leading-relaxed italic">
          {t('contribute_disclaimer_en', lang)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Card 1: Google Form */}
        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <MessageSquarePlus size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">
              {t('contribute_via_form', lang)}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('contribute_via_form_desc', lang)}
            </p>
          </div>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 bg-sienna text-cream rounded-lg hover:bg-gold transition-colors text-sm font-medium min-h-[44px]"
          >
            {t('contribute_form_btn', lang)}
          </a>
        </div>

        {/* Card 2: GitHub Issues */}
        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <GitPullRequest size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">
              {t('contribute_via_github', lang)}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('contribute_via_github_desc', lang)}
            </p>
          </div>
          <a
            href={GITHUB_NEW_ISSUE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 border border-sienna text-sienna rounded-lg hover:bg-sienna hover:text-cream transition-colors text-sm font-medium min-h-[44px]"
          >
            {t('contribute_submit_btn', lang)}
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-rule text-center">
        <p className="text-sm text-ink-muted">
          {t('contribute_advanced_label', lang)}{' '}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sienna hover:underline font-medium"
          >
            {t('contribute_advanced_pr', lang)}
          </a>
        </p>
      </div>
    </div>
  );
}
