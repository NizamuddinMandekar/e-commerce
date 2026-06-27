import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Logo({ className }) {
  return (
    <Link to="/" className={clsx('flex items-center', className)}>
      <img
        src="/logo.png"
        alt="ZiuWorld logo"
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
}
