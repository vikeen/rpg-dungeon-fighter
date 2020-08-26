import React, {useState} from "react";
import Services from "../services";

const RegistrationPage = () => {
    const [user, setUser] = useState({
        username: 'vikeen',
        firstName: 'John',
        lastName: 'Rake',
        email: 'john.rake12@gmail.com',
        password: '11aaAAAa',
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        Services.auth.register(user).then(() => {

        })
        console.log(user)
    }

    return (
        <div className="container" style={{maxWidth: 800}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group required">
                    <label htmlFor="username">Username</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">@</div>
                        </div>
                        <input type="text" className="form-control" id="username" placeholder="Username"
                               name="username" onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group required">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName"
                               name="firstName" onChange={handleChange}
                        />
                    </div>
                    <div className="col form-group required">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName"
                               name="lastName" onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group required">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"
                           name="email" onChange={handleChange}
                    />
                </div>
                <div className="form-group required">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                           name="password" onChange={handleChange}
                    />
                </div>
                <div className="form-group required">
                    <label htmlFor="passwordConfirmation">Password</label>
                    <input type="password" className="form-control" id="passwordConfirmation"
                           name="passwordConfirmation" onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegistrationPage
