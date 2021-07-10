import {useEffect, useState} from "react";
import Axios from "axios";


const AddConcept = () => {
    // creating states
    const [conceptId, setConceptId] = useState(0);
    const [conceptName, setConceptName] = useState("");
    const [conceptList, setConceptList] = useState([]);

    // hook will be called whenever page will be refreshed
    useEffect(() => {
        Axios.get("http://localhost:3002/concepts").then((response) => {
            setConceptList(response.data);
        })
    }, [])

    //function for adding data
    const addConcept = () => {
        // adding route from backend
        Axios.post("http://localhost:3002/insert", {
            conceptId: conceptId,
            conceptName: conceptName
        });
    };

    return (
        <div className="AddConcept">
            {/*  Just to Test for now*/}
            <label>Concept ID:</label>
            <input
                type="number"
                onChange={(event => {
                    setConceptId(event.target.value)
                })}
            />
            <label>Concept Name:</label>
            <input
                type="text"
                onChange={(event => {
                    setConceptName(event.target.value)
                })}/>
            <button onClick={addConcept}>Add Concept</button>
            <br/>
            <h1>Existing Concepts</h1>
            {conceptList.map((value, key) => {
                return (
                    <div>
                        <p>{value.conceptId}: {value.name}</p>
                    </div>);
            })}
        </div>
    );
}

export default AddConcept;