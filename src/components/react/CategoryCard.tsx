import { motion } from 'framer-motion';
import { FolderOpen, FileText } from 'lucide-react';
import { BASE_PATH } from '../../utils/constants';

interface CategoryCardProps {
  name: string;
  slug: string;
  count: number;
  latestPostTitle?: string;
}

export function CategoryCard({
  name,
  slug,
  count,
  latestPostTitle,
}: CategoryCardProps) {
  return (
    <motion.a
      href={`${BASE_PATH}/categories/${slug}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="block p-6 rounded-xl border border-slate-100 bg-white
        hover:shadow-lg hover:border-slate-200
        transition-shadow duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50
          flex items-center justify-center text-slate-500
          group-hover:from-slate-200 group-hover:to-slate-100
          transition-colors duration-300"
        >
          <FolderOpen className="w-6 h-6" />
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-medium
          bg-slate-100 text-slate-600"
        >
          {count} 篇
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-slate-600 transition-colors">
        {name}
      </h3>

      {latestPostTitle && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FileText className="w-3.5 h-3.5" />
          <span className="truncate">{latestPostTitle}</span>
        </div>
      )}
    </motion.a>
  );
}

interface CategoryGridProps {
  categories: Array<{
    name: string;
    slug: string;
    count: number;
    latestPost?: { data: { title: string } } | null;
  }>;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <CategoryCard
            name={category.name}
            slug={category.slug}
            count={category.count}
            latestPostTitle={category.latestPost?.data.title}
          />
        </motion.div>
      ))}
    </div>
  );
}
