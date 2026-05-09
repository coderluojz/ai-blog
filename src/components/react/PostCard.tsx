import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import dayjs from 'dayjs';
import { BASE_PATH } from '../../utils/constants';

interface PostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  category: string;
  tags: string[];
  slug: string;
  index?: number;
}

export function PostCard({
  title,
  description,
  pubDate,
  category,
  tags,
  slug,
  index = 0,
}: PostCardProps) {
  const formattedDate = dayjs(pubDate).format('YYYY-MM-DD');
  const readingTime = Math.max(1, Math.ceil(description.length / 500));

  return (
    <motion.a
      href={`${BASE_PATH}/blog/${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="block p-6 rounded-xl border border-slate-100 bg-white
        hover:shadow-lg hover:border-slate-200
        transition-shadow duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-medium
          bg-slate-100 text-slate-600 group-hover:bg-slate-200
          transition-colors duration-200"
        >
          {category}
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {readingTime} 分钟
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold text-slate-800 mb-2 
        group-hover:text-slate-600 transition-colors duration-200"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            #{tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="text-xs text-slate-300">+{tags.length - 3}</span>
        )}
      </div>

      {/* Read more */}
      <div
        className="flex items-center gap-1 text-sm font-medium text-slate-500
        group-hover:text-slate-700 transition-colors duration-200"
      >
        阅读全文
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </motion.a>
  );
}

interface PostListProps {
  posts: Array<{
    slug: string;
    data: {
      title: string;
      description: string;
      pubDate: Date;
      category: string;
      tags: string[];
    };
  }>;
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          title={post.data.title}
          description={post.data.description}
          pubDate={post.data.pubDate}
          category={post.data.category}
          tags={post.data.tags}
          index={index}
        />
      ))}
    </div>
  );
}
