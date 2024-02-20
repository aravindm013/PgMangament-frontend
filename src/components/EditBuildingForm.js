import { useState } from "react"
import axios from "axios"

const EditBuildingForm = ({editBuilding, handleEditDone}) => {

    const [buildName, setBuildName] = useState(editBuilding.name)
    const [address, setAddress] = useState(editBuilding.address)
    const [landmark, setLandmark] = useState(editBuilding.landmark)
    const buildId = editBuilding._id
    const userId = editBuilding.userId

    const handleSubmit = (e) => {
        e.preventDefault()
        submitEditBuilding(buildName, address, landmark)
    }

    const submitEditBuilding = async (buildName, address, landmark) => {
        try {
            const response = axios.put(`http://localhost:3070/api/buildings/${buildId}`, {
                userId: userId,
                name: buildName,
                address: address,
                landmark: landmark
            })
            alert('Details edited')
            handleEditDone()
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type='text'
                    placeholder='Enter Building Name'
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                /> <br />
                <label>Address</label>
                <textarea
                    placeholder="Enter Address"
                    value={address}
                    rows="5"
                    cols="50"
                    onChange={(e)=> {setAddress(e.target.value)}}
                ></textarea> <br />
                <label>Landmark</label>
                <input 
                    type='text'
                    placeholder="Enter landmark"
                    value={landmark}
                    onChange={(e)=> setLandmark(e.target.value)}
                /> <br />
                <input
                    type='submit'
                    value="Save Address" 
                />
            </form>
        </div>
    )
}

export default EditBuildingForm