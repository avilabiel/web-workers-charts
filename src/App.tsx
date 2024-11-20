import { useEffect, useState } from "react";
import "./App.css";
import data from "./improved_generated_data.json";
import ProductBar from "./ProductBar";
import Product from "./Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = (): Promise<Product[]> => {
    return Promise.resolve(data);
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts().then((products) => {
        setProducts(products);
      });
    }, 5000);
  });

  return (
    <>
      <h1>Charts with Web Workers</h1>
      <p>The following chart will be built using Web Workers</p>
      <ProductBar products={products} />
    </>
  );
}

export default App;
