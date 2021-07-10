import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const infoStyle = makeStyles({
    imageInformation: {
        width: "inherit",
        padding: "20px"
    }
});

const ImageInformation = () => {
    const classes = infoStyle();
    return (
        <div className={classes.imageInformation}>
            <Typography>Detailed Image Information:</Typography>
            <p>BLABLABLA</p>
        </div>
    );
}

export default ImageInformation;


