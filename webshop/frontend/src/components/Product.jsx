import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

const ITEM_STATUS = {
  SALE: "SALE",
  SOLD: "SOLD",
};

const Product = ({
  id,
  title,
  description,
  price,
  created_at,
  status,
  purchased_by,
  created_by,
  page,
}) => {
  const navigate = useNavigate();
  const { user, cartProductsIds, addToCartHandler, removeFromCartHandler } =
    useContext(UserContext);

  return (
    <div
      class="card"
      onClick={() => {
        if (page === "inventory") {
          navigate(`/myproducts/add-product/${id}`);
        }
      }}
    >
      <div class="card-header d-flex justify-content-between">
        {status === ITEM_STATUS.SALE ? (
          <span>ON SALE</span>
        ) : status === ITEM_STATUS.SOLD ? (
          <span>SOLD</span>
        ) : null}
        {!purchased_by?.id ? null : (
          <span>Purchased by {purchased_by?.username}</span>
        )}
        {!!purchased_by?.id ||
        user?.user_id === created_by ? null : !cartProductsIds?.includes(id) ? (
          <button
            className="btn btn-primary"
            onClick={() => addToCartHandler({ productId: id })}
          >
            Add to cart
          </button>
        ) : (
          <div>
            <p style={{color:'lightGreen'}}>Item added in the cart.</p>
            <button
            className="btn btn-danger"
            onClick={() => removeFromCartHandler({ productId: id })}
          >
            Remove from cart
          </button>
            </div>

        )}
      </div>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        <p class="price text-primary">€{price}</p>
        <p class="text-secondary">
          {" "}
          {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Product;
