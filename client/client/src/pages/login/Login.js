
import React, { Component } from 'react'
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async () => {
        const { login, password } = this.state

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
                        <input name="login" type="text" placeholder="Username or email" value={this.username} onChange={this.handleChange}/>
                    </span>

                    <span>
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" value={this.password} onChange={this.handleChange}/>
                    </span>

                    <button onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

export default Login