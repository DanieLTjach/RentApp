import { React, Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Catalog from './pages/catalog/Catalog';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Product from "./entities/product/Product";
import Profile from './pages/profile/Profile';
import Header from './entities/header/Header';
import Footer from './entities/footer/Footer';
import AddApartment from './pages/addApartment/AddApartment';
import getCardCollections from './assets/getCardCollections.js';

import './reset.css';
import './index.css';

class App extends Component {

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

  handleRedirectToCatalog = () => {
    this.props.router.navigate('/catalog');
  };


  render() {
    const { cardCollections } = this.state;
    const { location } = this.props.router;
    const isMainPage = location.pathname === '/';

    return (
      <div className="wrapper">
        {isMainPage && <Header />}
        <main className="page">
          {isMainPage && (
            <>
              <section id="section1" className="section-main">
                <div className="section-main_container">
                  <div className="section-main_banner">
                    <h2 className="section-main_title">Cozy & Modern Apartment</h2>
                    <p className="section-main_text">
                      Looking for a cozy home in a great location? Our stylish and modern apartments are ready for move-in!
                      Fully furnished, featuring panoramic windows and all necessary amenities. Conveniently located near public transport and shopping centers.
                    </p>
                    <a href="#section1">
                      <button className="section-main_button">LEARN MORE</button>
                    </a>
                  </div>
                </div>
                <div className="section-main_background">
                  <img src="img/ section1/Main.png" alt="Apartment" className="banner-bg" />
                </div>
              </section>

              <section id="section2" className="section-listings">
                <div className="section-listings_container">
                  <div className="section-listings_header">
                    <h2 className="listings-header_title">Our Listings</h2>
                    <div className="listings-header_line">
                      <img src="img/ section2/line.svg" alt="line" />
                    </div>
                    <p className="listings-header_text">We offer a wide selection of rental properties—from cozy studios to spacious suburban homes. Find the perfect place that suits your needs!</p>
                  </div>
                  <div className="section-listings_items">
                    <div className="listings_items-item">
                      <img src="img/ section2/Img1.png" alt="img" />
                    </div>
                    <div className="listings_items-item">
                      <img src="img/ section2/Img2.png" alt="img" />
                    </div>
                    <div className="listings_items-item">
                      <img src="img/ section2/Img3.png" alt="img" />
                    </div>
                  </div>
                </div>
              </section>

              <section id="section3" className="section-choice">
                <div className="section-choice_container">
                  <div className="section-choice_content">
                    <h2 className="section-choice_title">Why Choose Us?</h2>
                    <p className="section-choice_text">
                      We help you find the ideal rental home that fits your budget and lifestyle. Flexible terms, transparent agreements,
                      and comfortable apartments are waiting for you!
                    </p>
                    <a href="#section1" className="section-choice_btn">
                      <button>LEARN MORE</button>
                    </a>
                  </div>
                  <div className="section-choice_image">
                    <img src="img/ section3/Img1.png" alt="Why Choose Us" />
                  </div>
                </div>
              </section>

              <section id="section4" className="section-find">
                <div className="section-find_container">
                  <div className="section-find_main">
                    <h2 className="find_main-title">Find Your Perfect<br />Rental Home</h2>
                    <p className="find_main-text">Looking for a cozy place to stay?
                      Discover beautifully designed rental homes that match
                      your style and needs. Whether you prefer modern apartments,
                      spacious houses, or stylish lofts, we have the perfect
                      home for you.</p>
                    <div className="find_main-items">
                      <div className="find_main-items-item">
                        <img src="img/ section4/Img1.png" alt="img" />
                      </div>
                      <div className="find_main-items-item">
                        <img src="img/ section4/Img2.png" alt="img" />
                      </div>
                      <div className="find_main-items-item">
                        <img src="img/ section4/Img3.png" alt="img" />
                      </div>
                    </div>
                    <a href="">
                      <button className="find_main-button">Read more</button>
                    </a>
                  </div>
                  <div className="section-find_right-img">
                    <img src="img/ section4/Img4.png" alt="img" />
                  </div>
                </div>
              </section>

              <section id="section5" className="section-collection">
                <div className="section-collection_container">
                  <div className="section-collection_header">
                    <div className="collection_header-title">Tile Collections</div>
                    <div className="collection_header-line">
                      <img src="img/ section5/line.svg" alt="line" />
                    </div>
                    <p className="collection_header-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                  </div>
                  <div className="section-collection_cards">
                    {
                      cardCollections.map((item, index) => (
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
            </>
          )}

          <Routes>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/addApartment" element={<AddApartment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>

        </main>
      </div>
    );
  }
}

export default App;
