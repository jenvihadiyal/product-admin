import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const ProductsList = () => {
  const [Products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activePage, setActivePage] = useState(1)
  useEffect(() => {
    retrieveProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    console.log("hi pageNumber", pageNumber)

    setActivePage(pageNumber)
  };

  useEffect(() => {
    retrieveProducts()
  }, [activePage])

  const retrieveProducts = () => {
    ProductDataService.getAll(activePage)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (Product, index) => {
    setCurrentProduct(Product);
    setCurrentIndex(index);
  };

  const removeAllProducts = () => {
    ProductDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="list row">

      <div className="col-md-6">
        <h4>Inventory List</h4>
        <ul className="list-group">
          {Products &&
            Products.data?.map((Product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(Product, index)}
                key={index}
              >
                {Product.first_name}
              </li>
            ))}
        </ul>
        <div className="mt-3">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={2}
            onChange={handlePageChange}
          /></div>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProducts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Inventory </h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentProduct.first_name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProduct.email}
            </div>


            <Link
              to={"/product/" + currentProduct.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Inventory List...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
