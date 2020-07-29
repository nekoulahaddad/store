import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {addComment, addItem, getItems, deleteItem } from '../actions/itemActions';
import {addToCart} from '../actions/authActions';
import PropTypes from 'prop-types';
import {CustomInput, Col, Row, Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ReactTimeAgo from 'react-time-ago';
import FileUpload from './FileUpload';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Progress from './Progress';
import {Link} from 'react-router-dom';


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
        addComment: PropTypes.func.isRequired,
        addToCart:PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getItems();
    };


    onDeleteClick = id => {
        this.props.deleteItem(id);
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
                {item.images.length == 0 ? <img className="img_item" src="https://via.placeholder.com/300x300/FFFFFF/000000/?text=syriashop.com" />:null}
                  {item.images.map((image) => (
                    <div>
                    <img className="img_item" src={img1,image} />
                    </div>
                  ))}
                  <div> 
               <Link to={{
                pathname:`/item/${item._id}`,
                query:{item: item}
              }}>{item.name}</Link>
                  </div> 
                  <div>
                  <span className='text-danger mr-3'> Price: {item.price}$ </span> 
                  {item.price_sale ? <span className='last_price'> {item.price_sale}$ </span>:null }
                  </div>
                  <a href="#"><i className="fa fa-thumbs-up batata ml-1">{item.likes}</i></a>
                  <a href="#"><i className="fa fa-comments  batata ml-1" aria-hidden="true">{item.comment_count}</i></a>
                  <span><ReactTimeAgo date={item.date} locale="en"/></span>
                          <Button
                      className='fa fa-shopping-cart ml-2'
                      color='success'
                      size='sm'
                      onClick={this.onAddToCart.bind(this, item._id)}
                    >
                      <span className='ml-1'>add to cart</span>   
                      </Button>                   
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


export default connect(mapStateToProps, {addToCart, addComment, getItems, addItem, deleteItem })(Dashboard)