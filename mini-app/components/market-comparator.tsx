"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  quality: number; // 1-10
  price: number; // in USD
}

export default function MarketComparator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestProduct, setBestProduct] = useState<Product | null>(null);

  useEffect(() => {
    // In a real app this would fetch from an API.
    // For demo purposes we use static data.
    const demoProducts: Product[] = [
      { id: 1, name: "Product A", quality: 8, price: 120 },
      { id: 2, name: "Product B", quality: 9, price: 150 },
      { id: 3, name: "Product C", quality: 7, price: 90 },
      { id: 4, name: "Product D", quality: 10, price: 200 },
    ];
    setProducts(demoProducts);

    // Determine best product by highest quality-to-price ratio
    const best = demoProducts.reduce((prev, curr) => {
      const prevRatio = prev.quality / prev.price;
      const currRatio = curr.quality / curr.price;
      return currRatio > prevRatio ? curr : prev;
    }, demoProducts[0]);

    setBestProduct(best);
  }, []);

  if (!bestProduct) {
    return <p>Loading best product...</p>;
  }

  return (
    <section className="mt-6 w-full max-w-md rounded-lg border p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">Best Value Product</h2>
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
    </section>
  );
}
