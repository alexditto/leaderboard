import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: '1em',
  },
  table: {
    minWidth: 700,
  },
});

const clickableStyle = {
  "cursor" : "pointer",
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function SimpleTable(props) {
  const { classes } = props;
  const [rows, setRows] = useState([
  ]);

function sortRows(attr) {
    getElastic(attr)
  };

function getElastic(attr) {
  axios.get('http://localhost:9200/leaderboard/_search')
    .then(function (response) {
      const listOfRows =[];
      if(response.data.hits !== undefined && response.data.hits.hits !== undefined) {
        response.data.hits.hits.forEach(hit => {
          const newRow= hit._source;
          newRow.id= hit._id;
          listOfRows.push(newRow);
        })
        setRows(listOfRows.sort(dynamicSort(attr)).reverse());
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

  useEffect(() => {
    getElastic("level");
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">User</TableCell>
            <TableCell align="right" style={clickableStyle} onClick= {()=> sortRows("playerName")}>Character</TableCell>
            <TableCell align="right" style={clickableStyle} onClick= {()=> sortRows("level")}>Level</TableCell>
            <TableCell align="right" style={clickableStyle} onClick= {()=> sortRows("win")}>Wins</TableCell>
            <TableCell align="right" style={clickableStyle} onClick= {()=> sortRows("gold")}>Gold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.playerName}</TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.win}</TableCell>
              <TableCell align="right">{row.gold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
