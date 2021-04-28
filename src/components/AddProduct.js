import React, { useState } from "react";
import ProductDataService from "../services/ProductService";

const AddProduct = () => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [Product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false)
  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...Product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: Product.title,
      job: Product.description
    };
    if (Product.title && Product.description) {
      ProductDataService.create(data)
        .then(response => {
          setProduct({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      setError(true)
    }
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required={true}
              value={Product.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          {error === true && <div className="mb-2 text-danger font-weight-bold">please fill the form</div>}
          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
