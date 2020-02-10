export const isToday = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
};

export const isInAMonth = (date) => {
    const today = new Date();
    const monthFromToday = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return date.getFullYear() === monthFromToday.getFullYear() &&
        date.getMonth() === monthFromToday.getMonth() &&
        date.getDate() === monthFromToday.getDate();
};

export const isInAYear = (date) => {
    const today = new Date();
    const yearFromToday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    return date.getFullYear() === yearFromToday.getFullYear() &&
        date.getMonth() === yearFromToday.getMonth() &&
        date.getDate() === yearFromToday.getDate();
};