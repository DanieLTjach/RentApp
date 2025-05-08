import React, { Component } from 'react'
import background from '../../img/background/background.jpg'
import logo from '../../img/logo/bebo.png'
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            showPassword: false,
            loginError: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === "login") {
            const login = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            this.setState({
                loginError: login.includes('@') ? (emailRegex.test(login) ? '' : 'Некорректный email') : ''
            });
        }
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    }

    login = async () => {
        const { login, password } = this.state

        if (!login || !password) {
            this.setState({ loginError: 'Введите логин и пароль' })
            return
        }

        if (this.state.loginError) {
            this.setState({ loginError: 'Некорректный логин' })
            return
        }

        try {
            const response = await fetch('http://localhost:49001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ login, password })
            })

            if (response.status !== 200) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            console.log(data)

            window.location.href = '/';  
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <div className="wrapper">
                <main className="page login-page">
                    <section className="section_background">
                        <img src={background} alt="background"/>
                    </section>
                    <section className='section_login'>
                        <div className="section_login-logo">
                            <div className="section_logo-img">
                                <img src={logo} alt="logo" />
                            </div>
                            <h1 className="section_logo-title">Logo</h1>
                        </div>
                        <div className="section_login-form">
                            <h2 className="login-form_title">Nice to see you again</h2>
                            <div className="login-form_block">
                                <div className="form-block">
                                    <h3 className="form-block_title">Username or email</h3>
                                    <input name="login" type="text" className="input-email input-form" placeholder="Username or email" value={this.state.login} onChange={this.handleChange}/>
                                    {this.state.loginError && <p style={{ color: "red" }}>{this.state.loginError}</p>}
                                </div>
                                <div className="form-block" style={{ position: 'relative' }}>
                                    <h3 className="form-block_title">Password</h3>
                                    <input name="password" type={this.state.showPassword ? "text" : "password"} className="input-password input-form" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                                    <button 
                                        type = "button" 
                                        onClick = {this.togglePasswordVisibility} 
                                        style = {{
                                            width: '50px',
                                            height: '50px',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '300px',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {this.state.showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                                <button className="form-button" onClick={this.login}>Sign in</button>
                            </div>
                        </div>
                        <div className="section_login-sign-up">
                            <h3 className="login-sign-up_text">Dont have an account? <a href='/register'>Sign up now</a></h3>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Login