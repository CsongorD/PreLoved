import ProductLayoutInList from "../Components/ProductLayoutInList";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
            Discover PreLoved Treasures
          </h1>
          <p className="text-neutral-600 text-lg">Find unique items with stories to tell</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products && products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:scale-105 transform"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="aspect-square overflow-hidden bg-neutral-100">
                <img 
                  src={product.image || '/api/placeholder/200/200'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <ProductLayoutInList product={product} />
              </div>
            </div>
          ))}
        </div>
        
        {(!products || products.length === 0) && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No products yet</h3>
            <p className="text-neutral-500">Be the first to share something special!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;