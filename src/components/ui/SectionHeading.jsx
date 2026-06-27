import clsx from 'clsx';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-medium text-ink md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-xl text-balance text-ink-soft">{subtitle}</p>
      )}
    </div>
  );
}
