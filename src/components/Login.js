import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "../App"
import axios from "axios"
import jwt_decode from 'jwt-decode'

const Login = (props) => {
    const navigate = useNavigate()  
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const submitUser = async (e) => {
        e.preventDefault()
        if(!name || !password){
            alert('Wrong credentials')
            return
        }
        try {
            const response = await axios.post('http://localhost:3070/api/users/login', {
                name: name,
                password: password
            })
            if(response.data.token){
                // console.log(response.data.token)
                const userDetails = jwt_decode(response.data.token)
                userDetails.token = response.data.token
                localStorage.setItem('userDetails', JSON.stringify(userDetails))
                // console.log(userDetails)
                navigate(`${paths.addBuilding}/${userDetails.id}`)
            } 
        } catch(error){
            alert('Enter valid credentials')
        }
    }

    const registerUser = async (e) => {
        e.preventDefault()
        if(!name || !password){
            alert('Enter Credentials')
            return
        }
        try {
            const response = await axios.post('http://localhost:3070/api/users/', {
                name: name,
                password: password
            })
            const userDetails = jwt_decode(response.data.token)
            userDetails.token = response.data.token
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
            console.log(userDetails)
            navigate(`${paths.addBuilding}/${userDetails.id}`)
        }catch(error){
            alert('Enter valid credentials')
        }
    }

    return(
        <div>
            <form onSubmit={submitUser}>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Enter Username' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /> <br />
                <label>Password</label>
                <input
                    type='text'
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />
                <input
                    type='Submit'
                    value='Login'
                    className="btn"
                /> <br />
                <input 
                    type="submit" 
                    value="Register" 
                    onClick={registerUser} 
                    className="btn"
                /> <br />
            </form>
        </div>
    )
}

export default Login