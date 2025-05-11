import React, { Component } from 'react';
import Header from '../../entities/header/Header';
import Footer from '../../entities/footer/Footer';
import { Link } from 'react-router-dom';
import getCardCollections from '../../assets/getCardCollections.js';
import withRouter from "../../withRouter.js";
import './product.css';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardCollections: [],
            currentProduct: null,
            profile: null
        };
    }

    getProfileData = async (landlordId) => {
        try {
            const response = await fetch(`http://localhost:49001/api/users/get/${landlordId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    async componentDidMount() {
        const data = await getCardCollections();
        const { id } = this.props.router.params;

        const currentProduct = data.find(item => item.id.toString() === id);
        if (!currentProduct) {
            return;
        }
        const profile = await this.getProfileData(currentProduct.id);

        this.setState({ cardCollections: data, currentProduct, profile });
    }


    handleRedirectToCatalog = () => {
        this.props.router.navigate('/catalog');
    };

    render() {

        const { cardCollections, currentProduct, profile } = this.state;

        if (!currentProduct) {
            return <div className="loading">Loading product...</div>;
        }

        return (
            <div className="wrapper">
                <main className="page">

                    <Header />

                    <section id="section1" className="section-main">
                        <div className="section-main_container">
                            <div className="section-main_background">
                                <img src="/img/img-catalog/section1/Background.png" alt="background" />
                            </div>
                            <div className="section-main_content">
                                <h2 className="main_content-title">Catalog</h2>
                                <p className="main_content-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                            </div>
                        </div>
                    </section>

                    <section id="section2" className="section-product">
                        <div className="section-product_container">
                            <div className="section-product_block-img">
                                <div className="product-image-main">
                                    <img src={currentProduct.img} alt="Main Product Image" />
                                </div>
                                <div className="product-thumbnails">
                                    <img src={currentProduct.img} alt="img" />
                                    <img src={currentProduct.img} alt="img" />
                                    <img src={currentProduct.img} alt="img" />
                                </div>
                            </div>
                            <div className="product_details">
                                <div className="product_details_title">
                                    <h2>{currentProduct.title}</h2>
                                    <p className="product_details_price">{currentProduct.price}</p>
                                </div>
                                <p className="product_details_description">
                                    {currentProduct.description}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="section3" className="section-person">
                        <div className="section-person_container">
                            <div className="section-person_details">
                                <div className="person_details-img">
                                    <img src="/img/img-catalog/section3/avatar.png" alt="avatar" />
                                </div>
                                <div className="person_details-content">
                                    <div className="details-content_title">{profile ? profile.username : 'Загрузка...'}</div>
                                    <div className="details-content_contacts">
                                        <ul className="content_contacts-ul">
                                            <li className="content_contacts-li">{currentProduct.phone}</li>
                                            <li className="content_contacts-li">{profile ? profile.email : 'Загрузка...'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="section4" className="section-collection">
                        <div className="section-collection_container">
                            <div className="section-collection_cards">
                                {
                                    cardCollections
                                    .filter(item => item.id !== currentProduct.id)
                                    .map((item, index) => (
                                        <Link to={`/product/${item.id}`} key={index}>
                                            <div className="section-collection_card">
                                                <div className="collection_card-img">
                                                    <img src={item.img} alt="img" />
                                                    <div className="collection_card-img_heart">
                                                        <img src="/img/%20section5/heart.svg" alt="icon" />
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
                            <button className="section-collection_button" onClick={this.handleRedirectToCatalog}>MORE PRODUCTS</button>
                        </div>
                    </section>

                    <Footer />
                </main>
            </div>
        );
    }
}

export default withRouter(Product);