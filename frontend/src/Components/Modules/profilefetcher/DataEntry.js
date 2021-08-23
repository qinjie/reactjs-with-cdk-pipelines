import React from 'react';
import { Container, TextField, Grid, Typography, FormHelperText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            /*width: '25ch',*/
        },
    },
    rect: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputText: {
        height: 550
    },
    instructions: {
        //marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textAlign: "center",
        margin: "auto"
    },
}));

function DataEntry(props) {
    const [fieldsAreEmpty, setFieldsAreEmpty] = React.useState(true);
    const classes = useStyles();
    const handleEmailChange = (event) => {
        setFieldsAreEmpty(false);
        const emailListInput = event.target.value;
        props.emaildata(emailListInput);
    }

    const handleEmpNoChange = (event) => {
        setFieldsAreEmpty(false);
        const empNoListInput = event.target.value;
        props.empNodata(empNoListInput);
    }
    return (
        <Container className={classes.rect} border={1}>
            <Typography className={classes.instructions}>
                Enter list of emails and/or employee numbers to search.<br/>
                (Deliminate each record by white space or comma or semicolon)
            </Typography>
            <FormHelperText id="component-helper-text" style={{textAlign: "center"}} error>{fieldsAreEmpty ? props.errorMsg : null}</FormHelperText>
            <form className={classes.form} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item md lg>
                        <TextField
                            id="outlined-full-width"
                            label="Emails"
                            style={{ margin: 8 }}
                            placeholder="abc@tech.gov.sg"
                            multiline
                            rowsMax={20}
                            rows={20}
                            fullWidth
                            margin="normal"
                            onChange={handleEmailChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            InputProps={{ classes: { input: classes.inputText } }}
                        />
                    </Grid>
                    <Grid item md lg>
                        <TextField
                            id="outlined-full-width"
                            label="Employment Number"
                            style={{ margin: 8 }}
                            placeholder="123456789"
                            multiline
                            rowsMax={20}
                            rows={20}
                            fullWidth
                            margin="normal"
                            onChange={handleEmpNoChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

            </form>
        </Container>
    );
}

export default DataEntry;