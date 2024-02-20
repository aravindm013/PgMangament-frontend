import { useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../App"
import ShowRooms from "./ShowRooms"

const AddRoom = () => {
    const [room, setRoom] = useState('')
    const params = useParams()
    // console.log(params)
    const build_Id = params.build_Id
    const [showRooms, setShowRooms] = useState(false)
    const navigate = useNavigate() 

    const addRoom = async (room) => {
        try {
            const response = await axios.post('http://localhost:3070/api/rooms', {
                buildingId: build_Id,
                name: room
            })
            // console.log(response.data)
            navigate(`${paths.addTenant}/${response.data._id}/${build_Id}`)
        }catch(error){
            console.log(error.message)
        }
    }

    const submitRoom = (e) => {
        e.preventDefault()
        if(!room){
            alert('Enter Room details')
        }
        addRoom(room)
    }

    const handleShowRooms = () => {
        setShowRooms(!showRooms)
    }

    return(
        <div>
            { showRooms && <ShowRooms build_Id={build_Id}/> }
            <form onSubmit={submitRoom}>
                <label>Room Name</label>
                <input
                    type='text'
                    placeholder="enter room name"
                    value={room}
                    onChange={(e)=>setRoom(e.target.value)} 
                /> <br />
                <input
                    type='submit'
                    value="Save Room" 
                    className="btn"
                />
            </form>
            <button className="btn" onClick={() => handleShowRooms()}>Show Rooms</button>
        </div>
    )
}

export default AddRoom