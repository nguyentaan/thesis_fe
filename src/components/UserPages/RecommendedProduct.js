import { useDispatch, useSelector } from "react-redux";
import { getRecommendProducts } from "../../Slices/UserSlice";
import React, { useEffect } from "react";
import ProductsRender from "./ProductsRender";
import Loader from "./Loader";

const RecommendedProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get the logged-in user

  // Check if user exists before accessing user._id
  const user_id = user?._id;

  const { recommendedProducts, isProductLoading } = useSelector(
    (state) => state.user
  );

  // Fetch recommendations on component mount
  useEffect(() => {
    const payload = { user_id: user_id || "" }; // Send "" if user_id is undefined or null
    console.log(payload);
    
    dispatch(getRecommendProducts(payload));
  }, [dispatch, user_id]);

  // if (!user) {
  //   return <p>Please log in to see personalized recommendations.</p>;
  // }

  return (
    <div>
      {/* Show the loader if products are loading */}
      <Loader isProductLoading={isProductLoading} />

      {/* Render products if not loading */}
      {!isProductLoading && (
        <ProductsRender
          dataProduct={{
            products: recommendedProducts, // Use the recommended products
            total: recommendedProducts.length,
          }}
          isProductLoading={isProductLoading}
        />
      )}
    </div>
  );
};

export default RecommendedProduct;
