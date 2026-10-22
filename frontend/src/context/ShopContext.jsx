import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { products as initialProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ================= GET PRODUCTS =================

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success && response.data.products?.length > 0) {
        setProducts(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Backend offline or error fetching products, using local assets data:", error);
    }
  };

  // ================= GET USER CART =================

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (itemId, size) => {
    if (!size) {
      alert("Select Product Size");

      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};

      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  // ================= CART COUNT =================

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalCount;
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= TOTAL AMOUNT =================

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      await getProductsData();

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);

        await getUserCart(storedToken);
      }
    }

    loadData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,

    backendUrl,

    token,
    setToken,

    navigate,

    cartItems,
    setCartItems,

    addToCart,
    updateQuantity,

    getCartCount,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
