export function formatDaysAgo(daysAgo: number): string {
    if (daysAgo === 0) return "今日";
    if (daysAgo < 7) return `${daysAgo}日前`;
  
    if (daysAgo < 30) {
      const weeks = Math.floor(daysAgo / 7);
      return `${weeks}週間前`;
    }
  
    if (daysAgo < 365) {
      const months = Math.floor(daysAgo / 30);
      return `${months}ヶ月前`;
    }
  
    const years = Math.floor(daysAgo / 365);
    return `${years}年前`;
  }