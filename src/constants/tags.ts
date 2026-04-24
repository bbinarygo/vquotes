export interface TagEntry {
  value: string;
  label: string;
  labelVi: string;
}

export const TAG_LIST: TagEntry[] = [
  { value: 'fate',        label: 'Fate',        labelVi: 'Số phận' },
  { value: 'talent',      label: 'Talent',      labelVi: 'Tài năng' },
  { value: 'life',        label: 'Life',        labelVi: 'Cuộc sống' },
  { value: 'classic',     label: 'Classic',     labelVi: 'Kinh điển' },
  { value: 'womanhood',   label: 'Womanhood',   labelVi: 'Nữ giới' },
  { value: 'resilience',  label: 'Resilience',  labelVi: 'Kiên cường' },
  { value: 'metaphor',    label: 'Metaphor',    labelVi: 'Ẩn dụ' },
  { value: 'peace',       label: 'Peace',       labelVi: 'Bình yên' },
  { value: 'contentment', label: 'Contentment', labelVi: 'Biết đủ' },
  { value: 'simplicity',  label: 'Simplicity',  labelVi: 'Giản dị' },
  { value: 'war',         label: 'War',         labelVi: 'Chiến tranh' },
  { value: 'homeland',    label: 'Homeland',    labelVi: 'Quê hương' },
  { value: 'gratitude',   label: 'Gratitude',   labelVi: 'Biết ơn' },
  { value: 'tradition',   label: 'Tradition',   labelVi: 'Truyền thống' },
  { value: 'wisdom',      label: 'Wisdom',      labelVi: 'Trí tuệ' },
];

const TAG_MAP = new Map(TAG_LIST.map(t => [t.value, t]));

export function tagLabel(value: string, lang: 'vi' | 'en'): string {
  const entry = TAG_MAP.get(value);
  if (!entry) return value;
  return lang === 'vi' ? entry.labelVi : entry.label;
}
