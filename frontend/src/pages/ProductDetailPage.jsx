import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../services/products.js';
import Loading from '../components/common/Loading/Loading.jsx';

/**
 * Product detail page component
 */
const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch product:', error);
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Product not found</h2>
          <button 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
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
              onClick={() => navigate('/')}
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

export default ProductDetailPage;