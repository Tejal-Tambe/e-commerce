import React from 'react';
import "../css/Product.css";

export default function Products({ products }) {

    return (
        <div className="container-fluid">
            <div className="row g-4">
                {products?.map((product) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                        <div className="product-card border rounded shadow-sm p-3 bg-white">
                            <div className="product-image-container mb-3">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="img-fluid product-image"
                                    style={{
                                        objectFit: 'contain',  
                                        height: '200px',       
                                    }}
                                />
                            </div>
                            <div className="product-details">
                                <div className="product-title">
                                    <span className="font-weight-bold d-block text-truncate">{product.title}</span>
                                </div>
                                <div className="product-price mb-2">
                                    <span className="text-dark font-weight-bold">${product.price}</span>
                                </div>
                                <div className="product-category text-muted">
                                    <span>{product.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
