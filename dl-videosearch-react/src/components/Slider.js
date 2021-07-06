import {useState} from "react";

const Slider = () => {
    const [value, setValue] = useState(0.5);
    const changeValue = (event, value) => {
        setValue(value);
    };
    return (
        <div className="Slider">
           <Slider

           />
        </div>
    );
}

export default Slider;