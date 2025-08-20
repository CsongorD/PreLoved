import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import { fetchWithToken } from "../Context/ClientContext";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
      .then((product) => {
        setLoading(false);
        setProduct(product);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setProduct(null);
          throw error;
        }
      });
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-primary-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Product not found</h2>
            <p className="text-neutral-600 mb-6">The item you're looking for doesn't exist.</p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Back to Browse
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="aspect-square bg-white rounded-2xl shadow-sm border border-primary-200 overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                  <svg className="w-24 h-24 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="animate-slide-up">
            <div className="card p-8">
              {/* Category Badge */}
              {product.type && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800">
                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                  </span>
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent-900">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Description</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex-1">
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5H2m5 8h10m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Add to Cart
                </button>
                <button 
                  onClick={() => navigate("/")} 
                  className="btn-outline flex-1"
                >
                  Back to Browse
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-primary-200">
                <div className="flex items-center space-x-4 text-sm text-neutral-500">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Verified seller</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;