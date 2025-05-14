import React from 'react';
import Header from "../../entities/header/Header";
import Footer from "../../entities/footer/Footer";
import withRouter from "../../withRouter"
import Cookies from 'js-cookie';
import "./addApartment.css";

class AddApartment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            price: '',
            description: '',
            error: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: '',
        });
    }

    addAppartment = async (e) => {
        e.preventDefault();
        const { name, phone, price, description } = this.state;

        const landlordIdFromCookie = Cookies.get('user_id');

        if (!landlordIdFromCookie) {
            console.error("Cookie 'user_id' not found");
            return;
        }

        try {
            const response = await fetch('http://localhost:49002/api/catalog/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    landlord_number: phone,
                    landlord_id: parseInt(landlordIdFromCookie),
                    name,
                    price,
                    description,
                })
            });

            if (response.status === 400) {
                this.setState({ error: 'Заполните все поля' });
                return;
            }

            if (!response.ok) {
                this.setState({ error: 'Ошибка сервера. Попробуйте позже.' });
                return;
            }

            let data = null;
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
                console.log(data);
            } else {
                console.log('Ответ сервера без JSON');
            }

            this.props.router.navigate('/catalog');

        } catch (error) {
            console.error(error);
            this.setState({ error: 'Произошла ошибка при отправке запроса' });
        }
    };


    render() {
        return (
            <div className="add-apartment">
                <Header />
                <div className="add-apartment-content">
                    <h1>Add Apartment</h1>
                    <form className="add-apartment-form" onSubmit={this.addAppartment}>
                        {this.state.error && (
                            <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                                {this.state.error}
                            </div>
                        )}

                        <label>Title</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Cozy apartment in the city center"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="e.g. +380631234567"
                            value={this.state.phone}
                            onChange={this.handleChange}
                        />

                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="e.g. 1500000"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />

                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the apartment..."
                            value={this.state.description}
                            onChange={this.handleChange}
                        ></textarea>

                        <button onClick={this.addAppartment}>Add Apartment</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(AddApartment);
