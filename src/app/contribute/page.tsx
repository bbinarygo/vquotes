import Link from 'next/link';
import { GitPullRequest, MessageSquarePlus, Copy } from 'lucide-react';

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

export default function ContributePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div>
        <h1 className="font-playfair text-4xl font-bold text-ink mb-4">
          Đóng góp trích dẫn / Contribute a Quote
        </h1>
        <div className="h-px bg-rule" />
      </div>

      <div className="border-l-4 border-sienna bg-parchment rounded-r-lg p-5">
        <p className="text-sm text-ink-muted leading-relaxed mb-2">
          Mọi đóng góp đều được xét duyệt trước khi đăng. Chúng tôi chỉ chấp nhận trích dẫn có nguồn xác minh công khai. Đây là dự án bảo tồn văn hóa, không phải nền tảng chính trị.
        </p>
        <p className="text-sm text-ink-faint leading-relaxed italic">
          All contributions are reviewed before going live. We only accept quotes with verifiable public sources. This is a cultural preservation project, not a political platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <MessageSquarePlus size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">Qua GitHub Issues</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Điền form — chúng tôi sẽ xét duyệt và thêm trích dẫn cho bạn. Khuyến nghị cho người dùng không quen GitHub.
            </p>
          </div>
          <a
            href={GITHUB_NEW_ISSUE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 bg-sienna text-cream rounded-lg hover:bg-gold transition-colors text-sm font-medium min-h-[44px]"
          >
            Gửi trích dẫn mới →
          </a>
        </div>

        <div className="bg-white border border-rule rounded-xl p-6 flex flex-col gap-4 shadow-card">
          <GitPullRequest size={28} className="text-sienna" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-ink mb-2">Pull Request trực tiếp</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Fork repo, tạo file JSON trong <code className="bg-parchment px-1 rounded text-xs">/quotes/</code>, mở PR. Dành cho người quen với GitHub.
            </p>
          </div>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-5 py-2.5 border border-sienna text-sienna rounded-lg hover:bg-sienna hover:text-cream transition-colors text-sm font-medium min-h-[44px]"
          >
            Xem repo GitHub →
          </a>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-muted mb-3">Định dạng JSON / JSON format:</p>
        <div className="relative bg-ink rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <span className="text-xs text-white/40 font-mono">quotes/example-001.json</span>
            <Copy size={14} className="text-white/30" />
          </div>
          <pre className="px-5 py-4 text-xs font-mono text-cream/80 overflow-x-auto leading-relaxed">
            {JSON_EXAMPLE}
          </pre>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          <code className="bg-parchment px-1 rounded">source_url</code> là tùy chọn — chỉ thêm nếu có liên kết trực tiếp đến nguồn. /{' '}
          <code className="bg-parchment px-1 rounded">source_url</code> is optional — only add if a direct link to the source exists.
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/schema" className="text-sienna hover:underline">
            Xem danh sách thể loại và tag → / View category and tag reference →
          </Link>
        </p>
      </div>
    </div>
  );
}
