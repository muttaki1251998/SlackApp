import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Icon, Message } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';



class Login extends Component{

    state = {        
        email: '',
        password: '',        
        loading: false,        
        errors: []
    }
               

    // Display erros
    displayErrors = errors => errors.map((error,i) => 
        <p key={i}>{error.message}</p>
    );

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    isFormValid = ({ email, password }) => email && password;
        

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({ errors:[], loading: true });
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })            
            .catch(err=> {
                this.setState({errors: this.state.errors.concat(err), loading: false});
                console.log(err);
            });
        }
        
    }

    // Error styling
    handleErrorFields = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
            ) 
                ? "error" 
                : ""
    }

    render(){

        const {email, password, errors, loading} = this.state;

        return(           
               <Grid textAlign="center" verticalAlign="middle" className="app"> 
                 <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as="h2" icon color ="olive" textAlign="center">
                        <Icon name="code branch" color="olive" />
                             Login to SlackChat
                     </Header>
                     <Form size="large" onSubmit={this.handleSubmit}>
                     <Segment stacked>                        

                        <Form.Input 
                        fluid 
                        name="email" 
                        value={email} 
                        icon="mail" 
                        iconPosition="left" 
                        placeholder="Email Address" 
                        onChange={this.handleChange} 
                        className={this.handleErrorFields(errors, "email")}
                        />

                        <Form.Input 
                        fluid 
                        name="password" 
                        value={password} 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="Password" 
                        onChange={this.handleChange} 
                        className={this.handleErrorFields(errors, "password")}
                        type="password"
                        />                        
                        
                        <Button disabled={loading} className={loading ? 'loading' : ''} color="olive" fluid size="large">Submit</Button>

                       </Segment>
                     </Form>
                     {errors.length > 0 && (
                         <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                         </Message>
                     )}
                     <Message>New here? Come join us <Link to="/register">here!</Link></Message>
                  </Grid.Column>
                </Grid>     
        );
    }
}

export default Login;