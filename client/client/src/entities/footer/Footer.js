import React from 'react';

const Footer = () => {
    return (
        <section id="footer" className="section-footer">
        <div className="footer_container">
            <div className="footer-info">
                <div className="footer-logo">
                    <img src="img/img-catalog/footer/Logo.svg" alt="Logo" />
                </div>
                <div className="footer-info_products">
                    <h3 className="footer-info_title">Listings</h3>
                    <p className="footer-info_item">Apartments</p>
                    <p className="footer-info_item">Villas</p>
                    <p className="footer-info_item">Commercial</p>
                    <p className="footer-info_item">Land</p>
                </div>
                <div className="footer-info_services">
                    <h3 className="footer-info_title">Resources</h3>
                    <p className="footer-info_item">Buying Guide</p>
                    <p className="footer-info_item">Renting Guide</p>
                    <p className="footer-info_item">Financing Tips</p>
                </div>
                <div className="footer-info_contact">
                    <h3 className="footer-info_title">Contact Information</h3>
                    <p className="footer-info_item">3181 Al Imam Saud Ibn Abdul Aziz Branch Rd,</p>
                    <p className="footer-info_item">An Nuzhah, Riyadh 12474,</p>
                    <p className="footer-info_item">Saudi Arabia</p>
                </div>
            </div>

            <div className="footer_bottom">
                <div className="footer_icons">
                    <div className="footer-icon">
                        <img src="img/img-catalog/footer/Facebook.svg" alt="Facebook" />
                    </div>
                    <div className="footer-icon">
                        <img src="img/img-catalog/footer/Twitter.svg" alt="Twitter" />
                    </div>
                    <div className="footer-icon">
                        <img src="img/img-catalog/footer/Instagram.svg" alt="Instagram" />
                    </div>
                </div>
                <div className="footer_copy">
                    <p>Copyright © 2022 | All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Footer;