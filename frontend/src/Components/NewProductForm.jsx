import { useState } from "react";

const NewProductForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    price: ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const productTypes = [
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "home-equipment", label: "Home Equipment" },
    { value: "toys", label: "Toys" },
    { value: "sport", label: "Sport & Recreation" },
    { value: "baby", label: "Baby Stuff" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="card p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-gradient mb-2">
              List Your Item
            </h1>
            <p className="text-neutral-600">
              Share your pre-loved treasure with the community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="form-label">
                  Product Name *
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="What are you selling?"
                />
              </div>

              {/* Product Type */}
              <div>
                <label htmlFor="type" className="form-label">
                  Category *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {productTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="form-label">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Describe your item's condition, features, and any other relevant details..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button type="submit" className="btn-primary flex-1">
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                List Item
              </button>
              <button type="button" onClick={onCancel} className="btn-outline flex-1">
                Cancel
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-accent-50 border border-accent-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-accent-800">
                <p className="font-medium mb-1">Tips for a great listing:</p>
                <ul className="space-y-1 text-accent-700">
                  <li>• Be honest about the item's condition</li>
                  <li>• Include all relevant details and measurements</li>
                  <li>• Price competitively based on condition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;