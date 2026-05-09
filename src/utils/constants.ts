/**
 * 项目基础路径常量
 * 用于处理二级目录部署时的路由前缀
 */
export const BASE_PATH = '/ai-blog';

/**
 * 格式化路由路径，自动添加基础路径前缀
 * @param path 原始路径
 * @returns 格式化后的路径
 */
export const getRelativePath = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath.startsWith(BASE_PATH)) {
    return normalizedPath;
  }
  return `${BASE_PATH}${normalizedPath}`;
};
