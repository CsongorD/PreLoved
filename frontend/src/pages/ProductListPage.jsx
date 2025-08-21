import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/products.js';
import Loading from '../components/common/Loading/Loading.jsx';
import ProductGrid from '../components/products/ProductGrid/ProductGrid.jsx';
import Footer from '../components/layout/Footer/Footer.jsx';

/**
 * Product list page component
 */
const ProductListPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch products:', error);
          setProducts(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100">
      <ProductGrid products={products} />
      <Footer />
    </div>
  );
};

export default ProductListPage;