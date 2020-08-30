import React, {useState} from "react";
import Services from "../services";
import InputFieldError from "../components/InputFieldError";

const LoginPage = () => {
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
            await Services.auth.login(user.username, user.password)
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    }

    return (
        <div className="container" style={{maxWidth: 800}}>
            <h1>Login</h1>
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
                <div className="form-group required">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                           name="password" onChange={handleChange}
                    />
                    <InputFieldError errors={errors} fieldId={"password"}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage
