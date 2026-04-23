const GITHUB_REPO = 'https://github.com/bbinarygo/vquotes';
const GITHUB_NEW_ISSUE = `${GITHUB_REPO}/issues/new?template=new-quote.yml`;

export default function ContributePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Đóng góp trích dẫn / Contribute</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        Mọi đóng góp đều được xét duyệt trước khi đăng. Chúng tôi chỉ chấp nhận trích dẫn có nguồn xác minh công khai. Đây là dự án bảo tồn văn hóa, không phải nền tảng chính trị.
        <br /><br />
        All contributions are reviewed before going live. We only accept quotes with verifiable public sources. This is a cultural preservation project, not a political platform.
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">Cách 1: Qua GitHub Issues (khuyến nghị)</h2>
        <p className="text-gray-600 text-sm">Điền form — chúng tôi sẽ xét duyệt và thêm trích dẫn cho bạn.</p>
        <a
          href={GITHUB_NEW_ISSUE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
        >
          Gửi trích dẫn mới / Submit new quote →
        </a>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">Cách 2: Pull Request trực tiếp</h2>
        <p className="text-gray-600 text-sm">Dành cho người dùng kỹ thuật — fork repo, tạo file JSON trong thư mục <code className="bg-gray-100 px-1 rounded">/quotes/</code>, mở PR.</p>
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-amber-400 hover:text-amber-600 transition-colors"
        >
          Xem repo GitHub →
        </a>
      </section>

      <section className="space-y-2 text-sm text-gray-500 border-t pt-6">
        <p className="font-medium text-gray-600">Định dạng JSON:</p>
        <pre className="bg-gray-50 border rounded-lg p-4 text-xs overflow-x-auto">{`{
  "id": "film-ten-dao-dien-ten-phim-001",
  "quote_vi": "Nguyên văn tiếng Việt",
  "quote_en": "English translation",
  "author": "Tên tác giả",
  "source": "Tên tác phẩm (năm)",
  "category": ["film"],
  "tags": ["tag1", "tag2"],
  "year": 2023,
  "verified": true,
  "contributor_github": "your-github-username"
}`}</pre>
      </section>
    </div>
  );
}
