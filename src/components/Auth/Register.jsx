import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Icon, Message } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';


class Register extends Component{

    state = {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',
        errors: []
    }

    // Check to see if all the feilds are completed
    isFormEmpty = ({username, email, password, passwordconfirmation}) => {
        return (!username.length || 
                !email.length || 
                !password.length || 
                !passwordconfirmation.length);
    }

    // Check to see if password meets the minimum requirements
    isPasswordValid = ({ password, passwordconfirmation }) => {
        if(password !== passwordconfirmation){
            return false;
        }
        else{
            return true;
        }
    }

    // Check password length
    isPasswordThickEnough = ({ password, passwordconfirmation }) => {
        if(password.length < 6 || passwordconfirmation.length < 6){
            return false;
        }
    }

    // Form validation
    isFormValid = () => {

        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = { message: 'Fill in all the fields' }
            this.setState({errors: errors.concat(error) });
            return false;
        }else if(!this.isPasswordValid(this.state)){
            error = { message: 'Invalid password. Please try again' }
            this.setState({errors: errors.concat(error)})
            return false;
        }else if(!this.isPasswordThickEnough(this.state)){
            error = { message: 'Password must be atleast 6 characters long. Please try again' }
            this.setState({ errors: errors.concat(error) })
            return false;
        }else{
            return true;
        }
    }

    // Display erros
    displayErrors = errors => errors.map((error,i) => 
        <p key={i}>{error.message}</p>
    );

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        if(this.isFormValid()){

        event.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser)
        }).catch(err => {
            console.log(err);
        });

        }
    }

    render(){

        const {username, email, password, passwordconfirmation, errors} = this.state;

        return(           
               <Grid textAlign="center" verticalAlign="middle" className="app"> 
                 <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as="h2" icon color ="olive" textAlign="center">
                        <Icon name="puzzle piece" color="olive" />
                             Register for SlackChat
                     </Header>
                     <Form size="large" onSubmit={this.handleSubmit}>
                     <Segment stacked>
                        <Form.Input 
                        fluid 
                        name="username" 
                        value={username} 
                        icon="user" 
                        iconPosition="left" 
                        placeholder="Username" 
                        onChange={this.handleChange} 
                        />

                        <Form.Input 
                        fluid 
                        name="email" 
                        value={email} 
                        icon="mail" 
                        iconPosition="left" 
                        placeholder="Email Address" 
                        onChange={this.handleChange} 
                        />

                        <Form.Input 
                        fluid 
                        name="password" 
                        value={password} 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="Password" 
                        onChange={this.handleChange} 
                        type="password"
                        />

                        <Form.Input 
                        fluid 
                        name="passwordconfirmation" 
                        value={passwordconfirmation} 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="Password Confirmation" 
                        onChange={this.handleChange} 
                        type="password"
                        />
                        
                        <Button color="olive" fluid size="large">Submit</Button>

                       </Segment>
                     </Form>
                     {errors.length > 0 && (
                         <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                         </Message>
                     )}
                     <Message>Already a member? <Link to="/login">Login</Link></Message>
                  </Grid.Column>
                </Grid>     
        );
    }
}

export default Register;