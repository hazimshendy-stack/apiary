import type { ReactNode } from 'react';
import { cx } from '@/lib/format';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  neutral?: boolean;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, color, neutral, dot, className }: BadgeProps) {
  if (neutral || !color) {
    return <span className={cx('badge badge--neutral', className)}>{children}</span>;
  }

  const style = {
    background: color + '1f',
    borderColor: color + '59',
    color,
  };

  return (
    <span className={cx('badge', className)} style={style}>
      {dot ? <span className="badge__dot" /> : null}
      {children}
    </span>
  );
}
