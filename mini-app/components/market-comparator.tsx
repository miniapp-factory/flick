"use client";

import { useEffect, useState, useRef } from "react";

interface MarketData {
  market: string;
  price: number;
  availability: string;
  specs: string;
  shipping: string;
}

interface Product {
  id: number;
  name: string;
  quality: number; // 1-10
  price: number; // in USD
  markets: MarketData[];
  priceHistory: number[];
}

export default function MarketComparator() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [bestProduct, setBestProduct] = useState<Product | null>(null);
  const prevPriceRef = useRef<Record<string, number>>({});

  // Mock fetch function simulating multiple market data
  const fetchMarketData = async (name: string): Promise<Product[]> => {
    // In a real app, replace this with API calls
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

    // Filter by search term (case-insensitive)
    return demoProducts.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  // Fetch data when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setProducts([]);
      setBestProduct(null);
      return;
    }
    fetchMarketData(searchTerm).then((data) => {
      setProducts(data);
      // Determine best product by highest quality-to-price ratio
      const best = data.reduce((prev, curr) => {
        const prevRatio = prev.quality / prev.price;
        const currRatio = curr.quality / curr.price;
        return currRatio > prevRatio ? curr : prev;
      }, data[0]);
      setBestProduct(best);
    });
  }, [searchTerm]);

  // Notify when price drops compared to previous fetch
  useEffect(() => {
    products.forEach((p) => {
      const prevPrice = prevPriceRef.current[p.id];
      if (prevPrice && p.price < prevPrice) {
        alert(`Price drop for ${p.name}: ${prevPrice} → ${p.price}`);
      }
      prevPriceRef.current[p.id] = p.price;
    });
  }, [products]);

  return (
    <section className="mt-6 w-full max-w-4xl rounded-lg border p-4 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Market Comparator</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product by name, barcode, SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Market</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Availability</th>
                <th className="border px-4 py-2">Specs</th>
                <th className="border px-4 py-2">Shipping</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) =>
                p.markets.map((m, idx) => (
                  <tr key={`${p.id}-${idx}`} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-4 py-2">{m.market}</td>
                    <td className="border px-4 py-2">${m.price}</td>
                    <td className="border px-4 py-2">{m.availability}</td>
                    <td className="border px-4 py-2">{m.specs}</td>
                    <td className="border px-4 py-2">{m.shipping}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {bestProduct && (
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">Best Value Product</h3>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {bestProduct.name}
            </p>
            <p>
              <strong>Quality:</strong> {bestProduct.quality}/10
            </p>
            <p>
              <strong>Price:</strong> ${bestProduct.price}
            </p>
            <p>
              <strong>Quality/Price Ratio:</strong>{" "}
              {(bestProduct.quality / bestProduct.price).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
