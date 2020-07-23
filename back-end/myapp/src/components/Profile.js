import React, {Component,useState } from 'react';
import {connect} from 'react-redux';
import {loadUser,updateUser} from '../actions/authActions';
import PropTypes from 'prop-types';
import {CustomInput,Col, Row,Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import FileUpload from './FileUpload';
import Dropzone from 'react-dropzone';
import {clearErrors} from '../actions/errorActions'
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Progress from './Progress';


class Profile extends Component {

state = {
	name:'',
	email:'',
  lastname:'',
  image:'',
  modal:false,
  password:'',
  id:'',
  selectedFile: null,
  Images: [],
  uploadPercentage: 0,
  msg: null
  };

static propTypes = {
isAuthenticated:PropTypes.bool,
loadUser:PropTypes.func.isRequired,
error: PropTypes.object.isRequired,
clearErrors: PropTypes.func.isRequired,
user: PropTypes.object.isRequired,
updateUser:PropTypes.func.isRequired
};


componentDidMount() {
    this.props.loadUser()
    const { name,email,lastname} = this.props.user;
    document.getElementById("name").value = name;
    document.getElementById("lastname").value = lastname;
    document.getElementById("email").value = email;
    this.setState({
      name:document.getElementById("name").value,
      lastname:document.getElementById("lastname").value,
      email:document.getElementById("email").value
  })
  };



onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
        document.getElementById('image-preview').src = window.URL.createObjectURL(event.target.files[0])
    };

onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    const config = {
        header: { 'content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
            this.setState({
                uploadPercentage: parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
            });

            // Clear percentage
            setTimeout(() => this.setState({ uploadPercentage: 0 }), 10000);
        }
    }
    axios.post('/items/uploadImage', data, config)
        .then(response => {

            if (response.data.success) {
                this.setState(prevState => ({
                    Images: [...prevState.Images, response.data.image]
                }))
                console.log("hi")

            } else {
                console.log('Failed to save the Image in Server')

            }
        })
}



onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const new_User = {
      name: this.state.name,
      lastname:this.state.lastname,
      email:this.state.email,
      images: this.state.Images
    };

    // Add item via addItem action
    this.props.updateUser(new_User);
};


render() {
 // const { user } = this.props.user;
        return (
          
            <div>
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>
{ this.props.isAuthenticated ? (
<Form className="navor mr-3 ml-3" onSubmit={this.onSubmit} id="update-user-form">
<FormGroup>
   <Col className="mb-2" md={4}>
   <CustomInput type="file" name="file" onChange={this.onChangeHandler} id="create-file-form"/>
   </Col>
   <Col className="mb-2" md={4}>
   <Progress percentage={this.state.uploadPercentage} />
   </Col>
   <img className="rounded-circle img_item mb-2 mr-3 ml-3" src="https://via.placeholder.com/300x300" id="image-preview" />  
   <br/>        
   <Button type="button" className="mr-3 ml-3" onClick={this.onClickHandler}>Upload Image</Button> 
</FormGroup> 
<FormGroup >
  <Label for="name">Name</Label>
  <Input required type="text" name="name" id="name" onChange={this.onChange} />
</FormGroup> 
<FormGroup>
  <Label for="lastname">lastName</Label>
  <Input required type="text" name="lastname" id="lastname"  onChange={this.onChange} />
</FormGroup> 
<FormGroup>
  <Label for="email">Email</Label>
  <Input isRequired type="email" name="email" id="email" onChange={this.onChange} />
</FormGroup>
<FormGroup>
<Button>Submit</Button>
</FormGroup> 
</Form>
):(<p>please login</p>)}
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


export default connect(mapStateToProps, {updateUser,loadUser, clearErrors })(Profile);