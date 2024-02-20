import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "../App"

const ShowRooms = (props) => {
    const [rooms, setRooms] = useState([])
    const [building, setBuilding] = useState([])
    const { build_Id } = props
    const build_Name = building.name

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3070/api/buildings/${build_Id}`)
        .then((response)=>{
            // console.log(response.data)
            setBuilding(response.data)
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        })
    }, [build_Id])

    useEffect(() => {
        axios.get(`http://localhost:3070/api/rooms/getbybuilding/${build_Id}`)
        .then((response)=>{
            // console.log(response.data)
            setRooms(response.data)
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        })
    }, [build_Id])

    const handleAddTenant = (roomId) => {
        navigate(`${paths.addTenant}/${roomId}/${build_Id}`)}

    return(
        <div>
            {
                rooms.length > 0 ? (
                    <div>
                        <h2>Showing {build_Name}'s Rooms</h2>
                        {
                            rooms.map((room, i) => {
                                return(
                                    <div key={room._id}>
                                    <h3>Room No: {i+1}</h3>
                                    <p>Room Name: {room.name}</p>
                                    <button onClick={()=> handleAddTenant(room._id)}>Add Tenant</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    ) : (
                    <h2>No Rooms to Show</h2>
                )
            }
        </div>
    )
}

export default ShowRooms