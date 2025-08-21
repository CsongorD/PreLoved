import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Form component for creating/editing products
 * @param {Object} props - Component props
 * @param {Function} props.onCancel - Function to call when canceling
 * @param {Function} props.onSave - Function to call when saving
 * @param {Object} props.initialData - Initial form data (for editing)
 */
const ProductForm = ({ onCancel, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    type: initialData.type || '',
    description: initialData.description || '',
    price: initialData.price || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert price to number
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    onSave(productData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const productTypes = [
    { value: '', label: 'Select category' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home-equipment', label: 'Home Equipment' },
    { value: 'toys', label: 'Toys' },
    { value: 'sport', label: 'Sport & Recreation' },
    { value: 'baby', label: 'Baby Stuff' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-slide-up">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Upload Your Item
            </h1>
            <p className="text-neutral-600 mt-2">Share something you'd love to sell</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                name="name" 
                id="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                placeholder="Product name"
              />
              <label 
                htmlFor="name"
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
              >
                Product name
              </label>
            </div>

            <div className="relative">
              <select 
                name="type" 
                id="type" 
                required 
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                {productTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600">
                Product type
              </label>
            </div>

            <div className="relative">
              <textarea 
                name="description" 
                id="description" 
                required
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 peer placeholder-transparent resize-none"
                placeholder="Product description"
              />
              <label 
                htmlFor="description"
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
              >
                Product description
              </label>
            </div>

            <div className="relative">
              <input 
                type="number" 
                name="price" 
                id="price" 
                required 
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                placeholder="Price"
              />
              <label 
                htmlFor="price"
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
              >
                Price ($)
              </label>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default ProductForm;