import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-ink text-cream hover:bg-gold-dark',
  gold: 'bg-gold text-cream hover:bg-gold-dark',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-cream',
  ghost: 'text-ink hover:bg-cream-dark',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
