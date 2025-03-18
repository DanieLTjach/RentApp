
import React, { Component } from 'react'
import './login.css'

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
            const response = await fetch('http://176.37.99.189:49001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            })

            if (response.status !== 200) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <div className="component">
                <div className="login">
                    <h1>Login</h1>

                    <span>
                        <label>Username or email</label>
                        <input name="login" type="text" placeholder="Username or email" value={this.state.login} onChange={this.handleChange}/>
                        {this.state.loginError && <p style={{ color: "red" }}>{this.state.loginError}</p>}
                    </span>

                    <span style={{ position: 'relative' }}>
                        <label>Password</label>
                        <input name="password" type={this.state.showPassword ? "text" : "password"} placeholder="Password" value={this.password} onChange={this.handleChange}/>
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

                    <button onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

export default Login