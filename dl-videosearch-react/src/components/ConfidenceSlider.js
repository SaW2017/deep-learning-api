import {useState} from "react";
import {Slider, StepLabel, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const sliderStyle = makeStyles({
    confidenceSlider: {
        width: "inherit",
        padding: "20px"
    }
});

const ConfidenceSlider = (props) => {
    const classes = sliderStyle();
    const [value, setValue] = useState([0.5, 0.95]);
    const getText = (value) => `${value}`;
    const changeValue = (event, value) => {
        setValue(value);
        props.setConfidenceThreshold(value);
    };

    const customMarks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 0.25,
            label: '0.25'
        },
        {
            value: 0.50,
            label: '0.50'
        },
        {
            value: 0.75,
            label: '0.75'
        },
        {
            value: 1,
            label: '1'
        },
    ];

    return (
        <div className={classes.confidenceSlider}>
            <Typography>Confidence Intervall:</Typography>
           <Slider
               value={value}
               onChange={changeValue}
               min={0}
               max={1}
               step={0.05}
               marks={customMarks}
               getAriaValueText={getText}
               valueLabelDisplay= "auto"
           />
        </div>
    );
}

export default ConfidenceSlider;