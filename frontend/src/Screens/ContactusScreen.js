import React from 'react';
import "../index.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Banner from '../Conponents/Banner';
import ContactusForm from '../Conponents/ContactusForm';

export default function ContactusScreen() {
  return (
    <div>
      <Banner />
      <br />
      <br />
      <Container>
        <Grid item={true} xs={12} style={{ display: "flex" }}>
          <Grid item={true} xs={8}>
            {" "}
            <ContactusForm />
          </Grid>
          <Grid xs={4}>
          </Grid>
        </Grid>
      </Container>
    
    </div>
  )
}
