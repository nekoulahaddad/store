import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { addComment, addItem, getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { CustomInput, Col, Row, Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ReactTimeAgo from 'react-time-ago';
import FileUpload from './FileUpload';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Progress from './Progress';



class Dashboard extends Component {

    state = {
        modal: false,
        content: '',
        id: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        addComment: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getItems();
    };


    onDeleteClick = id => {
        this.props.deleteItem(id);
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value });
    };



    Comment = id => {
        const { content } = this.state;
        this.props.addComment(id, { content });
    }


    //toString()

    render() {
        const { items } = this.props.item;
        const img1 = "http://localhost:5000/"
        return (
            <div>
  { this.props.isAuthenticated ?  (
    
 <React.Fragment>
 <Row>
            {items.map( (item) => 
                <ListGroupItem className="m-2" key={item._id}>
                {console.log(item.images.length)}
                {item.images.length == 0 ? <img className="img_item" src="https://via.placeholder.com/300x300/FFFFFF/000000/?text=syriashop.com" />:null}
                  {item.images.map((image) => (
                    <div>
                    <img className="img_item" src={img1,image} />
                    </div>
                  ))}
                  <div> {item.name}</div> 
                  <div>
                  <span className='text-danger mr-3'> Price: {item.price}$ </span> 
                  <span className='last_price'> {item.price_sale}$ </span> 
                  </div>
                  <a href="#"><i className="fa fa-thumbs-up batata ml-1">{item.likes}</i></a>
                  <a href="#"><i className="fa fa-comments  batata ml-1" aria-hidden="true">{item.comment_count}</i></a>
                  <span><ReactTimeAgo date={item.date} locale="en"/></span>
                  <Input type="text" name="content" id="comment" ref="fieldComment" onChange={this.onChange} />
                     <Button
                      className='fa fa-trash'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, item._id)}
                    >
                      <span className='ml-1'>delete post</span>
                    </Button>
                     <Button
                      className='fa fa-thumbs-up ml-2'
                      size='sm'
                      color='primary'
                    >
                      <span className='ml-1'>like</span>
                      </Button>
                  
                  <Button
                      className='fa fa-comments ml-2'
                      color='primary'
                      size='sm'
                      onClick={this.Comment.bind(this,item._id)}
                    >
                      <span className='ml-1'>add comment</span>
                      </Button>
                    {item.comment.map( (comment) => ( <div className='ml-3' key={comment._id}> {comment.user}: {comment.content} </div> ))}
                </ListGroupItem>
          )}
</Row>
</React.Fragment>
 ):null }
</div>
        )
    }


}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addComment, getItems, addItem, deleteItem })(Dashboard)