export type Lang = 'vi' | 'en';

const translations = {
  // Nav
  nav_browse:    { vi: 'Khám phá',  en: 'Browse' },
  nav_contribute:{ vi: 'Đóng góp',  en: 'Contribute' },
  nav_schema:    { vi: 'Schema',    en: 'Schema' },
  nav_close:     { vi: 'Đóng menu', en: 'Close menu' },
  nav_open:      { vi: 'Mở menu',   en: 'Open menu' },

  // Buttons
  btn_search:  { vi: 'Tìm',        en: 'Search' },
  btn_upvote:  { vi: 'Thích',       en: 'Like' },
  btn_upvoted: { vi: 'Đã thích',    en: 'Liked' },
  btn_copy:    { vi: 'Sao chép',    en: 'Copy' },
  btn_copied:  { vi: 'Đã sao chép', en: 'Copied' },
  btn_report:  { vi: 'Báo lỗi',    en: 'Report' },

  // Homepage
  hero_tagline:   { vi: 'Kho trích dẫn Việt Nam · Vietnamese Quotes', en: 'Vietnamese Quotes · Kho trích dẫn Việt Nam' },
  hero_title_1:   { vi: 'Trích dẫn', en: 'Vietnamese' },
  hero_title_2:   { vi: 'Việt Nam',  en: 'Quotes' },
  heading_featured:  { vi: 'Trích dẫn nổi bật',       en: 'Featured Quotes' },
  heading_categories:{ vi: 'Khám phá theo thể loại', en: 'Explore by Category' },

  // Browse page
  browse_title:      { vi: 'Khám phá',                        en: 'Browse' },
  browse_count:      { vi: 'trích dẫn',                       en: 'quotes' },
  filter_all:        { vi: 'Tất cả',                          en: 'All' },
  sort_newest:       { vi: 'Mới nhất',                        en: 'Newest' },
  sort_most_voted:   { vi: 'Nhiều thích nhất',                en: 'Most Liked' },
  search_placeholder:{ vi: 'Tìm kiếm trích dẫn...', en: 'Search quotes...' },
  filter_placeholder:{ vi: 'Tìm...',                          en: 'Search...' },
  filter_loc:        { vi: 'Lọc',       en: 'Filter' },
  filter_apply:      { vi: 'Áp dụng',   en: 'Apply' },
  sidebar_categories:{ vi: 'Thể loại',  en: 'Categories' },
  sidebar_all:       { vi: 'Tất cả',    en: 'All' },
  sort_label:        { vi: 'Sắp xếp',                         en: 'Sort' },
  no_quotes_found:   { vi: 'Không tìm thấy trích dẫn nào.', en: 'No quotes found.' },
  no_quotes_sub:     { vi: 'Không tìm thấy trích dẫn nào phù hợp.', en: 'No quotes found matching your filters.' },
  clear_filters:     { vi: 'Xoá bộ lọc', en: 'Clear filters' },
  page_prev:         { vi: 'Trang trước', en: 'Previous' },
  page_next:         { vi: 'Trang sau',   en: 'Next' },
  loading:           { vi: 'Đang tải...', en: 'Loading...' },

  // Quote detail
  detail_vi_en_divider: { vi: 'VI · EN', en: 'EN · VI' },
  detail_source_label:  { vi: 'NGUỒN · SOURCE', en: 'SOURCE · NGUỒN' },
  detail_view_source:   { vi: '→ Xem nguồn',   en: '→ View source' },
  detail_verified:      { vi: 'Trích dẫn đã được xác minh từ nguồn công khai. Nếu có sai sót, vui lòng báo lỗi.', en: 'This quote has been verified from public sources. Please report any errors.' },

  // Contribute page
  contribute_title:         { vi: 'Đóng góp trích dẫn',  en: 'Contribute a Quote' },
  contribute_disclaimer_vi: { vi: 'Mọi đóng góp đều được xét duyệt trước khi đăng. Chúng tôi chỉ chấp nhận trích dẫn có nguồn xác minh công khai. Đây là dự án bảo tồn văn hóa, không phải nền tảng chính trị.', en: 'All contributions are reviewed before going live. We only accept quotes with verifiable public sources. This is a cultural preservation project, not a political platform.' },
  contribute_disclaimer_en: { vi: 'All contributions are reviewed before going live. We only accept quotes with verifiable public sources. This is a cultural preservation project, not a political platform.', en: 'Mọi đóng góp đều được xét duyệt trước khi đăng. Chúng tôi chỉ chấp nhận trích dẫn có nguồn xác minh công khai. Đây là dự án bảo tồn văn hóa, không phải nền tảng chính trị.' },
  contribute_via_issues:    { vi: 'Qua GitHub Issues',       en: 'Via GitHub Issues' },
  contribute_via_issues_desc:{ vi: 'Điền form — chúng tôi sẽ xét duyệt và thêm trích dẫn cho bạn. Khuyến nghị cho người dùng không quen GitHub.', en: 'Fill out the form — we will review and add the quote for you. Recommended for users unfamiliar with GitHub.' },
  contribute_submit_btn:    { vi: 'Gửi trích dẫn mới →',   en: 'Submit new quote →' },
  contribute_via_pr:        { vi: 'Pull Request trực tiếp', en: 'Direct Pull Request' },
  contribute_via_pr_desc:   { vi: 'Fork repo, tạo file JSON trong /quotes/, mở PR. Dành cho người quen với GitHub.', en: 'Fork the repo, create a JSON file in /quotes/, open a PR. For users comfortable with GitHub.' },
  contribute_view_repo:     { vi: 'Xem repo GitHub →',      en: 'View GitHub repo →' },
  contribute_json_label:    { vi: 'Định dạng JSON:',         en: 'JSON format:' },
  contribute_schema_link:   { vi: 'Xem danh sách thể loại và tag →', en: 'View category and tag reference →' },

  // Schema page
  schema_title:        { vi: 'Schema tham khảo',   en: 'Reference Schema' },
  schema_categories:   { vi: 'Thể loại',            en: 'Categories' },
  schema_tags:         { vi: 'Tags',                en: 'Tags' },
  schema_col_value:    { vi: 'Giá trị (slug)',       en: 'Value (slug)' },
  schema_col_en:       { vi: 'Tiếng Anh',           en: 'English' },
  schema_col_vi:       { vi: 'Tiếng Việt',          en: 'Vietnamese' },

  // Footer
  footer_tagline:   { vi: 'Kho trích dẫn Việt Nam song ngữ — mở và miễn phí cho cộng đồng.', en: 'Bilingual Vietnamese quotes database — open and free for the community.' },
  footer_links:     { vi: 'Liên kết',    en: 'Links' },
  footer_browse:    { vi: 'Khám phá trích dẫn', en: 'Browse quotes' },
  footer_contribute:{ vi: 'Đóng góp',   en: 'Contribute' },
  footer_about:     { vi: 'Về dự án',   en: 'About' },
  footer_about_text:{ vi: 'Mọi trích dẫn được xác minh từ nguồn công khai. Dự án bảo tồn văn hóa, không phải nền tảng chính trị. Tuân thủ pháp luật Việt Nam.', en: 'All quotes are verified from public sources. A cultural preservation project, not a political platform. Compliant with Vietnamese law.' },

  // Accessibility
  aria_upvote:  { vi: 'Thích trích dẫn này', en: 'Like this quote' },
  aria_upvoted: { vi: 'Đã thích',             en: 'Liked' },
  aria_copy:    { vi: 'Sao chép liên kết',    en: 'Copy link' },
  aria_facebook:{ vi: 'Chia sẻ Facebook',     en: 'Share on Facebook' },
  aria_x:       { vi: 'Chia sẻ X',            en: 'Share on X' },
  aria_report:  { vi: 'Báo lỗi',              en: 'Report error' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}
