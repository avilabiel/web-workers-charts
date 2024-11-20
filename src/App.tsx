import { useCallback, useEffect, useState } from "react";
import "./App.css";
import data from "./large_generated_data_200k.json";
import ProductBar from "./ProductBar";
import Product from "./Product";

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

  // After 15s, perform a big change and just keep p1
  const onlyP1 = useCallback(() => {
    const newProducts = products.filter((product) => product.priority === "p1");
    setProducts(newProducts);
  }, [products]);

  return (
    <>
      <h1>Charts with Web Workers</h1>
      <p>The following chart will be built using Web Workers</p>
      <button onClick={onlyP1}>Click here to filter only by P1</button>
      <br />
      <br />
      <ProductBar products={products} />
    </>
  );
}

export default App;
