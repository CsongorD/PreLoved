import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewProductForm from "../Components/NewProductForm";
import Loading from "./Loading/Loading";
import Footer from "../Components/Footer";
import { fetchWithToken } from "../Context/ClientContext";

const createProduct = (product) => {
  return fetchWithToken("POST", localStorage.getItem("Token"), "/products", product);
};

const NewProductCreator = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleCreateProduct = (product) => {
    setLoading(true);

    createProduct(product)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <NewProductForm
        onCancel={() => navigate("/")}
        onSave={handleCreateProduct}
      />
      <Footer />
    </div>
  );
};

export default NewProductCreator;
