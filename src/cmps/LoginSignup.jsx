import { useState } from "react"
import { userService } from "../services/user.service.js"

import { login, signup } from "../store/actions/user.actions.js"

export function LoginSignup() {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignUpState, setIsSignUpState] = useState(false)

    function handleCredentials({ target }) {
        const field = target.name
        const value = target.value
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const method = isSignUpState ? signup : login
        method(credentials)
            .then(() => {
                console.log(`Welcome ${user.fullname}`)
            })
            .catch(err => {
                console.log('Try again')
            })
    }

    function onToggleSignUp() {
        setIsSignUpState(!isSignUpState)
    }


    const { username, password, fullname } = credentials

    return <div className="login-page">
        <form className="login-form" onSubmit={onSubmit}>
            <input
                type='text'
                name="username"
                value={username}
                onChange={handleCredentials}
                placeholder="Username"
                required
                autoFocus
            />

            <input
                type="password"
                name="password"
                value={password}
                onChange={handleCredentials}
                placeholder="Password"
                required
            />

            {isSignUpState &&
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={handleCredentials}
                    placeholder="Full Name"
                    required
                />
            }
            <button className="btn">{isSignUpState ? 'SignUp' : 'Login'}</button>

            <div className="btns">
                <a href="#" onClick={onToggleSignUp}>
                    {isSignUpState ? 'Login' : 'SignUp'}
                </a>
            </div>

        </form>
    </div>
}