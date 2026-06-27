import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Logo({ className }) {
  return (
    <Link to="/" className={clsx('flex items-center', className)}>
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="ZiuWorld logo"
        className="h-14 w-auto max-w-[180px] object-contain"
      />
    </Link>
  );
}
