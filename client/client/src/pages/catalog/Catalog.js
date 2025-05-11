import React from 'react';
import Header from "../../entities/header/Header";
import Footer from "../../entities/footer/Footer";
import { Link } from "react-router-dom";
import getCardCollections from '../../assets/getCardCollections.js';
import './catalog.css';


class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardCollections: []
        };
    }

    async componentDidMount() {
        const data = await getCardCollections();
        this.setState({ cardCollections: data });
    }

    render() {

        const { cardCollections } = this.state;

        if (cardCollections.length === 0) {
            return (
                <div className="catalog-page">
                    <Header />
                    <div className="catalog-content">
                        <h1>Catalog</h1>
                        <div className="section-collection_cards">
                            <p>Loading...</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div className="catalog-page">
                <Header />
                <div className="catalog-content">
                    <h1>Catalog</h1>
                    <div className="section-collection_cards">
                        {
                            cardCollections.map((item, index) => (
                                <Link to={`/product/${item.id}`} key={index}>
                                    <div className="section-collection_card">
                                        <div className="collection_card-img">
                                            <img src={item.img} alt="img" />
                                            <div className="collection_card-img_heart">
                                                <img src="img/ section5/heart.svg" alt="icon" />
                                            </div>
                                        </div>
                                        <div className="collection_card-content">
                                            <div className="card-content_title">{item.title}</div>
                                            <div className="card-content_top-row">
                                                <div className="content_info-phone">{item.phone}</div>
                                                <div className="card-content_price">{item.price}</div>
                                            </div>
                                            <div className="content_info-description">{item.description}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Catalog;