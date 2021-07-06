import {useEffect, useState} from "react";
import Axios from "axios";


const Searchbar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [fullImageList, setFullImageList] = useState([]);

    // initial get all Images
    useEffect(() => {
        Axios.get("http://localhost:3002/concepts").then((response) => {
            setFullImageList(response.data);
            console.log(fullImageList);
        })
    }, [])


    return (
        <div className="Searchbar">
            <input type="text"
                placeholder="Search for Concept..."
                   onChange={event => {
                       setSearchTerm((event.target.value));
                   }}
            />
            {fullImageList.filter((val) => {
                if(searchTerm == ""){
                    return val;
                }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                }
            }).map((val,key) => {
                return (
                    <div>
                        <p>{val.name}</p>
                    </div>);
            })}
        </div>
    );
}

export default Searchbar;


