import { ALL_AFFIRMATIONS } from '../data/affirmations';

function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getDailyAffirmation() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const index = hashString(dateStr) % ALL_AFFIRMATIONS.length;
  return ALL_AFFIRMATIONS[index];
}

export function getRandomAffirmation(exclude) {
  const pool = exclude
    ? ALL_AFFIRMATIONS.filter((a) => a !== exclude)
    : ALL_AFFIRMATIONS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomFromCategory(categoryAffirmations, exclude) {
  const pool = exclude
    ? categoryAffirmations.filter((a) => a !== exclude)
    : categoryAffirmations;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
