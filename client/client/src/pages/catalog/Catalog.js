import React, { Component } from 'react';
import './catalog.css';

class Catalog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            price: '',
            about: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }   

    addAppartment = async () => {
        const {name, phone, price, about} = this.state;

        try {   
            const response = await fetch('http://176.37.99.189:49002/api/catalog/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    price,
                    about
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
            <div>
                <h1>Catalog</h1>

                <span>
                    <label>Name</label>
                    <input name="name" type="text" value={this.name} onChange={this.handleChange}/>
                </span>

                <span>
                    <label>Phone</label>
                    <input name="phone" type="text" value={this.phone} onChange={this.handleChange}/>
                </span>

                <span>
                    <label>Price</label>
                    <input name="price" type="number" value={this.price} onChange={this.handleChange}/>
                </span>

                <span>
                    <label>About</label>
                    <input name="about" type="text" value={this.about} onChange={this.handleChange}/>
                </span>

                <button onClick={this.addAppartment}>Add</button>
            </div>
        );
    }
}

export default Catalog;