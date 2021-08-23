import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, Button, Typography, Box} from '@material-ui/core';
import DataEntry from './DataEntry';
import Download from "./Download";

import {v4 as uuidv4} from 'uuid';
import Loader from "../../Loader";
import {useHistory} from "react-router-dom";
import {SERVER_STAFF_PROFILES} from "../../../config";


const useStyles = makeStyles((theme) => ({
    rect: {
        width: '85%',
        maxWidth: 900,
        backgroundColor: 'white',
        padding: 25,
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 40,
        height: 875,
        position: "relative"
    },
    nextbuttongroup: {
        marginTop: 60,
        float: "right",
        position: "absolute",
        right: 70,
        bottom: 50,
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textAlign: "center",
        margin: "auto"
    },
}));

function getSteps() {
    return ['Upload Data', 'Download'];
}

export default function HorizontalLinearStepper() {
    const history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [emailList, setemailList] = React.useState('');
    const [empNoList, setempNoList] = React.useState('');
    const [emailListNotFound, setemailListNotFound] = React.useState([]);
    const [empNoListNotFound, setempNoListNotFound] = React.useState([]);
    const [profiles, setProfiles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, seterror] = React.useState('');

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<DataEntry emaildata={(emailData) => getEmailData(emailData)}
                                   empNodata={(empNoData) => getEmpNoData(empNoData)} errorMsg={error}/>);
            case 1:
                return (<Download emailNotFound={emailListNotFound} empnoNotFound={empNoListNotFound}
                                  profiles={profiles}/>);
            default:
                return 'Unknown step';
        }
    }

    function isAuth() {
        if (!localStorage.getItem('email') || !sessionStorage.getItem('jwt')) {
            localStorage.clear();
            sessionStorage.clear();
            console.log("isAuth: false");
            history.push('/');
        }
        return true;
    }

    function uploadDataStep() {
        if (isAuth()) {
            const jwt = sessionStorage.getItem('jwt');
            setLoading(true);

            let emailsData = [];
            let empnoData = [];

            if (emailList !== "") {
                emailsData = emailList.split(/[\s,;]+/);
                emailsData =  emailsData.filter(e =>  e);
            }
            if (empNoList !== "") {
                empnoData = empNoList.split(/[\s,;]+/);
                empnoData =  empnoData.filter(e =>  e);
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + jwt
                },
                body: JSON.stringify({emails: emailsData, emp_nums: empnoData})
            };

            fetch(SERVER_STAFF_PROFILES + '/v1/profiles/fetch_by_json', requestOptions)
                .then(response => response.json())
                .then(data => {

                        setemailListNotFound(data.missing_emails);
                        setempNoListNotFound(data.missing_emp_nums);
                        setProfiles(data.profiles);

                        setLoading(false);
                    }
                )
                .catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false);
                });
        }
    }

    function downloadStep() {
        if (isAuth) {
            const jwt = sessionStorage.getItem('jwt');
            let emailsData = [];
            let empnoData = [];

            if (emailList !== "") {
                emailsData = emailList.split(/[\s,;]+/);
                emailsData =  emailsData.filter(e =>  e);
            }
            if (empNoList !== "") {
                empnoData = empNoList.split(/[\s,;]+/);
                empnoData =  empnoData.filter(e =>  e);
            }

            const requestOptions = {
                method: 'POST',
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + jwt,
                    'Accept': "text/csv"
                },
                body: JSON.stringify({emails: emailsData, emp_nums: empnoData})
            };

            fetch(SERVER_STAFF_PROFILES + '/v1/profiles/fetch_by_csv', requestOptions)
                .then((response) => {

                    var date = new Date().getDate().toString(); //Current Date
                    var month = (new Date().getMonth() + 1).toString(); //Current Month
                    var year = new Date().getFullYear().toString(); //Current Year
                    var hours = new Date().getHours().toString(); //Current Hours
                    var min = new Date().getMinutes().toString(); //Current Minutes
                    var sec = new Date().getSeconds().toString(); //Current Seconds

                    const uuidToHex = require('uuid-to-hex');
                    const filename = year + month + date + hours + min + sec + "-" + uuidToHex(uuidv4());
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = filename + ".csv";
                        a.click();
                    });
                })
                .catch(error => {
                    /*this.setState({ getotpMessage: error.toString() });*/
                    //console.error('There was an error!', error);
                });
        }
    }

    const getEmailData = (emailData) => {
        setemailList(emailData);
    }

    const getEmpNoData = (empNoData) => {
        setempNoList(empNoData);
    }

    const handleNext = () => {
        if (activeStep === 0) {
            if (emailList === '' && empNoList === '') {
                seterror('List of emails and/or employee numbers required');
                return null;
            }
            uploadDataStep();
        } else {
            downloadStep();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setemailList('');
        setempNoList('');
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.rect}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div id="contents">
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed
                        </Typography>
                        <Box textAlign='center'>
                            <Button onClick={handleReset} className={classes.button} color="primary" variant="outlined">
                                Reset
                            </Button>
                        </Box>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div className={classes.nextbuttongroup}>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Download CSV' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Loader open={loading}/>
        </div>
    );
}