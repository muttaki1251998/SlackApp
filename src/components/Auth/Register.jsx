import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Icon, Message } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';


class Register extends Component{

    state = {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
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
        event.preventDefault();

        if(this.isFormValid()){
        this.setState({errors: [], loading: true})
        
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser);
            createdUser.user
            .updateProfile({
                displayName: this.state.username,
                photoURL: `http://gravatar.com/avatar/${md5(
                    createdUser.user.email
                )}?d=identicon`
            })
            .then(()=> {
                this.saveUser(createdUser).then(() => {
                    console.log('User saved');
                });
            })
            .catch(err => {
                this.setState({errors: this.state.errors.concat(err), loading: false});
            });
        }).catch(err => {
            console.log(err);
            this.setState({ errors: this.state.errors.concat(err), loading: false })
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

        const {username, email, password, passwordconfirmation, errors, loading} = this.state;

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
                        className={this.handleErrorFields(errors, "username")}
                        />

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

                        <Form.Input 
                        fluid 
                        name="passwordconfirmation" 
                        value={passwordconfirmation} 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="Password Confirmation" 
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
                     <Message>Already a member? <Link to="/login">Login</Link></Message>
                  </Grid.Column>
                </Grid>     
        );
    }
}

export default Register;