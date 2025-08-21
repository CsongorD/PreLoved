import "../css/ProductList.css";

const ProductLayoutInList = ({ product }) => {
  return (
    <div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
      </style>
      <p>{product.name} </p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductLayoutInList;
