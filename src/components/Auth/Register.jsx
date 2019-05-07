import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Icon, Container, FormInput, Message } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Register extends Component{

    handleChange = () => {

    }

    render(){
        return(
           <Container style ={{height: '100%'}}>
               <Grid textAlign="center" style ={{height: '100%'}} verticalAlign="middle" className="app"> 
                 <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as="h2" icon color ="olive" textAlign="center">
                        <Icon name="puzzle piece" color="olive" />
                             Register for SlackChat
                     </Header>
                     <Form size="large">
                     <Segment stacked>
                        <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} />

                        <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} />

                        <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password"/>

                        <Form.Input fluid name="passwordconfirmation" icon="lock" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} type="password"/>
                        <Button color="olive" fluid size="large">Submit</Button>
                     </Segment></Form>
                     <Message>Already a member? <Link to="/login">Login</Link></Message>
                  </Grid.Column>
                </Grid>
           </Container>
        );
    }
}

export default Register;