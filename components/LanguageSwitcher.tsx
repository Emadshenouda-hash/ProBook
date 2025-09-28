import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';

const ToggleWrap = styled('div')`
  display: inline-block;
`;

const Toggle = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 2px;
  width: 120px;
  height: 36px;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows.sm};
`;

const Thumb = styled('div')<{ right?: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(100% - 4px);
  width: calc(50% - 2px);
  border-radius: 999px;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  transform: translateX(${({ right }) => (right ? '100%' : '0')});
  transition: transform 200ms ease;
`;

const SegButton = styled('button')<{ active?: boolean }>`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  height: 100%;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  z-index: 1;
  color: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) => (active ? '#fff' : theme.colors.text)};
`;

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { locale, pathname, query, asPath } = router;
  const isArabic = locale === 'ar';

  const changeLanguage = (lang: string) => {
    if (lang === locale) return;
    i18n.changeLanguage(lang);
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      changeLanguage(isArabic ? 'en' : 'ar');
    }
  };

  return (
    <ToggleWrap>
      <Toggle role="tablist" aria-label="Language" onKeyDown={onKeyDown}>
        <Thumb right={isArabic} aria-hidden />
        <SegButton
          type="button"
          role="tab"
          aria-selected={!isArabic}
          active={!isArabic}
          onClick={() => changeLanguage('en')}
        >
          EN
        </SegButton>
        <SegButton
          type="button"
          role="tab"
          aria-selected={isArabic}
          active={isArabic}
          onClick={() => changeLanguage('ar')}
        >
          العربية
        </SegButton>
      </Toggle>
    </ToggleWrap>
  );
}