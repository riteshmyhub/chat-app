export function dateFromNow(date: string | number | Date): string {
   const now = new Date();
   const givenDate = new Date(date);
   const seconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

   const intervals: { [key: string]: number } = {
      year: 365 * 24 * 60 * 60,
      month: 30 * 24 * 60 * 60,
      day: 24 * 60 * 60,
      hour: 60 * 60,
      minute: 60,
      second: 1,
   };

   for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
         return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
      }
   }
   return "just now";
}
