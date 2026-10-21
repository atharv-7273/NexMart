import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size,setSize] = useState('');

  // Fetch product
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    setProductData(foundProduct);
  }, [productId, products]);

  // Set default image
  useEffect(() => {
    if (productData) {
      setImage(productData.image[0]);
    }
  }, [productData]);

  if (!productData) {
    return <div className="opacity-0">Loading...</div>;
  }

  return (
    <div className="border-t pt-10 transition-opacity duration-500">

      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-8">

        {/* LEFT: thumbnails */}
        <div className="flex sm:flex-col gap-3 sm:w-[20%] overflow-x-auto sm:overflow-y-auto">
          {productData.image.map((item, index) => (
            <img
              key={index}
              src={item}
              onClick={() => setImage(item)}
              className="w-[24%] sm:w-full cursor-pointer border hover:border-black"
              alt=""
            />
          ))}
        </div>

        {/* RIGHT: main image */}
        <div className="sm:w-[80%] w-full">
          <img src={image} className="w-full h-auto" alt="" />
        </div>

        {/*-------- product Info --------- */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
            
          </div>
          <p className="my-5 text-3xl font-medium">{currency}{productData.price}</p>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index) => (
                <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : '' }`} key={index}> {item} </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)}   className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p> 100% Original product.</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy in 7 days</p>

          </div>
        </div>
      </div>
      {/* Description and Review Section */}

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>A E-Commerce is the online website for Buy and Sell the Products</p>
          <p>Premium quality fabric designed for comfort and style. Perfect for everyday wear with a modern fit and durable stitching.</p>

        </div>
      </div>

      {/*-------- Display Related products  -----------*/}
      <RelatedProducts 
        category={productData.category} 
        subCategory={productData.      subCategory} 
      />

    </div>
  );
};

export default Product;