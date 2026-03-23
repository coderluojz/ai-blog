import { getCollection, type CollectionEntry } from 'astro:content';
import dayjs from 'dayjs';
import { groupBy, sortBy } from 'lodash-es';

export type BlogPost = CollectionEntry<'blog'>;

export interface TimelineItem {
  year: number;
  months: {
    month: number;
    monthName: string;
    posts: BlogPost[];
  }[];
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
  latestPost: BlogPost | null;
}

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

export interface PostsByYear {
  year: number;
  posts: BlogPost[];
}

/**
 * 获取所有已发布的文章
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });
  return sortBy(posts, (post) => post.data.pubDate).reverse();
}

/**
 * 按时间线分组文章
 */
export function groupPostsByTimeline(posts: BlogPost[]): TimelineItem[] {
  const postsByYear = groupBy(posts, (post) =>
    dayjs(post.data.pubDate).year()
  );

  const timeline: TimelineItem[] = Object.entries(postsByYear)
    .map(([yearStr, yearPosts]) => {
      const year = parseInt(yearStr, 10);
      const postsByMonth = groupBy(yearPosts, (post) =>
        dayjs(post.data.pubDate).month()
      );

      const months = Object.entries(postsByMonth)
        .map(([monthStr, monthPosts]) => {
          const month = parseInt(monthStr, 10);
          return {
            month,
            monthName: dayjs().month(month).format('MMMM'),
            posts: sortBy(monthPosts, (post) => post.data.pubDate).reverse(),
          };
        })
        .sort((a, b) => b.month - a.month);

      return { year, months };
    })
    .sort((a, b) => b.year - a.year);

  return timeline;
}

/**
 * 获取所有分类及统计
 */
export function getCategories(posts: BlogPost[]): CategoryInfo[] {
  const postsByCategory = groupBy(posts, (post) => post.data.category);

  const categories: CategoryInfo[] = Object.entries(postsByCategory).map(
    ([name, categoryPosts]) => ({
      name,
      slug: slugify(name),
      count: categoryPosts.length,
      latestPost: sortBy(
        categoryPosts,
        (post) => post.data.pubDate
      ).reverse()[0] ?? null,
    })
  );

  return sortBy(categories, (cat) => cat.name);
}

/**
 * 获取所有标签及统计
 */
export function getTags(posts: BlogPost[]): TagInfo[] {
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tags: TagInfo[] = Object.entries(tagCounts).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }));

  return sortBy(tags, (tag) => tag.count).reverse();
}

/**
 * 按分类筛选文章
 */
export function getPostsByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  return posts.filter(
    (post) => slugify(post.data.category) === slugify(category)
  );
}

/**
 * 按标签筛选文章
 */
export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) =>
    post.data.tags.some((t) => slugify(t) === slugify(tag))
  );
}

/**
 * 获取分类名称（通过 slug 反查）
 */
export function getCategoryNameBySlug(
  categories: CategoryInfo[],
  slug: string
): string | null {
  const category = categories.find((cat) => cat.slug === slug);
  return category?.name ?? null;
}

/**
 * 获取标签名称（通过 slug 反查）
 */
export function getTagNameBySlug(tags: TagInfo[], slug: string): string | null {
  const tag = tags.find((t) => t.slug === slug);
  return tag?.name ?? null;
}

/**
 * 文章 slugify 工具
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 获取相关文章（基于共同标签）
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  const currentTags = new Set(currentPost.data.tags);

  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const commonTags = post.data.tags.filter((tag) =>
        currentTags.has(tag)
      ).length;
      const sameCategory = post.data.category === currentPost.data.category ? 1 : 0;
      return { post, score: commonTags * 2 + sameCategory };
    })
    .filter((item) => item.score > 0);

  return sortBy(scoredPosts, (item) => item.score)
    .reverse()
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * 格式化日期
 */
export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

/**
 * 相对时间
 */
export function fromNow(date: Date): string {
  const now = dayjs();
  const target = dayjs(date);
  const diffDays = now.diff(target, 'day');

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`;
  return `${Math.floor(diffDays / 365)} 年前`;
}
