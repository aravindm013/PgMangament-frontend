import axios from "axios"
import { useState, useEffect } from "react"

const ShowTenants = (props) => {
    const [tenants, setTenants] = useState([])
    const [room, setRoom] = useState([])

    const { room_Id } = props
    const room_Name = room.name
    // console.log(build_Name)

    useEffect(() => {
        axios.get(`http://localhost:3070/api/rooms/${room_Id}`)
        .then((response)=>{
            // console.log(response.data)
            setRoom(response.data)
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        })
    }, [room_Id])

    useEffect(() => {
        axios.get(`http://localhost:3070/api/tenants/getbyRoom/${room_Id}`)
        .then((response)=>{
            // console.log(response.data)
            setTenants(response.data)
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        })
    }, [room_Id])

    return(
        <div>
            {
            tenants.length > 0 ? (
                <div>
                    <h2>Showing {room_Name}'s Rooms</h2>
                    {
                        tenants.map((tenant, i) => {
                            return(
                                <div key={tenant._id}>
                                <h3>Tenant No: {i+1}</h3>
                                <p>Tenant Name: {tenant.name}</p>
                                <p>Email: {tenant.email}</p>
                                <p>Aadhar Number: {tenant.aadharNumber}</p>
                                <p>Mobile Number: {tenant.mobile}</p>
                                </div>
                            )
                        })
                    }
                </div>
                ) : (
                <h2>No Tenants to Show</h2>
            )
        }
        </div>
    )
}

export default ShowTenants
