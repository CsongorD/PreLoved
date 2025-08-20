const ProductLayoutInList = ({ product }) => {
  return (
    <div className="text-center group-hover:scale-105 transition-transform duration-200">
      {/* Product Image Placeholder */}
      <div className="w-full h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-neutral-800 text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl font-bold text-accent-900">
            ${product.price}
          </span>
          {product.type && (
            <span className="text-xs bg-primary-200 text-primary-700 px-2 py-1 rounded-full">
              {product.type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductLayoutInList;