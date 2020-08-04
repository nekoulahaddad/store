import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeOneFromCart,addToCart,updateUser,userCartInfo} from '../actions/authActions';
import PropTypes from 'prop-types';
import {CustomInput,Col, Row,Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import {clearErrors} from '../actions/errorActions'



class Cart extends Component {

state = {
  modal:false,
  msg: null,
  total:0,
  ShowTotal:false
  };

static propTypes = {
isAuthenticated:PropTypes.bool,
error: PropTypes.object.isRequired,
cartInfo: PropTypes.object.isRequired,
clearErrors: PropTypes.func.isRequired,
addToCart:PropTypes.func.isRequired,
removeOneFromCart:PropTypes.func.isRequired,
user: PropTypes.object.isRequired,
userCartInfo:PropTypes.func.isRequired
};

componentDidMount() {
    this.props.userCartInfo()
    if (this.props.cartInfo && this.props.cartInfo.cartDetail.length > 0) {
            this.calculateTotal(this.props.cartInfo.cartDetail)
        }else console.log("total is null")
};

componentDidUpdate(prevProps) {
  if (this.props.user !== prevProps.user)  {
    this.props.userCartInfo();
    if (this.props.cartInfo.cartDetail && this.props.cartInfo.cartDetail.length > 0) {
            this.calculateTotal(this.props.cartInfo.cartDetail)
        }
  }


};

onDeleteClick = id => {
    this.props.deleteItem(id);
    this.props.history.push("/Dashboard")
};

onAddToCart = id => {
    this.props.addToCart(id);
};


onRemoveOneFromCart = id => {
  this.props.removeOneFromCart(id);
}

calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map(item => {
        total += parseInt(item.price, 10) * item.quantity
    });

    this.setState({ total:total });
    this.setState({ShowTotal:true})
}





render() {
        const cartInfo = this.props.cartInfo;
        const img1 = "http://localhost:5000/";
        return (          
<div className="container-fluid">

{this.state.msg ? (
<Alert color='danger'>{this.state.msg}</Alert>
) : null}

  <div>
    {cartInfo ? (
      <div>

    {cartInfo.cartDetail.map( (item) => 
        <div className="ml-3 mr-3 mt-3">
          <Row>
                <Col md={3} sm={6}>
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
                </Col>

                <Col md={3} sm={6}>
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
                  <div> 
                  <span className="font-weight-bold mr-1">seller:</span>{item.writer.name}
                  </div>            
                       
                         
                    <div>
                    {item.quantity > 1 ? ( 
                      <span>
                      <Button
                    className='fa fa-minus'
                    color='success'
                    size='sm'
                    onClick={this.onRemoveOneFromCart.bind(this, item._id)}
                    >                      
                    </Button>
                    </span>
                      ):null}
                       
                    <span className="font-weight-bold mr-1 ml-1">{item.quantity}</span>
                    <Button
                    className='fa fa-plus'
                    color='success'
                    size='sm'
                    onClick={this.onAddToCart.bind(this, item._id)}
                    >                    
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
                  </Col>
          </Row>
        </div>     
    )}    







{this.state.ShowTotal ? (<div className="font-weight-bold ml-3 mr-3 mt-3">Total cost: {this.state.total}$</div>):null}
      </div>
    ):null}
  </div>

</div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    cartInfo:state.auth.cartInfo
});


export default connect(mapStateToProps, {removeOneFromCart,addToCart,userCartInfo,clearErrors })(Cart);