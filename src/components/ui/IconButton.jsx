import clsx from 'clsx';

export default function IconButton({ as: Component = 'button', className, children, label, ...props }) {
  return (
    <Component
      aria-label={label}
      className={clsx(
        'inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-cream-dark cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
