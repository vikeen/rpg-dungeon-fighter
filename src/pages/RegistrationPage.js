import React, {useState} from "react";
import Services from "../services";
import InputFieldError from "../components/InputFieldError";

const RegistrationPage = () => {
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await Services.auth.register(user)
            window.location = "/"
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    }

    return (
        <div className="container" style={{maxWidth: 800}}>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group required">
                    <label htmlFor="username">Username</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">@</div>
                        </div>
                        <input type="text" className="form-control" id="username"
                               name="username" onChange={handleChange}
                        />
                        <InputFieldError errors={errors} fieldId={"username"}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group required">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName"
                               name="firstName" onChange={handleChange}
                        />
                        <InputFieldError errors={errors} fieldId={"firstName"}/>
                    </div>
                    <div className="col form-group required">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName"
                               name="lastName" onChange={handleChange}
                        />
                        <InputFieldError errors={errors} fieldId={"lastName"}/>
                    </div>
                </div>
                <div className="form-group required">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"
                           name="email" onChange={handleChange}
                    />
                    <InputFieldError errors={errors} fieldId={"email"}/>
                </div>
                <div className="form-group required">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                           name="password" onChange={handleChange}
                    />
                    <InputFieldError errors={errors} fieldId={"password"}/>
                </div>
                <div className="form-group required">
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirmation"
                           name="passwordConfirmation" onChange={handleChange}
                    />
                    <InputFieldError errors={errors} fieldId={"passwordConfirmation"}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegistrationPage
