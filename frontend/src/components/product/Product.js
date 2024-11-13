import { Link } from 'react-router-dom';

export default function Product ({product, col}) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
        <div className="card product-card p-3 rounded shadow-sm">
          {product.images.length > 0 && (
            <img
              className="card-img-top mx-auto product-image"
              src={product.images[0].image}
              alt={product.name}
            />
          )}
          <div className="card-body d-flex flex-column text-center">
            <h5 className="card-title product-title mt-2">
              <Link to={`/product/${product._id}`} className="product-link">
                {product.name}
              </Link>
            </h5>
            <div className="ratings mt-2">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2" id="no_of_reviews">
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <p className="card-text product-price mt-3">${product.price}</p>
            <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-primary btn-view-details rounded-pill mt-auto"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      
    )
}