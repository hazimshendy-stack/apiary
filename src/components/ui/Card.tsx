import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '@/lib/format';

interface CardProps {
  children: ReactNode;
  to?: string;
  className?: string;
}

export function Card({ children, to, className }: CardProps) {
  if (to) {
    return (
      <Link to={to} className={cx('card', className)}>
        {children}
      </Link>
    );
  }
  return <div className={cx('card', className)}>{children}</div>;
}
