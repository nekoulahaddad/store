import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadUser,updateUser,userCartInfo} from '../actions/authActions';
import PropTypes from 'prop-types';
import {CustomInput,Col, Row,Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import {clearErrors} from '../actions/errorActions'



class Cart extends Component {

state = {
  modal:false,
  msg: null
  };

static propTypes = {
isAuthenticated:PropTypes.bool,
loadUser:PropTypes.func.isRequired,
error: PropTypes.object.isRequired,
clearErrors: PropTypes.func.isRequired,
user: PropTypes.object.isRequired,
userCartInfo:PropTypes.func.isRequired
};


componentDidMount() {
this.props.loadUser()
  };


onClickHandler = () => {
this.props.userCartInfo()
}



render() {
 // const { user } = this.props.user;
        return (
          
            <div className="container-fluid">
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>
{ this.props.isAuthenticated ? (
<Button type="button" className="mr-3 ml-3" onClick={this.onClickHandler}>get Cart info</Button> 
):(<p>please login</p>)}
 </div>
</div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
});


export default connect(mapStateToProps, {userCartInfo,loadUser, clearErrors })(Cart);