function calculateQuote(pages, { basePrice, includedPages, extraPagePrice, maxPages }) {
  if (!Number.isInteger(pages) || pages < 1 || pages > maxPages) {
    return null;
  }
  const extraPages = Math.max(0, pages - includedPages);
  return { extraPages, extraCost: extraPages * extraPagePrice, total: basePrice + extraPages * extraPagePrice };
}
