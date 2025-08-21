import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/products.js';
import ProductForm from '../components/products/ProductForm/ProductForm.jsx';
import Loading from '../components/common/Loading/Loading.jsx';
import Footer from '../components/layout/Footer/Footer.jsx';

/**
 * Create product page component
 */
const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (productData) => {
    setLoading(true);

    try {
      await createProduct(productData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create product:', err);
      // You might want to add error handling here
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ProductForm
        onCancel={handleCancel}
        onSave={handleCreateProduct}
      />
      <Footer />
    </div>
  );
};

export default CreateProductPage;