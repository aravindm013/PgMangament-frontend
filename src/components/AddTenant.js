import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../App" 
import axios from "axios"
import ShowTenants from "./ShowTenants"

const AddTenant = () => {
    const [tname, setTname] = useState('')
    const [temail, setTemail] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [number, setNumber] = useState('')
    const [showTenant, setShowTenants] = useState(false)

    const params = useParams()
    // console.log(params)
    const room_Id = params.room_Id
    const navigate = useNavigate()
    const build_Id = params.build_Id
    // console.log(room_Id, 'room_Id', build_Id, 'building_Id')

    const addTenant = async (tname, temail, aadhar, number) => {
        try{
            const response = await axios.post('http://localhost:3070/api/tenants', {
                name: tname,
                email: temail,
                aadharNumber: aadhar,
                mobile: number,
                roomId: room_Id,
                buildingId: build_Id
            })
            console.log(response.data)
            alert('Registration completed')
            const userDetails = localStorage.getItem('userDetails')
            const userId = (JSON.parse(userDetails))._id
            navigate(`${paths.addBuilding}/${userId}`)
        }catch(error){
            console.log(error.message)
        }
    }

    const submitTenant = (e) => {
        e.preventDefault()
        if(!tname || !temail || !aadhar || !number){
            alert('Enter tenant details')
        }
        addTenant(tname, temail, aadhar, number)
    }

    const handleShowTenants = () => {
        setShowTenants(!showTenant)
    }

    return (
        <div>
            {showTenant && <ShowTenants room_Id={room_Id} />}
            <form onSubmit={submitTenant}>
                <label>Name</label>
                <input 
                    type='text'
                    placeholder="Enter Name of tenant"
                    value={tname}
                    onChange={(e) => setTname(e.target.value)}
                /> <br />
                <label>Email</label>
                <input 
                    type='text'
                    placeholder="Enter email of tenant"
                    value={temail}
                    onChange={(e) => setTemail(e.target.value)}
                /> <br />
                <label>Aadhar Number</label>
                <input 
                    type='text'
                    placeholder="Enter aadhar of tenant"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                /> <br />
                <label>Mobile Number</label>
                <input 
                    type='text'
                    placeholder="Enter Number of tenant"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                /> <br />
                <input
                    type='submit'
                    value="Save Tenant" 
                    className="btn"
                />
            </form>
            <button className="btn" onClick={() => handleShowTenants()}>Show Tenants</button>
        </div>
    )
}

export default AddTenant