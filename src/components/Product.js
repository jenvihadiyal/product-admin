import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";

const Product = props => {
  const initialProductState = {
    id: null,
    first_name: "",
    email: "",
    published: false
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {

    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };


  const updateProduct = () => {
    let data = {
      name: currentProduct.first_name,
      job: currentProduct.email
    }
    ProductDataService.update(currentProduct.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The Product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/product");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      { currentProduct ? (
        <div className="edit-form">
          <h4>Inventory</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                defaultValue={currentProduct?.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                defaultValue={currentProduct?.email}
                onChange={handleInputChange}
              />
            </div>


          </form>



          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;
