import React from 'react';
import "../index.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import Input from "@mui/material/Input";
//import OutlinedInput from "@mui/material/OutlinedInput";
//import FormControl from "@mui/material/FormControl";



export default function ContactusForm() {
  return (
    <div>
        <Container>
            <div className="contactUform">
            <Grid container spacing={3} xs={12}>
                <Grid item={true} xs={6}>
                    <InputLabel> </InputLabel>
                    <TextField
                        id="component-outlined"
                        size="small"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    <InputLabel></InputLabel>
                    <TextField
                        id="outlined-basic"
                        size="small"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <InputLabel></InputLabel>
                    <TextField
                        id="outlined-basic"
                        size="small"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                />
                </Grid>
                <Grid xs={12} item={true}>
                <Button
                    color="secondary"
                    disableElevation
                    variant="contained"
                    fullWidth
                >
                    {" "}
                    Submit{" "}
                </Button>
                </Grid>
            </Grid>
            </div>
      </Container>
    </div>
  )
}
