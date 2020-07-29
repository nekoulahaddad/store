import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {addReply, addComment, addItem, getItem, deleteItem } from '../actions/itemActions';
import {addToCart} from '../actions/authActions';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, CustomInput, Col, Row, Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import ReactTimeAgo from 'react-time-ago';
import FileUpload from './FileUpload';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Progress from './Progress';
import {Link} from 'react-router-dom';


class Item extends Component {

    state = {
        modal: false,
        content: '',
        id: '',
        Reply_content:'',
        show_reply:false
    };

    static propTypes = {
        loading: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        getItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        addComment: PropTypes.func.isRequired,
        addReply:PropTypes.func.isRequired,
        addToCart:PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    };


    onDeleteClick = id => {
        this.props.deleteItem(id);
        this.props.history.push("/Items")
    };

    onAddToCart = id => {
        this.props. addToCart(id);
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value });
    };

    Comment = id => {
        const { content } = this.state;
        this.props.addComment(id, { content });
        document.getElementById("comment").value = "";
    }

    Reply = (id,_id) => {
        const { Reply_content } = this.state;
        this.props.addReply(id,_id, { Reply_content });
        document.getElementById("reply").value = "";
    }


    ShowAndHide = (id) => {
      console.log(id)
      this.setState({show_reply:!this.state.show_reply})
      if(!this.state.show_reply){
         document.getElementById(id).className = 'd-block'
      } else document.getElementById(id).className = 'd-none'
}





    //toString()

    render() {
        const  item  = this.props.item.product;
        const img1 = "http://localhost:5000/";
        const img3 = "uploads/2020-07-28T23-21-47.249Z_channels.jpg"
        return (
            <div>
  {!this.props.loading && this.props.isAuthenticated ?  (
    
 <React.Fragment>
 <div className="ml-3 mr-3 mt-3">
                {!item.images ? <div> <img className="img-thumbnail img_item" src="https://via.placeholder.com/300x300/FFFFFF/000000/?text=syriashop.com" /> </div>: 
                  <div>
                  {item.images.length == 0 ? <img className="img-thumbnail img_item"  src="https://via.placeholder.com/300x300/FFFFFF/000000/?text=syriashop.com" />:null}
                  {item.images.map((image) => (
                    <div>
                    <img className="img-thumbnail img_item" src={`${img1}${image}`} />
                    </div>
                  ))}
                  </div>
                }
                  <div className="text-success"> 
               {item.name}
                  </div> 
                  <div> 
               {item.description}
                  </div> 
                  <div>
                  <span className='text-danger mr-3'> Price: {item.price}$ </span> 
                  {item.price_sale ? <span className='last_price'> {item.price_sale}$ </span>:null }
                  </div>
                  <a href="#"><i className="fa fa-thumbs-up batata ml-1">{item.likes}</i></a>
                  <a href="#"><i className="fa fa-comments  batata ml-1" aria-hidden="true">{item.comment_count}</i></a>              
                  {item.date ? (<span><ReactTimeAgo date={item.date} locale="en"/></span> ):null}     
                         <div>
                         <Button
                      className='fa fa-shopping-cart'
                      color='success'
                      size='sm'
                      onClick={this.onAddToCart.bind(this, item._id)}
                    >
                      <span className='ml-1'>add to cart</span>                      
                    </Button> 
                    <Button
                      className='fa fa-trash ml-2'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, item._id)}
                    >  
                    <span className='ml-1'>delete item</span>  
                    </Button> 
                    </div>     
                  <Input className='mb-2 mt-2' type="text" name="content" id="comment" ref="fieldComment" onChange={this.onChange} />              
                  <Button
                      className='fa fa-comments mb-2'
                      color='primary'
                      size='sm'
                      onClick={this.Comment.bind(this,item._id)}
                    >
                      <span className='ml-1'>comment</span>
                      </Button>   
                      { item.comment ? (
                        <div>
                       {item.comment.map( (comment) => ( 
                          <div className='ml-1 pb-2 border-bottom mb-2' key={comment._id}>
                            <span> <img className="image_comment rounded-circle" src={`${img1}${comment.user_image}`} /> </span>
                           <span className="font-weight-bold">{comment.user}</span> {comment.content} 
                       <div className="small"> 
                          <span className="font-weight-light"><ReactTimeAgo date={comment.date} locale="en"/></span>
                          <span className="btn-link ml-3">{comment.reply_count} replies</span>
                          <i onClick={this.ShowAndHide.bind(this,comment._id)} className="btn-link ml-3">add reply</i>
                       </div> 
                     <div className="d-none" id={comment._id}>  
                    <Input className='mb-2 mt-2' type="text" name="Reply_content" id="reply" ref="fieldComment" onChange={this.onChange} />
                    <Button
                      color='primary'
                      size='sm'
                      onClick={this.Reply.bind(this,item._id,comment._id)}
                    >
                      <span className='ml-1'>reply</span>
                      </Button>
                    </div>

                          </div> ))}
                       
                       </div>
                      ):null}
</div>
</React.Fragment>
 ):null }
</div>
        )
    }


}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    loading:state.item.loading
});


export default connect(mapStateToProps, {addReply, addToCart, addComment, getItem, addItem, deleteItem })(Item)