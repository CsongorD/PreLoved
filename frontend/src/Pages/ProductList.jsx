import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import ProductTable from "./ProductTable";
import Footer from "../Components/Footer";
import { useClient } from "../Context/ClientContext";

const fetchProducts = (signal) => {
  return fetch("/products/all", { signal }).then((res) => res.json());
};

const ProductList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
 
  const client = useClient();

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((products) => {
        setLoading(false);
        setData(products);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100">
      <ProductTable products={data}/>
      <Footer />
    </div>
  );
};

export default ProductList;