import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import api from "./api";

const UserContext = createContext();

export default UserContext;

const HOME_URL = "/shop";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartProducts, setCartProducts] = useState([]);

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async ({ username, password }) => {
    const response = await fetch("http://localhost:8080/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      let data = await response.json();

      if (data) {
        localStorage.setItem("authTokens", JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        navigate(HOME_URL);
      }
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setAuthTokens(null);
    setUser(null);

    navigate("/login");
  };

  const registerUser = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) return;

    try {
      await api.post("/register", { email, username, password });
      loginUser({ username, password });
    } catch (err) {
      console.log({ err });
    }
  };

  const getCartProducts = async () => {
    try {
      const cartProducts = await api.get("/cart");
      setCartProducts(cartProducts.data || []);
    } catch (error) {}
  };

  const addToCartHandler = async ({ productId }) => {
    if (!user) {
      navigate("/login");
      return;
    }

    await api.post("/cart/add", { product_id: productId });
    await getCartProducts();
  };

  const removeFromCartHandler = async ({ productId }) => {
    await api.post("/cart/remove", { product_id: productId });
    await getCartProducts();
  };

  useEffect(() => {
    getCartProducts();
  }, [location]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    cartProducts: cartProducts,
    cartProductsIds: cartProducts?.map((cart) => cart?.product?.id),
    addToCartHandler,
    removeFromCartHandler,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
