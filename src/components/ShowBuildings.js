import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { paths } from "../App" 
import EditBuildingForm from "./EditBuildingForm"

const ShowBuildings = (props) => {
    
    const [buildings, setBuildings] = useState([])
    const [editBuilding, setEditBuilding] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const navigate = useNavigate()

    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const userId = userDetails.id
    
    useEffect(() => {
        axios.get(`http://localhost:3070/api/buildings/getbyuser/${userId}`)
        .then((response) => { 
            // console.log(response.data)
            setBuildings(response.data)
        })
        .catch((err) => {
            alert(err.message)
        })
    }, [userId])

    const handleDelete = async (building_id) => {
        try {
            console.log('userId', userId)
            const delResponse = await axios.delete(`http://localhost:3070/api/buildings/${building_id}`)
            const response = await axios.get(`http://localhost:3070/api/buildings/getbyuser/${userId}`)
            // console.log(response.data)
            setBuildings(response.data)
        } catch(error){
            console.log(error)
            alert(error.message)
        }
    } 

    const handleAddRoom = (build_Id) => {
        navigate(`${paths.addRoom}/${build_Id}`)
    }

    const handleEdit = (building) => {
        // console.log(building)
        setEditBuilding(building)
        setShowEditForm(true)
    }

    const handleEditDone = () => {
        setShowEditForm(false)
    }
    

    return(
        <div>
            { showEditForm && editBuilding ? (
                <EditBuildingForm editBuilding = {editBuilding} handleEditDone={handleEditDone}/>
                ) : (
                buildings.length > 0 ? (
                    <div className="container">
                        <h3>Showing Buildings</h3>
                        {
                            buildings.map((building, i) => {
                                return(
                                    <div key={building._id}>
                                        <h3>Building No: {i+1} </h3>
                                        <p>Building Name: {building.name}</p>
                                        <p>Address: {building.address}</p>
                                        <p>Landmark: {building.landmark}</p>
                                        <button className="btn" onClick={() => handleDelete(building._id)}>Delete Building</button>
                                        <button className="btn" onClick={() => handleEdit(building)}>Edit Building Details</button>
                                        <button className="btn" onClick={() => handleAddRoom(building._id)}>Add Room</button> 
                                    </div>
                                )
                            })
                        }
                    </div>
                    ) : (
                    <h2>No Buildings to Show</h2>
                )
            )} 
        </div>
    )
}

export default ShowBuildings 