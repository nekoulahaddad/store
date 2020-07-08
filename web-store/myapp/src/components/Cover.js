import React , {Component} from 'react';
import Pic from './pic.jpg';
import {Container} from 'reactstrap';


class Cover extends Component{

	render(){
    return(
        <img src={Pic} className='coveren' />
		
			)
	}
}

export default Cover;