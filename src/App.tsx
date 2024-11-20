import { useCallback, useEffect, useState } from "react";
import "./App.css";
import data from "./unique_40_companies_data_200k.json";
import ProductAggregatedByYear from "./ProductAggregatedByYear";
import Product from "./Product";
import ProductAggregatedByCompany from "./ProductAggregatedByCompany";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = (): Promise<Product[]> => {
    // @ts-ignore
    return Promise.resolve(data);
  };

  // After 5s, get the products (simulating an API)
  useEffect(() => {
    setTimeout(() => {
      getProducts().then((products) => {
        setProducts(products);
      });
    }, 5000);
  }, []);

  const onlyP1 = useCallback(() => {
    const newProducts = products.filter((product) => product.priority === "p1");
    setProducts(newProducts);
  }, [products]);

  const allPriorities = useCallback(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, [products]);

  return (
    <>
      <h1>Charts with Web Workers</h1>
      <p>The following chart will be built using Web Workers</p>
      <button onClick={onlyP1}>Only by P1</button>
      <button onClick={allPriorities}>All priorities</button>
      <br />
      <br />
      <hr />
      <h2>Aggregated by year</h2>
      <ProductAggregatedByYear products={products} />
      <br />
      <hr />
      <h2>Aggregated by company</h2>
      <ProductAggregatedByCompany products={products} />
      <br />
      <hr />
      <h2>Aggregated by status</h2>

      <br />
      <hr />
      <h2>Aggregated by owner</h2>
    </>
  );
}

export default App;
