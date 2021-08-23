import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    rect: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    notfoundcontainer: {
        maxHeight: 180,
    },
    foundcontainer: {
        maxHeight: 400,
    },
}));

const StyledNotFoundTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgb(213,64,64)",
        color: "white",
    },
    body: {
        color: "rgb(213,64,64)"
    },
}))(TableCell);

const StyledNotFoundTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "rgb(248,212,212)",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "rgb(251,197,197)",
        },
    },
}))(TableRow);

const StyledFoundTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgb(74,73,181)",
        color: "white",
    }
}))(TableCell);

const StyledFoundTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "rgb(250,250,250)",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "rgb(244,244,244)",
        },
    },
}))(TableRow);

function Download(props) {
    let columns = [];
    const classes = useStyles();

    let emailNotFoundrows = [];
    let empnoNotFoundrows = [];
    if (props.emailNotFound !== undefined) emailNotFoundrows = props.emailNotFound;
    if (props.empnoNotFound !== undefined) empnoNotFoundrows = props.empnoNotFound;
	let profiles = []
	if (props.profiles !== undefined) profiles = props.profiles;
	
    if (profiles.length > 0) {
        columns = Object.keys(profiles[0]);
    }

    return (
        <Container className={classes.rect} border={1}>
            <Typography variant="h6" style={{color: "rgb(213,64,64)"}} align={'center'}>
                List of emails and/or employee numbers not found
            </Typography>
            <Grid container spacing={3}>
                <Grid item md lg>
                    <TableContainer component={Paper} className={classes.notfoundcontainer}>
                        <Table stickyHeader size="small" aria-label="emails not found table">
                            <TableHead>
                                <TableRow>
                                    <StyledNotFoundTableCell>Email Address</StyledNotFoundTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {emailNotFoundrows.length > 0 ?
                                    emailNotFoundrows.map((row) => (
                                        <StyledNotFoundTableRow key={row}>
                                            <StyledNotFoundTableCell component="th" scope="row"
                                                                     className={classes.tabledata}>
                                                {row}
                                            </StyledNotFoundTableCell>
                                        </StyledNotFoundTableRow>
                                    )) :
                                    <StyledNotFoundTableRow>
                                        <StyledNotFoundTableCell component="th" scope="row"
                                                                 className={classes.tabledata}
                                                                 style={{textAlign: 'center'}}>
                                            No Results
                                        </StyledNotFoundTableCell>
                                    </StyledNotFoundTableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item md lg>
                    <TableContainer component={Paper} className={classes.notfoundcontainer}>
                        <Table stickyHeader size="small" aria-label="employee number not found table">
                            <TableHead>
                                <TableRow>
                                    <StyledNotFoundTableCell>Employee No.</StyledNotFoundTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empnoNotFoundrows.length > 0 ? empnoNotFoundrows.map((row) => (
                                        <StyledNotFoundTableRow key={row}>
                                            <StyledNotFoundTableCell component="th" scope="row"
                                                                     className={classes.tabledata}>
                                                {row}
                                            </StyledNotFoundTableCell>
                                        </StyledNotFoundTableRow>
                                    )) :
                                    <StyledNotFoundTableRow>
                                        <StyledNotFoundTableCell component="th" scope="row"
                                                                 className={classes.tabledata}
                                                                 style={{textAlign: 'center'}}>
                                            No Results
                                        </StyledNotFoundTableCell>
                                    </StyledNotFoundTableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Typography variant="h6" style={{color: "rgb(74,73,181)", marginTop: 20}} align={'center'}>
                Found Profiles
            </Typography>
            <TableContainer component={Paper} className={classes.foundcontainer}>
                <Table size="small" aria-label="profiles found table">
                    <TableHead>
                        <TableRow>
                            {profiles.length > 0 ? columns.map((column, index) => {
                                    if (index !== 0){
                                        return (
                                            <StyledFoundTableCell key={column}>
                                                {column}
                                            </StyledFoundTableCell>
                                        )} else return null
                                }) :
                                <StyledFoundTableCell style={{textAlign: 'center'}}>
                                    No Results
                                </StyledFoundTableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profiles.length > 0 ? profiles.map((row) => (
                                <StyledFoundTableRow key={row["Employee Number"]}>
                                    <TableCell component="th" scope="row">
                                        {row["Display Name"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Email"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Employee Number"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Reporting Officer"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Division"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Dept"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Employee Group"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["HQ/SVC"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Manager"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["Org Chain"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["groupname"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["large_div"]}
                                    </TableCell>
                                    <TableCell>
                                        {row["username"]}
                                    </TableCell>
                                </StyledFoundTableRow>
                            )) :
                            null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Download;