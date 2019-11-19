import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      marginLeft: "auto",
    },
    // palette: {
    //   primary1Color: "#6c757d",
    // }
  });

function NavBar(props) {
    const { classes } = props;
    return(
        <div>
        <AppBar position="static" style={{background: "#6c757d"}}>
            <Toolbar>
                <Typography variant="title" color="inherit">
                Amateur Dungeon Master Leaderboard
                </Typography>
                <Button
                    href='http://localhost:3000/'
                    variant="outlined"
                    className={classes.button}>
                        Home
                </Button>
                <Button
                    href="http://localhost:3000/profile"
                    variant="outlined"
                    className={classes.button}
                    style={{marginLeft: '.5em'}}>
                        Profile
                </Button>
                <Button
                    href='http://localhost:3000/rules'
                    variant="outlined"
                    className={classes.button}
                    style={{marginLeft: '.5em'}}>
                        Rules
                </Button>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default withStyles(styles)(NavBar);
