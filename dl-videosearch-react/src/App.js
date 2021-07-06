import "./App.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import AddConcept from "./components/AddConcept";
import {useState} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide"; // for http requests

const useStyles = makeStyles((theme) => ({
    grid:{
        width: '100%',
        margin: '0px'
    },
    paper:{
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    }
}));

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Header/>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={7}>
                    <RightSide/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
