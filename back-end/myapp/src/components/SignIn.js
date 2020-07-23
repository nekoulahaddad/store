import React , {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Alert,Col } from 'reactstrap';
import {login} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors} from '../actions/errorActions'
import { useHistory,Redirect } from "react-router-dom";


class SignIn extends Component {
state={
	email:'',
	password:'',
	msg:null
};


static propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
}


componentDidUpdate(prevProps) {
  const {error,isAuthenticated} = this.props;
  if (error !== prevProps.error) { // y3nee 2no ma ykoon null masalan
    if (error.id === 'LOGIN_FAIL') {
      this.setState({ msg:error.msg.msg }); // if you open redux web tools .. you will see that the msg is stored if error.msg.msg
  } else {
    this.setState({msg:null})
  }
}
if (!isAuthenticated){console.log("hi")}
      else this.props.history.push("/Items");
}


onChange = e => {
  this.setState({ [e.target.name]: e.target.value });
}


onSubmit = e => {
  e.preventDefault();
  const {email,password} = this.state;

  const User = {
    email,
    password
  };
this.props.login(User);
this.props.clearErrors();
};

//history.push('/')
render() {
return(
  <Col md={6}>
  <div>
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>

{ !this.props.isAuthenticated ? (
<Form className="navor"  onSubmit={this.onSubmit}>
        <FormGroup className="mr-3 ml-3">
          <Label for="Email">Email</Label>
          <Input type="email" name="email" id="Email" placeholder="Enter your Email please!" onChange={this.onChange} />
        </FormGroup>
        <FormGroup className="mr-3 ml-3">
          <Label for="Password">Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Enter your password please!" onChange={this.onChange} />
        </FormGroup>
        <Button className="mr-3 ml-3">Submit</Button>
 </Form>
 ):(<p className="mr-3 ml-3">welcome to our shop mr {this.props.user.name}</p>

 )}
 </div>
 </div>
 </Col>
	);
  
}


}


const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error,
  user:state.auth.user
});

export default connect(mapStateToProps,{login,clearErrors})(SignIn);

/*



*/