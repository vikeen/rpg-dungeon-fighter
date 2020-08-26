import axios from 'axios'

const apiUrl = (path) => {
    return `http://localhost:8080${path}`
}

const Services = {
    auth: {
        register(payload) {
            return axios.post(apiUrl('/auth/register'), payload).then((response) => {
                console.log(response)
            })
        }
    },
    users: {
        query() {
            return axios.get(apiUrl('/users')).then((response) => {
                console.log(response)
            })
        }
    }
}

export default Services
