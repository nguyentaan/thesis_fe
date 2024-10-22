import React, { useEffect, useState } from "react";
import "../Users.css";
import { getAllProducts } from "../../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const { dataProduct, isProductLoading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const limit = 15;

  useEffect(() => {
    // Fetch the products when the component mounts or page changes
    dispatch(getAllProducts({ page, limit }));
  }, [dispatch, page]);

  // Handler to load more products
  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  return (
    <div style={{ fontFamily: "Karla,sans-serif" }}>
      <div className="row">
        {/* Check if dataProduct is an object and has products array */}
        {dataProduct &&
        dataProduct.products &&
        dataProduct.products.length > 0 ? (
          dataProduct.products.map((product) => (
            <div key={product._id} className="col-md-4 mt-4">
              <div className="card">
                <div className="product-showdetail">
                  <div className="card-img-top">
                    <img
                      src={product.images[0]} // Display the first image of the product
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
                      <button className="btn btn-outline-success d-flex d-row ml-auto">
                        <i className="fas fa-cart-plus align-self-center mr-2 fa-sm" />
                        <small className="font-weight-bold">Cart</small>
                      </button>
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

      {/* Show loading message if products are being fetched */}
      {isProductLoading && <p>Loading more products...</p>}

      {/* Button to load more products only if more products are available */}
      {!isProductLoading &&
        dataProduct.products &&
        dataProduct.products.length < dataProduct.total && (
          <div className="btn-wrapper">
            <button className="btn-loadmore" onClick={loadMoreProducts} disabled={isProductLoading}>
              Load More
            </button>
          </div>
        )}
    </div>
  );
};

export default Products;
