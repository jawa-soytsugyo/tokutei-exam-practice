(function () {
  'use strict';

  const supportedLanguages = ['uz', 'ja', 'en', 'ne', 'my'];
  const savedLanguage = localStorage.getItem('language') || 'ja';
  const language = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'ja';
  const labels = {
    uz: { eyebrow: 'Tokutei Ginou', themeLight: 'Tun rejimi', themeDark: 'Kun rejimi' },
    ja: { eyebrow: '特定技能', themeLight: '夜間表示', themeDark: '昼間表示' },
    en: { eyebrow: 'Specified Skilled Worker', themeLight: 'Dark mode', themeDark: 'Light mode' },
    ne: { eyebrow: 'निर्दिष्ट दक्ष कामदार', themeLight: 'रातको मोड', themeDark: 'दिनको मोड' },
    my: { eyebrow: 'သတ်မှတ်ကျွမ်းကျင်လုပ်သား', themeLight: 'အမှောင်မုဒ်', themeDark: 'အလင်းမုဒ်' }
  };

  document.documentElement.lang = language;
  document.querySelectorAll('[data-uz]').forEach((element) => {
    const selectedText = element.dataset[language] || (language === 'my' ? element.dataset.en : '');
    element.textContent = typeof selectedText === 'string' ? selectedText : '';
  });

  const eyebrow = document.querySelector('.eyebrow');
  if (eyebrow) eyebrow.textContent = labels[language].eyebrow;

  const theme = document.getElementById('theme');
  function updateThemeAccessibility() {
    if (!theme) return;
    const dark = document.body.classList.contains('dark');
    const label = dark ? labels[language].themeDark : labels[language].themeLight;
    theme.setAttribute('aria-label', label);
    theme.title = label;
  }

  if (theme) theme.addEventListener('click', updateThemeAccessibility);
  updateThemeAccessibility();
})();
