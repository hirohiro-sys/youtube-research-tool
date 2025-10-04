export function formatViewCount(viewCount: number | string): string {
    const count = typeof viewCount === "string" ? parseInt(viewCount, 10) : viewCount;
  
    if (count < 10000) return count.toString();
    if (count < 100000000) return (count / 10000).toFixed(1).replace(/\.0$/, "") + "万";
    return (count / 100000000).toFixed(1).replace(/\.0$/, "") + "億";
  }