import PropTypes from 'prop-types';

/**
 * Product card component for displaying product information in lists
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {Function} props.onClick - Function to call when card is clicked
 */
const ProductCard = ({ product, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:scale-105 transform"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <div className="aspect-square overflow-hidden bg-neutral-100">
        <img 
          src={product.image || '/api/placeholder/200/200'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-neutral-800 text-sm line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary-600">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;