import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import SearchFeature from './Sections/SearchFeature';
import { Col, Button,Card, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody } from 'reactstrap';
  import ReactTimeAgo from 'react-time-ago';
  import {Link} from 'react-router-dom';
  import {addToCart} from '../../actions/authActions';
  import {useSelector, useDispatch } from "react-redux";

function LandingPage(props) {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const Limit = 8
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const img1 = "http://localhost:5000/"
    console.log("hey you"+isAuthenticated)

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [])

    const getProducts = (variables) => {
        Axios.post('/items/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true

        }
        getProducts(variables)
        setSkip(skip)
    }


    const onAddToCart = id => {
        if (isAuthenticated) {
        dispatch(addToCart(id));
    }else props.history.push('/SignIn')
    };

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }


    return (
        <div className="mt-3">

            <div className="m-3">

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
                (
                <div className="m-3">
                    <h2>No post yet...</h2>
                </div> ):
                (<div>
                <CardGroup>
                {Products.map((item) => (
                 <Col md={3} sm={6} key={item._id}>
                <Card className="m-2" >
                {item.images.length === 0 ? <CardImg className="img_item img-thumbnail"  top width="100%"   src="https://via.placeholder.com/256x186/FFFFFF/000000/?text=myshop.com" />:null}
                  {item.images.map((image) => (
                    <div key={item.images.indexOf(image)}>
                    <CardImg className="img_item img-thumbnail"   top width="100%" src={`${img1}${image}`} />
                    </div>
                  ))}
                  <CardBody>
                  <CardTitle> 
               <Link className="btn-link mr-3" to={{
                pathname:`/item/${item._id}`,
                query:{item: item}
              }}>{item.name}</Link>
              <span><ReactTimeAgo date={item.date} locale="en"/></span>
                  </CardTitle> 

                  <CardSubtitle>
                  <span className='text-danger mr-3'> Price: {item.price}$ </span> 
                  {item.price_sale ? <span className='last_price'> {item.price_sale}$ </span>:null }
                   </CardSubtitle>
                   <CardText>
                  <span className="font-weight-bold">sold:</span> <span className="mr-3">{item.sold} items</span>
                  </CardText> 
                          <Button
                      className='fa fa-shopping-cart ml-2'
                      color='success'
                      size='sm'
                      onClick={()=> onAddToCart(item._id)}
                    >
                      <span className='ml-1'>add to cart</span>   
                      </Button>   
                  </CardBody>                
                </Card>
                </Col>
                 ))}
                 </CardGroup>
            {PostSize >= Limit ?
                <div className="text-center">
                    <Button  color="link" onClick={onLoadMore}>Load More</Button>
                </div>
                :null
            }
            </div>) }
            
         
        </div>
    )
}

export default LandingPage
