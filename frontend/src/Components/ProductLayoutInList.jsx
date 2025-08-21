const ProductLayoutInList = ({ product }) => {
  return (
    <div className="text-center space-y-2">
      <h3 className="font-semibold text-neutral-800 text-sm line-clamp-2">{product.name}</h3>
      <p className="text-lg font-bold text-primary-600">${product.price}</p>
    </div>
  );
};

export default ProductLayoutInList;