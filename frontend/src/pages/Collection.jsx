import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showfilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
  };

  const applyFilter = () => {
    let productsCopy = Array.isArray(products) ? products.slice() : [];

    // Search filter
    if (showSearch && search) {
      const q = search.trim().toLowerCase();
      productsCopy = productsCopy.filter((item) =>
        item.name?.toLowerCase().includes(q)
      );
    }

    // Category filter (Men / Women / Kids)
    if (category.length > 0) {
      const selectedCats = category.map((c) => c.toLowerCase());
      productsCopy = productsCopy.filter((item) =>
        item.category && selectedCats.includes(item.category.trim().toLowerCase())
      );
    }

    // SubCategory filter (Topwear / Bottomwear / Winterwear)
    if (subCategory.length > 0) {
      const selectedSubCats = subCategory.map((sc) => sc.toLowerCase());
      productsCopy = productsCopy.filter((item) =>
        item.subCategory && selectedSubCats.includes(item.subCategory.trim().toLowerCase())
      );
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "high-low":
        productsCopy.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType]);

  const hasActiveFilters = category.length > 0 || subCategory.length > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <div className="flex items-center justify-between sm:block mb-3">
          <p
            onClick={() => setShowFilters(!showfilters)}
            className="text-gray-700 text-sm font-semibold cursor-pointer flex items-center gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transition-transform duration-200 ${showfilters ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 ${showfilters ? "" : "hidden"} sm:block rounded-sm`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer hover:text-black select-none"
              >
                <input
                  className="w-3.5 h-3.5 cursor-pointer accent-black"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showfilters ? "" : "hidden"} sm:block rounded-sm`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer hover:text-black select-none"
              >
                <input
                  className="w-3.5 h-3.5 cursor-pointer accent-black"
                  type="checkbox"
                  value={type}
                  checked={subCategory.includes(type)}
                  onChange={toggleSubCategory}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections "} />

          {/* Product Sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded cursor-pointer outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price - Low to High</option>
            <option value="high-low">Sort by: Price - High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No products found matching the selected filters.</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
