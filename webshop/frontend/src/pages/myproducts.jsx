import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductProduct from "../components/Product";
import api from "../utils/api";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { created_by: "me", purchased_by: "me" },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div className="py-4">
        <Link className="btn btn-primary" to="/myitems/add-product">
          Add product
        </Link>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4">
            <ProductProduct key={index} {...product} page="inventory" />
          </div>
        ))}
      </div>
    </div>
  );
}
