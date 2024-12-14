import React, { useState } from "react";
import "../Users.css";
import ProductDetailModal from "./ProductDetailModal";
import Loader from "./Loader";
import RatingDisplay from "./RatingDisplay";

const ProductsRender = ({ dataProduct, isProductLoading }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModel, setShowDetailModel] = useState(false);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModel(true);
  };

  const closeProductDetail = () => {
    setShowDetailModel(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ fontFamily: "Karla,sans-serif" }}>
      {isProductLoading && <Loader />}
      {/* Render product list only if modal is not visible */}
      {!showDetailModel && !isProductLoading && (
        <div className="row">
          {dataProduct &&
          dataProduct.products &&
          dataProduct.products.length > 0 ? (
            dataProduct.products.map((product) => (
              <div key={product._id} className="col-md-4 mt-4">
                <div className="card">
                  <div
                    className="product-showdetail"
                    onClick={() => openProductDetail(product)}
                  >
                    <div className="card-img-top">
                      <img
                        src={product.images[0]}
                        className="card-img-top"
                        alt={product.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                      <h3 className="text-success-s2 font-weight-bold">
                        SEE DETAIL
                      </h3>
                    </div>
                    <div className="card-body">
                      <p className="font-weight-bold my-0 product-title">
                        {product.name}
                      </p>
                      <br />
                      <div className="d-flex d-row mt-4">
                        <p className="my-0 text-success-s2 font-weight-bold">
                          ${product.price}
                        </p>
                        <RatingDisplay rating={product.avg_rating} />
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

      {isProductLoading && <p>Loading more products...</p>}

      {dataProduct &&
        dataProduct.products &&
        dataProduct.products.length < dataProduct.total && (
          <div className="btn-wrapper">
            <button
              className="btn-loadmore"
              // The load more functionality should be implemented by the parent component
              onClick={() =>
                console.log(
                  "Load more products functionality should be handled in parent"
                )
              }
              disabled={isProductLoading}
            >
              Load More
            </button>
          </div>
        )}

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

export default ProductsRender;
