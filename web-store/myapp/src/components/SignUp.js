import React , {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert 	 } from 'reactstrap'; 
import {register} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors} from '../actions/errorActions'


class SignUp extends Component {
state={
	name:'',
	email:'',
	password:'',
	msg:null
};

static propTypes = {
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	user:PropTypes.object.isRequired
}


componentDidUpdate(prevProps) {
	const {error,isAuthenticated} = this.props;
	if (error !== prevProps.error) { // y3nee 2no ma ykoon null masalan
		if (error.id === 'REGISTER_FAIL') {
			this.setState({ msg:error.msg.msg }); // if you open redux web tools .. you will see that the msg is stored if error.msg.msg
	} else {
		this.setState({msg:null})
	}
}
}




onChange = e => {
	this.setState({ [e.target.name]: e.target.value });
}

onSubmit = e => {
	e.preventDefault();
	const {name,email,password} = this.state;

	const newUser = {
		name,
		email,
		password
	};
this.props.register(newUser);
this.props.clearErrors();
};


	render() {
return(
	<div>
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>
{ !this.props.isAuthenticated ? (
<Form className="navor" onSubmit={this.onSubmit}>
<FormGroup>
  <Label for="name">Name</Label>
  <Input type="text" name="name" id="name" placeholder=" Whats your name !" onChange={this.onChange} />
</FormGroup>  
<FormGroup>
  <Label for="email">Email</Label>
  <Input type="email" name="email" id="email" placeholder="Enter your email please !" onChange={this.onChange} />
</FormGroup>
<FormGroup>
  <Label for="password">Password</Label>
  <Input type="password" name="password" id="password" placeholder="Enter your password please !" onChange={this.onChange} />
<Button>Submit</Button>
</FormGroup> 
</Form>
):(<p> welcome {this.props.user.name}  .... you are a member now</p>)}
 </div>
</div>
);

}


}


const mapStateToProps = state => ({
	isAuthenticated:state.auth.isAuthenticated,
	error:state.error,
	user:state.auth.user
});


export default connect(mapStateToProps,{register,clearErrors})(SignUp);
