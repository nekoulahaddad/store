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
isLoading:PropTypes.bool,
isAuthenticated:PropTypes.bool,
loadUser:PropTypes.func.isRequired,
error: PropTypes.object.isRequired,
clearErrors: PropTypes.func.isRequired,
user: PropTypes.object.isRequired,
updateUser:PropTypes.func.isRequired,
};


componentDidMount() {
this.props.loadUser()
this.onFetchUser()
  };


onFetchUser = () => {
  const img1 = "http://localhost:5000/";
      const user = this.props.user;
      if (user) {
          const { name,email,lastname,images} = user;
    document.getElementById("name").value = name;
    document.getElementById("lastname").value = lastname;
    document.getElementById("email").value = email;
    if (user.images){
    document.getElementById("image-preview").src = `${img1}${images[0]}`;
  } else document.getElementById("image-preview").src = "https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile.jpg";
    this.setState({
      name:document.getElementById("name").value,
      lastname:document.getElementById("lastname").value,
      email:document.getElementById("email").value,
      images:document.getElementById("image-preview").src
  })
   } else console.log("and batata")
}







onChangeHandler = event => {
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
    console.log(this.state.name,this.state.Images)
    // Add item via addItem action
    this.props.updateUser(new_User);
};


render() {
 // const { user } = this.props.user;
        return (
          
            <div className="container-fluid">
{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}
<div>
{ this.props.isAuthenticated ? (
<Form className="navor" onSubmit={this.onSubmit} id="update-user-form">
<FormGroup >
   <Col className="mb-2" md={4}>
   <CustomInput type="file" name="file" onChange={this.onChangeHandler} id="create-file-form"/>
   </Col>
   <Col className="mb-2" md={4}>
   <Progress percentage={this.state.uploadPercentage} />
   </Col>
   <Col md={4}>
   <img className="img-fluid rounded-circle"  id="image-preview" />  
   </Col>
   <br/>        
   <Button type="button" className="mr-3 ml-3" onClick={this.onClickHandler}>Upload Image</Button> 
</FormGroup> 
<FormGroup className="mr-3 ml-3">
  <Label for="name">Name</Label>
  <Input required type="text" name="name" id="name" onChange={this.onChange} />
</FormGroup> 
<FormGroup className="mr-3 ml-3">
  <Label for="lastname">lastName</Label>
  <Input required type="text" name="lastname" id="lastname"  onChange={this.onChange} />
</FormGroup> 
<FormGroup className="mr-3 ml-3">
  <Label for="email">Email</Label>
  <Input type="email" name="email" id="email" onChange={this.onChange} />
</FormGroup>
<FormGroup>
<Button className="mr-3 ml-3">Submit</Button>
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
    user: state.auth.user,
    isLoading: state.auth.isLoading
});


export default connect(mapStateToProps, {updateUser,loadUser, clearErrors })(Profile);