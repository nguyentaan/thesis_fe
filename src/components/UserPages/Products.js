import React, { useEffect, useState } from "react";
import "../Users.css";
import { getAllProducts, getProductsByCategory } from "../../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailModal from "./ProductDetailModal";
import RatingDisplay from "./RatingDisplay";
import Loader from "./Loader";

const Products = ({ searchQuery, category }) => {
  const dispatch = useDispatch();
  const { dataProduct, isProductLoading } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const limit = 15;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModel, setShowDetailModel] = useState(false);  
  // Reset dataProduct when category changes
  useEffect(() => {
    setPage(1); // Reset to page 1 when category changes
  }, [category]);

  useEffect(() => {
    // Check if category is 'all' or not
    if (category === "All") {
      // Fetch all products and filter by search query
      dispatch(getAllProducts({ page, limit, search: searchQuery }));
    } else if (category) {
      // Fetch products based on the selected category, and apply the search query
      dispatch(
        getProductsByCategory({ category, page, limit, search: searchQuery })
      );
    } else {
      // Fetch all products and filter by search query if no category is selected
      dispatch(getAllProducts({ page, limit, search: searchQuery }));
    }
  }, [searchQuery, dispatch, page, category]); // Dependency array triggers the effect when these values change

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModel(true);
  };

  const closeProductDetail = () => {
    setShowDetailModel(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ fontFamily: "Karla, sans-serif" }}>
      <Loader isProductLoading={isProductLoading} />
      {/* Render product list only if modal is not visible */}
      {!showDetailModel && !isProductLoading && (
        <div className="row">
          {dataProduct &&
          dataProduct.products &&
          dataProduct.products.length > 0 ? (
            dataProduct.products.map((product, index) => (
              <div key={`${product._id}-${index}`} className="col-md-4 mt-4">
                <div className="card">
                  <div
                    className="product-showdetail"
                    onClick={() => openProductDetail(product)}
                  >
                    <div className="card-img-top">
                      <img
                        src={product.image_url || "placeholder.jpg"}
                        className="card-img-top"
                        alt={product.name || "Product Image"}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                      />
                      <h3 className="text-success-s2 font-weight-bold">
                        SEE DETAIL
                      </h3>
                    </div>
                    <div className="card-body">
                      <p className="font-weight-bold my-0 product-title">
                        {product.name || "Unknown Product"}
                      </p>
                      <br />
                      <div className="d-flex d-row mt-4">
                        <p className="my-0 text-success-s2 font-weight-bold">
                          ${product.price || "N/A"}
                        </p>
                        <RatingDisplay rating={product.avg_rating || 0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {/* Load More button logic */}
      {!isProductLoading &&
        dataProduct.products &&
        dataProduct.products.length < dataProduct.total && (
          <div className="btn-wrapper">
            <button
              className="btn-loadmore"
              onClick={loadMoreProducts}
              disabled={isProductLoading}
            >
              Load More
            </button>
          </div>
        )}

      {/* Product Detail Modal */}
      {showDetailModel && (
        <ProductDetailModal
          selectedProduct={selectedProduct}
          showDetailModel={showDetailModel}
          unDisplayDetailModal={closeProductDetail}
        />
      )}
    </div>
  );
};

export default Products;
