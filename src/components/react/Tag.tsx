import { motion } from 'framer-motion';
import { BASE_PATH } from '../../utils/constants';

interface TagProps {
  name: string;
  slug?: string;
  count?: number;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Tag({ name, count, href, size = 'md' }: TagProps) {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const Component = href ? 'a' : 'div';
  const linkProps = href ? { href } : {};

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Component
        {...linkProps}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium
          bg-slate-100 text-slate-700 hover:bg-slate-200 
          transition-colors duration-200 cursor-pointer
          ${sizeClasses[size]}`}
      >
        <span>#</span>
        <span>{name}</span>
        {count !== undefined && (
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-slate-200/50">
            {count}
          </span>
        )}
      </Component>
    </motion.div>
  );
}

interface TagCloudProps {
  tags: Array<{ name: string; slug: string; count: number }>;
  baseUrl?: string;
}

export function TagCloud({ tags, baseUrl = `${BASE_PATH}/tags` }: TagCloudProps) {
  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const scale = 0.75 + (tag.count / maxCount) * 0.5;
        return (
          <motion.a
            key={tag.slug}
            href={`${baseUrl}/${tag.slug}`}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: `${scale}rem` }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full
              bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800
              transition-colors duration-200 cursor-pointer"
          >
            #{tag.name}
            <span className="text-xs text-slate-400">{tag.count}</span>
          </motion.a>
        );
      })}
    </div>
  );
}
