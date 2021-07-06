import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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

const RightSide = () => {
    const classes = useStyles();
    return (
        <div className="RightSide">
            <Grid container
                  className={classes.grid}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet proin fermentum leo vel orci porta non pulvinar. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Porttitor massa id neque aliquam vestibulum. Sit amet facilisis magna etiam tempor. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Eu turpis egestas pretium aenean pharetra magna. Magna etiam tempor orci eu lobortis elementum nibh. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra.

                        Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Auctor augue mauris augue neque. Vel elit scelerisque mauris pellentesque. Dignissim sodales ut eu sem integer vitae justo eget magna. Cursus euismod quis viverra nibh cras pulvinar. Mattis enim ut tellus elementum sagittis vitae et leo. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Diam in arcu cursus euismod quis viverra nibh cras. Id donec ultrices tincidunt arcu non sodales neque. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Dui accumsan sit amet nulla. Maecenas sed enim ut sem viverra.

                        Faucibus interdum posuere lorem ipsum dolor sit. Eu mi bibendum neque egestas congue quisque. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. In cursus turpis massa tincidunt dui ut. Velit dignissim sodales ut eu sem integer vitae. Enim eu turpis egestas pretium aenean pharetra. Ornare arcu dui vivamus arcu. Sit amet risus nullam eget felis eget nunc lobortis mattis. Imperdiet proin fermentum leo vel orci porta. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Ultrices in iaculis nunc sed augue.

                        Fermentum odio eu feugiat pretium nibh ipsum consequat. Duis convallis convallis tellus id interdum. Scelerisque in dictum non consectetur a erat nam at lectus. Turpis egestas sed tempus urna et pharetra. Ante in nibh mauris cursus mattis molestie a. Sed elementum tempus egestas sed. Congue eu consequat ac felis donec et odio. Lobortis mattis aliquam faucibus purus. In fermentum posuere urna nec tincidunt praesent semper. Odio morbi quis commodo odio aenean sed adipiscing diam. Consequat nisl vel pretium lectus quam. Fringilla est ullamcorper eget nulla facilisi etiam dignissim. Ultricies integer quis auctor elit sed vulputate mi sit amet. Eget duis at tellus at urna. Sapien eget mi proin sed libero enim sed faucibus. Mauris vitae ultricies leo integer malesuada nunc. Morbi tincidunt augue interdum velit euismod in.

                        Eu nisl nunc mi ipsum faucibus vitae aliquet. Maecenas sed enim ut sem viverra aliquet eget sit amet. Facilisi etiam dghignissim diam quis enim lobortis scelerisque fermentum dui. Scelerisque eleifend donec pretium vulputate sapien. Justo laoreet sit amet cursus. Neque laoreet suspendisse interdum consectetur libero id. Sed egestas egestas fringilla phasellus faucibus. Ullamcorper dignissim cras tincidunt lobortis feugiat. Fringilla est ullamcorper eget nulla. Aliquam vestibulum morbi blandit cursus risus at ultrices.
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default RightSide;