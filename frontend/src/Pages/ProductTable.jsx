import ProductLayoutInList from "../Components/ProductLayoutInList";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Discover Amazing Finds
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Browse through our curated collection of pre-loved treasures waiting for their next adventure
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="card p-6 cursor-pointer group hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <ProductLayoutInList product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">No items found</h3>
            <p className="text-neutral-600">Be the first to add an item to our marketplace!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductTable;