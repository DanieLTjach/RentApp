import './register.css';
import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            showPassword: false,
            emailError: '',
            loading: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === 'email') {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.setState({ emailError: 'Invalid email format' });
            } else {
                this.setState({ emailError: '' });
            }
        }
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    }

    register = async () => {
        const { username, email, password } = this.state;

        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (this.state.emailError) {
            alert('Please enter a valid email address');
            return;
        }

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
                        {this.state.emailError && <p style={{ color : "red"}}> {this.state.emailError} </p>}
                    </span>

                    <span style={{position: 'relative'}}>
                        <label>Password</label>
                        <input name="password" type={this.state.showPassword ? "text" : "password"} placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        <button 
                            type = "button" 
                            onClick = {this.togglePasswordVisibility} 
                            style = {{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        > 
                            {this.state.showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </span>

                    <button onClick= {this.register}>Register</button>
                </div>
            </div>
        );
    }
}

export default Register;