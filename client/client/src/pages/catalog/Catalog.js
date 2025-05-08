import React from 'react';
import Header from "../../entities/header/Header";
import Footer from "../../entities/footer/Footer";
import { Link } from "react-router-dom";
import cardCollections from '../../assets/cardCollections.js';
import './catalog.css';


class Catalog extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            price: '',
            description: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addAppartment = async () => {
        const { name, phone, price, description } = this.state;

        try {
            const response = await fetch('http://176.37.99.189:49002/api/catalog/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    landlord_number: 1,
                    landlord_id: 3,
                    name,
                    phone,
                    price,
                    description,
                    img: 'sdsd'
                })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    render() {
        return (
            <div className="catalog-page">
                <Header />
                <div className="catalog-content">
                    <h1>Catalog</h1>
                    <div className="section-collection_cards">
                        {
                            cardCollections.map((item, index) => (
                                <Link to="/product" key={index}>
                                    <div className="section-collection_card">
                                        <div className="collection_card-img">
                                            <img src={item.img} alt="img" />
                                            <div className="collection_card-img_heart">
                                                <img src="img/ section5/heart.svg" alt="icon" />
                                            </div>
                                        </div>
                                        <div className="collection_card-content">
                                            <div className="card-content_title">{item.title}</div>
                                            <div className="card-content_info">
                                                <div className="content_info-grade">
                                                    <div className="content_info-grade_img">
                                                        <img src="img/ section5/Star.svg" alt="icon" />
                                                    </div>
                                                    <div className="content_info-grade_text">{item.grade}</div>
                                                </div>
                                                <div className="content_info-line">
                                                    <img src="img/ section5/Line-vertical.svg" alt="line" />
                                                </div>
                                                <div className="content_info-category">{item.category}</div>
                                            </div>
                                            <div className="card-content_price">{item.price}</div>
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