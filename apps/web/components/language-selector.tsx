"use client";

import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/shadcn-ui/ui/dropdown-menu";
import { ScrollArea } from "@repo/shadcn-ui/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Iconify } from "@/components/iconify";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "twemoji:flag-united-kingdom",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "twemoji:flag-turkey",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "twemoji:flag-germany",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "twemoji:flag-france",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "twemoji:flag-spain",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "twemoji:flag-portugal",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "twemoji:flag-italy",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "twemoji:flag-netherlands",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "twemoji:flag-russia",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "twemoji:flag-china",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "twemoji:flag-japan",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "twemoji:flag-south-korea",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "twemoji:flag-saudi-arabia",
  },
];

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]!,
  );

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative h-9 flex items-center gap-2 px-3 rounded-xl",
            "bg-gray-100 dark:bg-zinc-800",
            "hover:bg-gray-200 dark:hover:bg-zinc-700",
            "border border-gray-200 dark:border-zinc-700",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            className,
          )}
        >
          <Iconify icon={currentLanguage.flag} className="h-4.5 w-4.5" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {currentLanguage.code.toUpperCase()}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-0 overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-xl"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-linear-to-r from-gray-50 to-gray-100/50 dark:from-zinc-800/50 dark:to-zinc-900 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Language
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Select your preferred language
            </p>
          </div>
        </div>

        {/* Language List */}
        <ScrollArea className="h-80">
          <div className="p-2">
            {languages.map((language) => {
              const isSelected = currentLanguage.code === language.code;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    "hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none",
                    isSelected &&
                      "bg-primary/10 dark:bg-primary/15 hover:bg-primary/15 dark:hover:bg-primary/20",
                  )}
                >
                  {/* Flag */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-xl border transition-all",
                      isSelected
                        ? "bg-primary/10 dark:bg-primary/20 border-primary/30"
                        : "bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700",
                    )}
                  >
                    <Iconify icon={language.flag} className="h-5 w-5" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 min-w-0 text-left">
                    <span
                      className={cn(
                        "text-sm font-medium truncate transition-colors",
                        isSelected
                          ? "text-primary dark:text-primary"
                          : "text-gray-900 dark:text-white",
                      )}
                    >
                      {language.nativeName}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] transition-colors",
                        isSelected
                          ? "text-primary/70 dark:text-primary/80"
                          : "text-gray-500 dark:text-gray-400",
                      )}
                    >
                      {language.name}
                    </span>
                  </div>

                  {/* Check Icon */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200",
                      isSelected
                        ? "bg-primary text-white scale-100"
                        : "scale-0",
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
