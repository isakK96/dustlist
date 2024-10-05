export function createTradeLink(name: string): string {
  const baseUrl = "https://www.pathofexile.com/trade/search/Settlers?q=";
  const query = {
    query: {
      name: name
    }
  };

  const urlEncodedString = encodeURIComponent(JSON.stringify(query));

  return baseUrl + urlEncodedString;
}