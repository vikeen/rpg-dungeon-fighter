import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, NavLink
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "rpg-awesome/css/rpg-awesome.min.css"
import "jquery"
import "popper.js"
import "bootstrap/dist/js/bootstrap.min"

import HomePage from "./pages/HomePage";
import DungeonPage from "./pages/DungeonPage";
import NoMatchPage from "./pages/NoMatchPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">RPG Workouts</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/dungeon" className="nav-link">Dungeon</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/registration" className="nav-link">Sign Up</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Log In</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="content" className="container pt-5">
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/dungeon" component={DungeonPage}/>
                    <Route path="/registration" component={RegistrationPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="*">
                        <NoMatchPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
