export const transformDate = (date: string) => {
  return new Date(date || '').toLocaleDateString('uz').split('/').join('.');
};

export const transformDateToTime = (date: string) => {
  return new Date(date || '')
    .toLocaleTimeString('uz')
    .split(':')
    .slice(0, 2)
    .join(':');
};
