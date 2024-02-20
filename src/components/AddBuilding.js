import axios from "axios"
import { useNavigate } from "react-router-dom"
import { paths } from "../App" 
import BuildingForm from "./BuildingForm"
import ShowBuildings from "./ShowBuildings"

const AddBuidling = (props) => {
    
    const navigate = useNavigate()
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const token = userDetails.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const addBuilding = async (buildName, address, landmark) => {
            const userDetails = JSON.parse(localStorage.getItem('userDetails'))
            // console.log(userDetails)
            const user_Id = userDetails.id
        try{
            const response = await axios.post('http://localhost:3070/api/buildings', {
                userId : user_Id,
                name: buildName,
                address: address,
                landmark: landmark
            })
            navigate(`${paths.addRoom}/${response.data._id}`)
            }catch(error){
            console.log(error.message)
        }
    }
    return(
        <div>
            <ShowBuildings />
            <BuildingForm addBuilding={addBuilding} />
        </div>
    )
}
export default AddBuidling