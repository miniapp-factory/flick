export interface MarketData {
  market: string;
  price: number;
  availability: string;
  specs: string;
  shipping: string;
}

export interface Product {
  id: number;
  name: string;
  quality: number; // 1-10
  price: number; // in USD
  markets: MarketData[];
  priceHistory: number[];
}

/**
 * Stub implementation of a retailer/affiliate API fetch.
 * In a real application this would make HTTP requests to
 * Amazon, Walmart, or partner affiliate endpoints,
 * parse the responses, and return the data in the
 * Product[] format expected by the UI.
 */
export async function getMarketDataFromAPI(
  name: string
): Promise<Product[]> {
  // TODO: Replace with real API calls.
  // For now we return the same demo data as before.
  const demoProducts: Product[] = [
    {
      id: 1,
      name: "Product A",
      quality: 8,
      price: 120,
      markets: [
        {
          market: "Retailer X",
          price: 118,
          availability: "In Stock",
          specs: "Spec A1",
          shipping: "Free",
        },
        {
          market: "Retailer Y",
          price: 122,
          availability: "In Stock",
          specs: "Spec A2",
          shipping: "5€",
        },
      ],
      priceHistory: [120, 118, 119],
    },
    {
      id: 2,
      name: "Product B",
      quality: 9,
      price: 150,
      markets: [
        {
          market: "Retailer X",
          price: 148,
          availability: "In Stock",
          specs: "Spec B1",
          shipping: "Free",
        },
        {
          market: "Retailer Y",
          price: 152,
          availability: "In Stock",
          specs: "Spec B2",
          shipping: "5€",
        },
      ],
      priceHistory: [150, 148, 149],
    },
    {
      id: 3,
      name: "Product C",
      quality: 7,
      price: 90,
      markets: [
        {
          market: "Retailer X",
          price: 88,
          availability: "In Stock",
          specs: "Spec C1",
          shipping: "Free",
        },
        {
          market: "Retailer Y",
          price: 92,
          availability: "In Stock",
          specs: "Spec C2",
          shipping: "5€",
        },
      ],
      priceHistory: [90, 88, 89],
    },
    {
      id: 4,
      name: "Product D",
      quality: 10,
      price: 200,
      markets: [
        {
          market: "Retailer X",
          price: 198,
          availability: "In Stock",
          specs: "Spec D1",
          shipping: "Free",
        },
        {
          market: "Retailer Y",
          price: 202,
          availability: "In Stock",
          specs: "Spec D2",
          shipping: "5€",
        },
      ],
      priceHistory: [200, 198, 199],
    },
  ];

  return demoProducts.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
}
