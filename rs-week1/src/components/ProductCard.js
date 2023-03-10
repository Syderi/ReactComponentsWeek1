import React, { Component } from 'react';
import './ProductCard.css';
class ProductCard extends Component {
    render() {
        const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, } = this.props.product;
        const discountedPrice = price - (price * discountPercentage) / 100;
        return (React.createElement("div", { className: "product-card", id: `product-card${id}` },
            React.createElement("div", { className: "product-card__image" },
                React.createElement("img", { src: thumbnail, alt: title })),
            React.createElement("div", { className: "product-card__info" },
                React.createElement("h2", null, title),
                React.createElement("p", null, description),
                React.createElement("p", null,
                    "Price: $",
                    discountedPrice),
                React.createElement("p", null,
                    "Rating: ",
                    rating),
                React.createElement("p", null,
                    "Stock: ",
                    stock),
                React.createElement("p", null,
                    "Brand: ",
                    brand),
                React.createElement("p", null,
                    "Category: ",
                    category),
                React.createElement("button", null, "Add to cart"))));
    }
}
export default ProductCard;
