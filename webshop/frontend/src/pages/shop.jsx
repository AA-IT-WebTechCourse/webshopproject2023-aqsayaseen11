import React, { useEffect, useState } from "react";
import ProductProduct from "../components/Product";

import api from "../utils/api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { title: search },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getProducts();
  }, [search]);

  return (
    <>
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          class="form-control"
        />
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4">
            <ProductProduct key={product.id} {...product} />
          </div>
        ))}
      </div>
    </>
  );
}
