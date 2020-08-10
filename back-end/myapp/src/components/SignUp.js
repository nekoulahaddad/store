import React, { Component } from 'react';
import {Container,Row,UncontrolledAlert,Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { register } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import  sign from '../cover/sign3.png';

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error} = this.props;
        if (error !== prevProps.error) { // y3nee 2no ma ykoon null masalan
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg }); // if you open redux web tools .. you will see that the msg is stored if error.msg.msg
            } else {
                this.setState({ msg: null })
            }
        }
    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, email, password} = this.state;

        const newUser = {
            name,
            email,
            password
        };
        this.props.register(newUser);
        this.props.clearErrors();
    };


    render() {
        return (
            
            <div>
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>
{ !this.props.isAuthenticated ? (
    <Container>
<Row>
<Col className="align-self-center" md={6}>
<Form className="navor" onSubmit={this.onSubmit}>
<FormGroup className="mr-3">
  <i class="fa fa-user icon mr-1"></i>
  <Label for="name">Name</Label>
  <Input type="text" name="name" id="name" placeholder=" Whats your name !" onChange={this.onChange} />
</FormGroup>  
<FormGroup className="mr-3">
  <i class="fa fa-envelope icon mr-1"></i>
  <Label for="email">Email</Label>
  <Input type="email" name="email" id="email" placeholder="Enter your email please !" onChange={this.onChange} />
</FormGroup>
<FormGroup className="mr-3">
  <i class="fa fa-key icon mr-1"></i>
  <Label for="password">Password</Label>
  <Input type="password" name="password" id="password" placeholder="Enter your password please !" onChange={this.onChange} />
</FormGroup> 
<Button className="mr-3">Submit</Button>
</Form>
</Col>
<Col md={6} className="d-none d-sm-block">
 <img alt="sign" className="sign_pic" src={sign} />
 </Col>
 </Row>
 </Container>
):(<div className="mt-3"><UncontrolledAlert color="info">welcome {this.props.user.name}  .... you are a member now</UncontrolledAlert></div>)}
 </div>
</div>

        );

    }


}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});


export default connect(mapStateToProps, { register, clearErrors })(SignUp);