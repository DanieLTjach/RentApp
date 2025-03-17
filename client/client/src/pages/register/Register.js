import './register.css';
import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    register = async () => {
        const { username, email, password } = this.state;
        try {
            const response = await fetch('http://176.37.99.189:49001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Response data:", data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }



    render() {
        return(
            <div className="component">
                <div className="login">
                    <h1>Register</h1>

                    <span>
                        <label>Username</label>
                        <input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                    </span>

                    <span>
                        <label>Email</label>
                        <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </span>

                    <span>
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </span>

                    <button onClick= {this.register}>Register</button>
                </div>
            </div>
        );
    }
}

export default Register;