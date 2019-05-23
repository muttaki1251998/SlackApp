import React from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';
import {connect} from "react-redux";

class UserPanel extends React.Component{

  state = {
    user: this.props.currentUser
  }

  handleSignOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => console.log('User signed out'));
  }
  
  dropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change profile picture</span>
    },
    {
      key:'signout',
      text: <span onClick={this.handleSignOut}>Sign out</span>
    }
  ]
  
  render(){

    console.log(this.props.currentUser);

    return(
     <Grid style={{ background: 'olive' }}>
        <Grid.Column>
          <Grid.Row style ={{ padding: '1.2em', margin: 0 }}>
            {/* App header */}
            <Header inverted floated="left" as="h3">
              <Icon name="code" />
              <Header.Content>Office Chat</Header.Content>
            </Header>
          </Grid.Row>
          {/** user dropdown */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown trigger={
              <span>{this.state.user.displayName}</span>
            } options={this.dropdownOptions()}/>
          </Header>
        </Grid.Column>
     </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel);
