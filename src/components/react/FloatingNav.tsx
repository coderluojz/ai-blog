'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Archive, Tag, FolderOpen, FlaskConical, Search } from 'lucide-react';
import { BASE_PATH } from '../../utils/constants';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: `${BASE_PATH}/`, label: '首页', icon: <Home className="w-4 h-4" /> },
  { href: `${BASE_PATH}/archives`, label: '归档', icon: <Archive className="w-4 h-4" /> },
  { href: `${BASE_PATH}/categories`, label: '分类', icon: <FolderOpen className="w-4 h-4" /> },
  { href: `${BASE_PATH}/tags`, label: '标签', icon: <Tag className="w-4 h-4" /> },
  { href: `${BASE_PATH}/lab`, label: '实验室', icon: <FlaskConical className="w-4 h-4" /> },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (typeof window === 'undefined') return false;
    const { pathname } = window.location;
    if (href === `${BASE_PATH}/`) return pathname === `${BASE_PATH}/` || pathname === `${BASE_PATH}`;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
          : 'bg-white border-b border-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href={`${BASE_PATH}/`}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center 
              text-white text-xs font-bold group-hover:bg-slate-700 transition-colors">
              AI
            </span>
            <span className="text-base font-semibold text-slate-900">Blog</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900'}`}
              >
                <span className="flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-slate-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md
                text-slate-400 hover:text-slate-600 hover:bg-slate-50
                transition-colors duration-200 cursor-pointer"
              aria-label="搜索"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs">⌘K</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900
                transition-colors duration-200 cursor-pointer"
              aria-label={isOpen ? '关闭菜单' : '打开菜单'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    ${isActive(item.href)
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
