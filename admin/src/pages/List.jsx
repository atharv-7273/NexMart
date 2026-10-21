import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const backendUrl = "http://localhost:4000";

  const [list, setList] = useState([]);

  // ================= FETCH PRODUCTS =================

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  // ================= REMOVE PRODUCT =================

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full">
      <p className="mb-4 text-lg font-semibold">All Products List</p>

      {/* ================= TABLE HEADER ================= */}

      <div className="hidden md:grid grid-cols-[0.7fr_2fr_1fr_1fr_0.5fr] items-center py-3 px-4 border bg-gray-100 text-sm font-medium">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* ================= PRODUCT LIST ================= */}

      <div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.7fr_2fr_1fr_1fr_0.5fr] items-center gap-2 py-2 px-4 border text-sm"
          >
            {/* IMAGE */}

            <img className="w-16" src={item.image[0]} alt="" />

            {/* NAME */}

            <p>{item.name}</p>

            {/* CATEGORY */}

            <p>{item.category}</p>

            {/* PRICE */}

            <p>${item.price}</p>

            {/* REMOVE */}

            <p
              onClick={() => removeProduct(item._id)}
              className="text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
