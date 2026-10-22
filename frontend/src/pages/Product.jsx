import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Fetch product
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || "");
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Left: Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border rounded ${
                  item === image ? "border-orange-500" : "border-gray-200"
                }`}
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="w-full h-auto max-h-[550px] object-cover rounded"
              alt={productData.name}
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-500">(122 reviews)</p>
          </div>

          <p className="my-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-sm">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded text-sm transition-all ${
                    item === size
                      ? "border-orange-500 bg-orange-50 font-medium"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 rounded transition"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-200" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✓ 100% Original product guaranteed.</p>
            <p>✓ Cash on Delivery is available on this product.</p>
            <p>✓ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm border-b-0 bg-white">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500 bg-gray-50">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 bg-white leading-relaxed">
          <p>
            NexMart brings you the latest high quality fashion, hand-picked for style,
            durability, and superior comfort.
          </p>
          <p>
            {productData.description}
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;