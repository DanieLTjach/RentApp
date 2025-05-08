import React from 'react';
import Header from "../../entities/header/Header";
import Footer from "../../entities/footer/Footer";
import "./addApartment.css";

class AddApartment extends React.Component {
    render() {
        return (
            <div className="add-apartment">
                <Header />
                <div className="add-apartment-content">
                    <h1>Add Apartment</h1>
                    <div className="add-apartment-form">
                        <label>Title</label>
                        <input type="text" placeholder="e.g. Cozy apartment in the city center" />

                        <label>Price</label>
                        <input type="number" placeholder="e.g. 1500000" />

                        <label>Description</label>
                        <textarea rows="4" placeholder="Describe the apartment..."></textarea>

                        <label htmlFor="mainImage" className="custom-file-upload">
                            Upload Main Image
                        </label>
                        <input id="mainImage" type="file" accept="image/*" />

                        <label htmlFor="galleryImages" className="custom-file-upload">
                            Upload Gallery Images
                        </label>
                        <input id="galleryImages" type="file" accept="image/*" multiple />

                        <button type="submit">Add Apartment</button>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default AddApartment;