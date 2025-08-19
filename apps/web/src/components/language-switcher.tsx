
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@amberops/ui/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@amberops/ui/components/ui/tooltip';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="language-switcher-button">
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change Language</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" data-testid="language-switcher-dropdown">
        <DropdownMenuItem onClick={() => changeLanguage('en')} data-testid="lang-en">English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')} data-testid="lang-es">Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('fr')} data-testid="lang-fr">Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('de')} data-testid="lang-de">Deutsch</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ja')} data-testid="lang-ja">日本語</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('zh')} data-testid="lang-zh">中文</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ru')} data-testid="lang-ru">Русский</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('hi')} data-testid="lang-hi">हिन्दी</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ar')} data-testid="lang-ar">العربية</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
