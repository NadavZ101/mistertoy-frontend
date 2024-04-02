import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { LoginSignup } from "./LoginSignup.jsx";

import { logout } from "../store/actions/user.actions";


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    function onLogout() {
        logout()
            .then(() => {
                console.log('logout successfully')
            })
            .catch(err => {
                console.log('Cannot logout')
            })
    }

    return (
        <header className="app-header full">
            <section className="header-container">
                <NavLink to="/"><h1>Toys Land</h1></NavLink>
                <nav className="app-nav flex">
                    <NavLink to="/">Home</NavLink>

                    <NavLink to="/toy">Toys</NavLink>

                    <NavLink to="/review">Reviews</NavLink>

                    <NavLink to="/chart">Dashboard</NavLink>
                </nav>
            </section>

            {user ? (
                <section className="user-details">
                    <span>Welcome {user.fullname}</span>
                    <button className="btn" onClick={onLogout}>Logout</button>
                </section>
            )
                :
                (
                    <section>
                        <LoginSignup />
                    </section>
                )
            }
        </header>
    )
}