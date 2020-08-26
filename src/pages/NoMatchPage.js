import React from 'react'
import {Link} from "react-router-dom";

const NoMatchPage = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">This doesn't look right</h1>
            <p className="lead">
                It looks like the page you were searching for doesn't exist. Maybe a goblin ran off with the goods?
            </p>
            <Link className="btn btn-primary" to="/">Go Back Home</Link>
        </div>
    )
}

export default NoMatchPage
