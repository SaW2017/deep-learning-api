import {Grid, Paper} from "@material-ui/core";
import Searchbar from "./Searchbar";
import {makeStyles} from "@material-ui/core/styles";
import ConfidenceSlider from "./ConfidenceSlider";
import ImageInformation from "./ImageInformation";

const useStyles = makeStyles((theme) => ({
    grid:{
        width: '100%',
        margin: '0px'
    },
    paper:{
        padding: theme.spacing(1),
        textAlign: 'center',  //abändern
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    }
}));

const LeftSide = () => {
    const classes = useStyles();
    return (
        <div className="LeftSide">
            <Grid
                container
                spacing={1}
                direction="column"
                justify="flex-start"
                alignItems="stretch">
                <Grid item>
                    <Paper className={classes.paper}>
                        <Searchbar/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <ConfidenceSlider/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <ImageInformation/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default LeftSide;