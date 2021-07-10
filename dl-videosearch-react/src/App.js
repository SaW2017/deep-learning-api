import "./App.css";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Header from "./components/Header";
import {green, lightGreen, orange} from "@material-ui/core/colors";
import StandardImageList from "./components/StandardImageList";
import {useState} from "react";
import Searchbar from "./components/Searchbar";
import ConfidenceSlider from "./components/ConfidenceSlider";
import ImageInformation from "./components/ImageInformation";

const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom: 15,
        borderRadius: 15,
    },
    grid:{
        width: '100%',
        margin: '0px'
    },
    paper:{
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        background: theme.palette.primary.main,
    }
}));

const customTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: orange[500],
        },
        secondary:{
            main: green[500]
        }
    }
});

function App() {
    const classes = useStyles();
    const [filter, setFilter]  = useState("");
    const [confidenceThreshold, setConfidenceThreshold]  = useState();

    return (
        <ThemeProvider theme={customTheme}>
            <div className="App">
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Header/>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid
                            container
                            spacing={1}
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch">
                            <Grid item>
                                <Paper>
                                    <Searchbar setFilter={setFilter}/>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper>
                                    <ConfidenceSlider setConfidenceThreshold={setConfidenceThreshold}/>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper>
                                    <ImageInformation />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                       <StandardImageList filter={filter} confidenceThreshold={confidenceThreshold}/>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default App;
