import React from 'react';
import "../index.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, ValidationError } from '@formspree/react';



export default function ContactusForm() {

    const [state, handleSubmit] = useForm("xdojbqpy");
    if(state.succeeded){
        return <p>thanks</p>
    }
  return (
    <div>
        <Container>
            <div className="contactUform">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} xs={12}>
                        <Grid item={true} xs={6}>
                            <InputLabel htmlFor='First Name'></InputLabel>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="First Name"
                                type='first name'
                                name='first name'
                                fullWidth
                            />
                            <ValidationError 
                            prefix="First name" 
                            field="First name"
                            errors={state.errors}
                            />
                        </Grid>
                        <Grid item={true} xs={6}>
                            <InputLabel htmlFor='Last Name'></InputLabel>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                type='last name'
                                name='last name'
                                label="Last Name"
                                fullWidth
                            />
                            <ValidationError 
                            prefix="Last name" 
                            field="Last name"
                            errors={state.errors}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <InputLabel htmlFor='Email'></InputLabel>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                type='email'
                                name='email'
                                label="Email"
                                fullWidth
                            />
                            <ValidationError 
                            prefix="email" 
                            field="email"
                            errors={state.errors}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                name='message'
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                            />
                            <ValidationError 
                                prefix="Message" 
                                field="message"
                                errors={state.errors}
                                />
                        </Grid>
                        <Grid xs={12} item={true}>
                            <Button
                                color="secondary"
                                type='submit'
                                disabled={state.submitting}
                                disableElevation
                                variant="contained"
                                fullWidth
                            >
                                {" "}
                                Submit{" "}
                            </Button>
                        </Grid>  
                    </Grid>
                </form>
            </div>
      </Container>
    </div>
  )
}
