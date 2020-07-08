import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment,addItem,getItems,deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';
import {Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';



class Items extends Component {

state = {
	name:'',
	price:'',
  modal:false,
  comment:'',
  id:''
};

static propTypes = {
isAuthenticated:PropTypes.bool,
addItem:PropTypes.func.isRequired,
getItems:PropTypes.func.isRequired,
deleteItem:PropTypes.func.isRequired,
item:PropTypes.object.isRequired,
addComment:PropTypes.func.isRequired
};


onComment = (id) => {
this.setState({modal:!this.state.modal});
this.setState({id:id})
}

componentDidMount() {
    this.props.getItems();
  }


onDeleteClick = id => {
    this.props.deleteItem(id);
  };


onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      price:this.state.price
    };

    // Add item via addItem action
    this.props.addItem(newItem);

};

Comment = id => {
const {comment} = this.state;
this.props.addComment(id,comment);
}




render() {

	const { items } = this.props.item;
	return(
 

	<div>
  { this.props.isAuthenticated ?  (
    <React.Fragment>
<Form className="navor" inline onSubmit={this.onSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Name" className="mr-sm-2">Product Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Price" className="mr-sm-2">Price</Label>
          <Input type="text" name="price" id="price" onChange={this.onChange} />
        </FormGroup>
        <Button>Submit</Button>
 </Form> 
 <React.Fragment>
            {items.map( ({ _id, name, price }) => (
                <ListGroupItem>
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  {name} {price}
                  <Input type="text" name="comment" id="comment" onChange={this.onChange} />
                  <Button
                      className='remove-btn ml-4'
                      color='danger'
                      size='sm'
                      onClick={this.Comment.bind(this,_id)}
                    >
                      addComment
                    </Button>
                </ListGroupItem>
            ))};
</React.Fragment>
<div>
{this.state.modal ? (
<Form className="navor" inline onSubmit={this.Comment}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Comment" className="mr-sm-2">tell us your opinion</Label>
          <Input type="text" name="comment" id="comment" onChange={this.onChange} />
        </FormGroup>
        <Button>Submit</Button>
 </Form> 

 ):null}
</div>
    </React.Fragment>
 
 ):null }
</div>
		)
}


}

const mapStateToProps = state => ({
item:state.item,
isAuthenticated:state.auth.isAuthenticated
});


export default connect(mapStateToProps,{addComment,getItems,addItem,deleteItem})(Items)