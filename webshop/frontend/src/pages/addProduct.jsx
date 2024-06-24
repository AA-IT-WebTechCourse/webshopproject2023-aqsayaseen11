import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function AddProduct() {
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  let { productId } = useParams();

  const productFormSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = e.target.price.value;

    if (!title && !description && !price) return;

    if (productId) {
      await api.patch("/products", {
        id: productId,
        title,
        price,
        description,
      });
    } else {
      await api.post("/products", { title, price, description });
    }
    navigate("/myitems");
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  return (
    <div className="container d-flex justify-content-center align-products-center vh-100">
      <div className="card">
        <div className="card-header">Add new product to inventory</div>
        <form onSubmit={productFormSubmitHandler} className="p-4">
          <div className="mb-4">
            <input
              name="title"
              type="text"
              placeholder="Title"
              defaultValue={product.title}
              className="form-control"
            />
          </div>
          <div className="mb-6">
            <textarea
              name="description"
              min={5}
              max={5}
              placeholder="Description"
              defaultValue={product.description}
              className="form-control"
            />
          </div>
          <div className="mb-6">
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              defaultValue={product.price}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-100">
            {!!product?.id ? "UPDATE EXISTING ITEM" : "ADD NEW ITEM"}
          </button>
          <div className="mt-4">
            <Link to="/myitems" className="login-link">
              Go back to my products
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
