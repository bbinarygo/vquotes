import { CATEGORY_LIST } from '@/constants/categories';
import { TAG_LIST } from '@/constants/tags';

export default function SchemaPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="font-playfair text-4xl font-bold text-ink mb-2">
          Schema tham khảo
        </h1>
        <p className="text-sm text-ink-muted italic mb-4">Reference Schema</p>
        <div className="h-px bg-rule" />
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
          Danh sách các giá trị hợp lệ cho trường <code className="bg-parchment px-1 rounded text-xs">category</code> và <code className="bg-parchment px-1 rounded text-xs">tags</code> trong file JSON trích dẫn. / Valid values for the <code className="bg-parchment px-1 rounded text-xs">category</code> and <code className="bg-parchment px-1 rounded text-xs">tags</code> fields in quote JSON files.
        </p>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-playfair text-2xl font-bold text-ink whitespace-nowrap">Thể loại / Categories</h2>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <div className="bg-white border border-rule rounded-lg overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-parchment border-b border-rule">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">Giá trị / Value</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">Tiếng Việt</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">English</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORY_LIST.map((cat, i) => (
                <tr key={cat.value} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-parchment text-sienna px-2 py-0.5 rounded font-mono">{cat.value}</code>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{cat.labelVi}</td>
                  <td className="px-4 py-3 text-ink-faint">{cat.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tags */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-playfair text-2xl font-bold text-ink whitespace-nowrap">Tags</h2>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <div className="bg-white border border-rule rounded-lg overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-parchment border-b border-rule">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">Giá trị / Value</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">Tiếng Việt</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">English</th>
              </tr>
            </thead>
            <tbody>
              {TAG_LIST.map((tag, i) => (
                <tr key={tag.value} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-parchment text-sienna px-2 py-0.5 rounded font-mono">{tag.value}</code>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{tag.labelVi}</td>
                  <td className="px-4 py-3 text-ink-faint">{tag.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Tag không có trong danh sách vẫn được chấp nhận nhưng sẽ hiển thị dưới dạng slug. / Tags not in this list are accepted but will display as raw slugs.
        </p>
      </section>
    </div>
  );
}
