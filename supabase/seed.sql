-- supabase/seed.sql
-- Seed quotes from JSON file exports. Re-runnable (ON CONFLICT DO NOTHING).

INSERT INTO quotes (id, quote_vi, quote_en, author, source, source_url, category, tags, year, verified, contributor_github)
VALUES
(
  'film-nguyen-hong-sen-canh-dong-hoang-001',
  'Trên mảnh đất này, dù bom đạn cày xới, con người vẫn bám lấy từng tấc đất mà sống.',
  'On this land, even as bombs and bullets tear through it, people still cling to every inch of soil to survive.',
  'Nguyễn Hồng Sến',
  'Phim ''Cánh đồng hoang'' (1979)',
  NULL,
  ARRAY['film'],
  ARRAY['war', 'resilience', 'homeland'],
  1979,
  true,
  NULL
),
(
  'film-tran-anh-hung-mui-du-du-xanh-001',
  'Cuộc sống bình yên nhất là khi ta biết bằng lòng với những gì mình đang có.',
  'The most peaceful life is when we learn to be content with what we already have.',
  'Trần Anh Hùng',
  'Phim ''Mùi đu đủ xanh'' (1993)',
  NULL,
  ARRAY['film'],
  ARRAY['peace', 'contentment', 'simplicity'],
  1993,
  true,
  NULL
),
(
  'poem-ho-xuan-huong-001',
  E'Thân em vừa trắng lại vừa tròn,\nBảy nổi ba chìm với nước non.',
  E'My body is both white and round,\nSeven times afloat, three times sunk amid the mountains and rivers.',
  'Hồ Xuân Hương',
  'Bánh trôi nước — thơ Hồ Xuân Hương (thế kỷ 18-19)',
  NULL,
  ARRAY['poem', 'famous-person'],
  ARRAY['womanhood', 'resilience', 'classic', 'metaphor'],
  1800,
  true,
  NULL
),
(
  'poem-nguyen-du-truyen-kieu-001',
  E'Trăm năm trong cõi người ta,\nChữ tài chữ mệnh khéo là ghét nhau.',
  E'In the span of a hundred years of human life,\nTalent and fate are always at odds with each other.',
  'Nguyễn Du',
  'Truyện Kiều (1820)',
  NULL,
  ARRAY['poem', 'famous-person'],
  ARRAY['fate', 'talent', 'life', 'classic'],
  1820,
  true,
  NULL
),
(
  'proverb-ca-dao-001',
  'Uống nước nhớ nguồn.',
  'When drinking water, remember its source.',
  'Ca dao Việt Nam',
  'Tục ngữ, ca dao dân gian Việt Nam',
  NULL,
  ARRAY['proverb'],
  ARRAY['gratitude', 'tradition', 'wisdom'],
  NULL,
  true,
  NULL
)
ON CONFLICT (id) DO NOTHING;
