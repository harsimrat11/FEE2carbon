import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);

    const relatedProducts = items.filter((suman) => suman.category === filterProduct[0].category && suman.id !== filterProduct[0].id);
    setRelatedProducts(relatedProducts);
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc, detailedDescription) => {
    const obj = { id, price, title, description, imgSrc, detailedDescription };
    setCart([...cart, obj]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleRelatedProductClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <p className="card-text">{product.detailedDescription}</p>

          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc,
                product.detailedDescription
              )
            }
            className="btn btn-warning"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <div className="container my-5">
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="col-lg-4 col-md-6 my-3 text-center">
              <div className="card" style={{ width: "18rem" }}>
                <Link to={`/product/${relatedProduct.id}`} onClick={handleRelatedProductClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={relatedProduct.imgSrc} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.title}</h5>
                  <p className="card-text">{relatedProduct.description}</p>
                  <button className="btn btn-primary mx-3">{relatedProduct.price} ₹</button>
                  <button
                    onClick={() => addToCart(relatedProduct.id, relatedProduct.price, relatedProduct.title, relatedProduct.description, relatedProduct.imgSrc, relatedProduct.detailedDescription)}
                    className="btn btn-warning"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
