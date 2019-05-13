import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import firebase from './firebase';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import {setUser} from './actions';
import Spinner from './Spinner';



import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const store = createStore(rootReducer, composeWithDevTools())

class Root extends Component{

    componentDidMount(){
        console.log(this.props.isLoading);
        firebase.auth().onAuthStateChanged(user => {
            if(user){  
                this.props.setUser(user);          // Grabbing user from firebase and setting it on redux  
                this.props.history.push("/")
            }
        });
    }

    render(){
        return this.props.isLoading ? <Spinner /> : (
            <Switch>                
                <Route path = "/" component={App} />
                <Route path = "/login" component={Login} />
                <Route path = "/register" component={Register} />                       
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading   
});

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser})(Root));

ReactDOM.render(
   <Provider store = {store}>
       <Router>
           <RootWithAuth />
       </Router>
   </Provider>,
    document.getElementById('root')
);
