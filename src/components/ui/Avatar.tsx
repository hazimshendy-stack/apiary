import { cx, hashString, initials } from '@/lib/format';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, size = 52, className }: AvatarProps) {
  const hue = hashString(name) % 360;
  const style = {
    width: size,
    height: size,
    fontSize: Math.max(11, Math.round(size * 0.36)),
    background: 'hsl(' + hue + ' 55% 16%)',
    color: 'hsl(' + hue + ' 85% 68%)',
  };

  return (
    <span className={cx('avatar', className)} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
