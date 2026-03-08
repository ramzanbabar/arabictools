"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Search, ChevronDown } from "lucide-react";
import { TOOL_CATEGORIES, getPopularTools } from "@/lib/tools";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">أدوات</span>
          <span className="text-gray-900 dark:text-white">عربية</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">الرئيسية</Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary">
              الأدوات
              <ChevronDown className="w-4 h-4 rtl:scale-x-[-1]" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
                <Link
                  key={key}
                  href={`/?category=${key}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                >
                  <span>{cat.nameAr}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">عن الموقع</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="max-w-2xl mx-auto">
            <input
              type="search"
              placeholder="ابحث عن أداة..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
              dir="rtl"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 dark:border-gray-800 md:hidden">
          <nav className="p-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-600 dark:text-gray-400">الرئيسية</Link>
            {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
              <Link
                key={key}
                href={`/?category=${key}`}
                className="block py-2 text-gray-600 dark:text-gray-400"
              >
                {cat.nameAr}
              </Link>
            ))}
            <Link href="/about" className="block py-2 text-gray-600 dark:text-gray-400">عن الموقع</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
