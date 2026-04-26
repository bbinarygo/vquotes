import Link from 'next/link';
import { GitPullRequest, MessageSquarePlus, Copy } from 'lucide-react';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import Breadcrumb from '@/components/Breadcrumb';

const GITHUB_REPO = 'https://github.com/bbinarygo/vquotes';
const GITHUB_NEW_ISSUE = `${GITHUB_REPO}/issues/new?template=new-quote.yml`;

const JSON_EXAMPLE = `{
  "id": "film-ten-dao-dien-001",
  "quote_vi": "Nguyên văn tiếng Việt",
  "quote_en": "English translation",
  "author": "Tên tác giả",
  "source": "Tên tác phẩm (năm)",
  "source_url": "https://example.com/source",
  "category": ["film"],
  "tags": ["tag1", "tag2"],
  "year": 2023,
  "verified": true,
  "contributor_github": "username"
}`;

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
        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <MessageSquarePlus size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">
              {t('contribute_via_issues', lang)}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('contribute_via_issues_desc', lang)}
            </p>
          </div>
          <a
            href={GITHUB_NEW_ISSUE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 bg-sienna text-cream rounded-lg hover:bg-gold transition-colors text-sm font-medium min-h-[44px]"
          >
            {t('contribute_submit_btn', lang)}
          </a>
        </div>

        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <GitPullRequest size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">
              {t('contribute_via_pr', lang)}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('contribute_via_pr_desc', lang)}
            </p>
          </div>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 border border-sienna text-sienna rounded-lg hover:bg-sienna hover:text-cream transition-colors text-sm font-medium min-h-[44px]"
          >
            {t('contribute_view_repo', lang)}
          </a>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-muted mb-3">{t('contribute_json_label', lang)}</p>
        <div className="relative bg-ink rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <span className="text-xs text-white/40 font-mono">quotes/example-001.json</span>
            <Copy size={14} className="text-white/30" />
          </div>
          <pre className="px-5 py-4 text-xs font-mono text-cream/80 overflow-x-auto leading-relaxed">
            {JSON_EXAMPLE}
          </pre>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/schema" className="text-sienna hover:underline">
            {t('contribute_schema_link', lang)}
          </Link>
        </p>
      </div>
    </div>
  );
}
