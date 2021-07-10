import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";

const searchbarStyle = makeStyles({
    searchbar: {
        width: "inherit",
        padding: "20px"
    },
    input:{
        marginTop: "15px"
    }
});

const Searchbar = (props) => {
    const classes = searchbarStyle();

    return (
        <div className={classes.searchbar}>
            <Typography>Concept:</Typography>
            <TextField id="outlined-search"
                       className={classes.input}
                       label="Search field"
                       type="search"
                       variant="outlined"
                       onChange={event => {
                            props.setFilter((event.target.value));
                            console.log("Searchbar");
                            console.log(event.target.value);
                        }}
            />
        </div>
    );
}

export default Searchbar;


