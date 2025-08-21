import ProductLayoutInList from "../Components/ProductLayoutInList";
import "../css/ProductList.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ products }) => {

  const navigate = useNavigate();


  return (
    <div>
      <Header />
      <div className="ProductTable">
        <table>
          <thead></thead>
          <tbody className="productlistContainer">
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="listitem" onClick={() => navigate(`/products/${product.id}`)}>
                      <ProductLayoutInList product={product} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
