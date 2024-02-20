import { useState } from "react"

const BuildingForm = (props) => {

    const { addBuilding } = props
    const [buildName, setBuildName] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!buildName || !address || !landmark){
            alert('Enter Details')
            return
        } 
        addBuilding(buildName, address, landmark)
    }

    return (
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
                    className="btn"
                />
            </form>
        </div>
    )
}

export default BuildingForm