import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import { BASE_PATH } from '../../utils/constants';

interface TimelinePost {
  slug: string;
  data: {
    title: string;
    pubDate: Date;
    category: string;
  };
}

interface TimelineItemProps {
  year: number;
  months: Array<{
    month: number;
    monthName: string;
    posts: TimelinePost[];
  }>;
  index: number;
}

export function TimelineItem({ year, months, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-16 pb-12"
    >
      {/* Vertical line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-px 
        bg-gradient-to-b from-slate-300 via-slate-200 to-transparent"
      />

      {/* Year marker */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 top-0 w-12 h-12 rounded-full
          bg-gradient-to-br from-slate-700 to-slate-500
          flex items-center justify-center
          shadow-lg shadow-slate-500/20"
      >
        <span className="text-sm font-bold text-white">{year}</span>
      </motion.div>

      {/* Months */}
      <div className="space-y-8">
        {months.map((month) => (
          <div key={month.month} className="relative">
            {/* Month label */}
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-500">
                {month.monthName}
              </span>
              <span className="text-xs text-slate-400">
                ({month.posts.length} 篇)
              </span>
            </div>

            {/* Posts list */}
            <div className="space-y-2">
              {month.posts.map((post, postIndex) => (
                <motion.a
                  key={post.slug}
                  href={`${BASE_PATH}/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: postIndex * 0.05, duration: 0.3 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-lg
                    hover:bg-slate-50 transition-colors duration-200 cursor-pointer group"
                >
                  {/* Dot connector */}
                  <div
                    className="absolute left-[23px] w-[7px] h-[7px] rounded-full
                    bg-slate-300 group-hover:bg-slate-500 transition-colors"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-700 font-medium truncate group-hover:text-slate-900">
                      {post.data.title}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {dayjs(post.data.pubDate).format('MM-DD')}
                    </span>
                  </div>

                  <ChevronRight
                    className="w-4 h-4 text-slate-300 group-hover:text-slate-500
                    transition-colors duration-200 flex-shrink-0"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface TimelineProps {
  items: Array<{
    year: number;
    months: Array<{
      month: number;
      monthName: string;
      posts: Array<{
        slug: string;
        data: {
          title: string;
          pubDate: Date;
          category: string;
        };
      }>;
    }>;
  }>;
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={item.year}
          year={item.year}
          months={item.months}
          index={index}
        />
      ))}
    </div>
  );
}
