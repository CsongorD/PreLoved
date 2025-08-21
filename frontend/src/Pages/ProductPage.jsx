import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import { fetchWithToken } from "../Context/ClientContext";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchProduct = (signal) => {
    return fetchWithToken("GET", localStorage.getItem("Token"), `/products/${id}`, null)
      .then((data) => data.json());
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal)
      .then((products) => {
        setLoading(false);
        setProduct(products);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setProduct(null);
          throw error;
        }
      });
    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full animate-scale-in">
        <div className="aspect-square overflow-hidden">
          <img 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            src={product.image} 
            alt={product.name}
          />
        </div>
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">{product.name}</h2>
          <p className="text-neutral-600 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Available
            </span>
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;