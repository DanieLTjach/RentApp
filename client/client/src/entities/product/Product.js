import React, { Component } from 'react';
import Header from '../../entities/header/Header';
import Footer from '../../entities/footer/Footer';
import { Link } from 'react-router-dom';
import cardCollections from '../../assets/cardCollections.js';
import withRouter from "../../withRouter.js";
import './product.css';

class Product extends Component {

    handleRedirectToCatalog = () => {
        this.props.router.navigate('/catalog');
    };

    render() {
        return (
            <div className="wrapper">
                <main className="page">

                    <Header />

                    <section id="section1" className="section-main">
                        <div className="section-main_container">
                            <div className="section-main_background">
                                <img src="img/img-catalog/section1/Background.png" alt="background" />
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
                                    <img src="img/img-catalog/section2/image1.png" alt="Main Product Image" />
                                </div>
                                <div className="product-thumbnails">
                                    <img src="img/img-catalog/section2/image2.png" alt="img" />
                                    <img src="img/img-catalog/section2/image3.png" alt="img" />
                                    <img src="img/img-catalog/section2/image4.png" alt="img" />
                                </div>
                            </div>
                            <div className="product_details">
                                <div className="product_details_title">
                                    <h2>Product template</h2>
                                    <p className="product_details_price">$1,500,000</p>
                                </div>
                                <p className="product_details_description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit nobis, quis atque laudantium fugiat iusto illum asperiores expedita, molestiae inventore perspiciatis accusantium aut enim veritatis eum dolor consectetur sapiente!
                                </p>
                                <ul className="product_details_ul">
                                    <li className="product_details_li">Lorem ipsum dolor sit amet,</li>
                                    <li className="product_details_li">Lorem ipsum dolor sit amet,</li>
                                    <li className="product_details_li">Lorem ipsum dolor sit amet,</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="section3" className="section-person">
                        <div className="section-person_container">
                            <div className="section-person_menu">
                                <div className="person_menu-item">Description</div>
                                <div className="person_menu-item">Details</div>
                                <div className="person_menu-item">Reviews(0)</div>
                            </div>
                            <div className="section-person_details">
                                <div className="person_details-img">
                                    <img src="img/img-catalog/section3/avatar.png" alt="avatar" />
                                </div>
                                <div className="person_details-content">
                                    <div className="details-content_title">James William Anderson</div>
                                    <div className="details-content_info">
                                        <div className="content_info-grade">
                                            <div className="img-star">
                                                <img src="img/img-catalog/section3/Star.svg" alt="icon" />
                                            </div>
                                            <div className="content_info-grade_text content_info-grade-person">4.5</div>
                                        </div>
                                        <div className="content_info-line">
                                            <p className="content_info-line">|</p>
                                        </div>
                                        <div className="content_info-year">10 years on the platform</div>
                                    </div>
                                    <div className="details-content_contacts">
                                        <ul className="content_contacts-ul">
                                            <li className="content_contacts-li">+380956650184</li>
                                            <li className="content_contacts-li">+380952478401</li>
                                            <li className="content_contacts-li">james.will@gmail.com</li>
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