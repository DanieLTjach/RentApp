import './register.css';
import background from '../../img/background/background.jpg'
import logo from '../../img/logo/bebo.png'
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
            <div className="wrapper">

                <main className="page"> 
                    <section className="section_background">
                        <img src={background} alt="background" />
                    </section>

                    <section className="section_registration">
                        <div className="section_registration-logo">
                            <div className="section_logo-img">
                                <img src={logo} alt="logo" />
                            </div>
                            <h1 className="section_logo-title">RentApp</h1>
                        </div>

                        <div className="section_registration-form">
                            <h2 className="registration-form_title">Create your account</h2>
                            <div className="registration-form_block">
                                <form action="post" className="form">

                                    <div className="form-block">
                                        <h3 className="form-block_title">Username</h3>
                                        <input name="username" type="text" class="input-email input-form" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-block">
                                        <h3 className="form-block_title">Email</h3>
                                        <input name="email" type="email" class="input-email input-form" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                                        {this.state.emailError && <p style={{ color : "red"}}> {this.state.emailError} </p>}
                                    </div>

                                    <div className="form-block" style={{position: 'relative'}}>
                                        <h3 className="form-block_title">Password</h3>
                                        <input name="password" type={this.state.showPassword ? "text" : "password"} class="input-password input-form" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
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
                                    </div>

                                    <button className="form-button" onClick= {this.register}>Registration</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

            </div>
        );
    }
}

export default Register;