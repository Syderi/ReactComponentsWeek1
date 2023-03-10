// import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { Component } from 'react';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchTerm: props.searchTerm,
            isLoading: true,
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=12');
            const resProducts = await response.json();
            const products = resProducts.products;
            this.setState({ products, isLoading: false });
        }
        catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ isLoading: false });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({ searchTerm: this.props.searchTerm });
        }
    }
    render() {
        const { products, searchTerm, isLoading } = this.state;
        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return (React.createElement(React.Fragment, null,
            React.createElement("h3", null, "Home page"),
            isLoading ? (React.createElement("p", null, "Loading...")) : (React.createElement("div", { className: "product-cards-container" }, filteredProducts.length ? (filteredProducts.map((product) => React.createElement(ProductCard, { product: product, key: product.id }))) : (React.createElement("p", null, "No found product ..."))))));
    }
}
export default Home;
