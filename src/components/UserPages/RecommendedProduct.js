import { useDispatch, useSelector } from "react-redux";
import { getRecommendProducts } from "../../Slices/UserSlice";
import React, { useEffect } from "react";
import ProductsRender from "./ProductsRender";
import Loader from "./Loader";

const RecommendedProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get the logged-in user
  const user_id = user._id;

  const { recommendedProducts, isProductLoading } = useSelector(
    (state) => state.user
  );

  // Fetch recommendations on component mount
  useEffect(() => {
    if (user_id) {
      dispatch(getRecommendProducts({ user_id }));
    }
  }, [dispatch, user_id]);

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
