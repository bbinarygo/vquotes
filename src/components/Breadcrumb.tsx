import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-rule mx-0.5" aria-hidden="true">›</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-ink-faint hover:text-sienna transition-colors focus-ring rounded"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-muted font-medium" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
