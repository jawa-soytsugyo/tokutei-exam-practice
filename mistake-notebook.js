(function () {
  'use strict';
  const STORAGE_KEY = 'tokutei-mistake-notebook-v1';
  function read() {
    try {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }
  function write(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('MistakeNotebook write failed:', e);
    }
  }
  function key(item) {
    return `${item.field || ''}:${item.questionId || ''}`;
  }
  function save(item) {
    if (!item?.field || !item?.questionId || !item?.correctAnswer) return;
    const entry = {
      field: String(item.field).slice(0, 40),
      questionId: String(item.questionId).slice(0, 160),
      prompt: String(item.prompt || '').slice(0, 1500),
      correctAnswer: String(item.correctAnswer).slice(0, 500),
      explanation: String(item.explanation || '').slice(0, 2000),
      selectedAnswer: item.selectedAnswer ? String(item.selectedAnswer).slice(0, 500) : '',
      promptJa: item.promptJa ? String(item.promptJa).slice(0, 1500) : '',
      correctJa: item.correctJa ? String(item.correctJa).slice(0, 500) : '',
      explanationJa: item.explanationJa ? String(item.explanationJa).slice(0, 2000) : '',
      explanations: item.explanations && typeof item.explanations === 'object' ? item.explanations : null,
      savedAt: Date.now()
    };
    write([entry, ...read().filter((existing) => key(existing) !== key(entry))].slice(0, 300));
  }
  function remove(field, questionId) {
    write(read().filter((item) => key(item) !== `${field}:${questionId}`));
  }
  function clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.MistakeNotebook = Object.freeze({ read, save, remove, clear });
}());
