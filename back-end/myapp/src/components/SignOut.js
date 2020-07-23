import React, {Component,Fragment} from 'react';
import {logout} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import {NavLink as RouterNavLink} from 'react-router-dom';


class SignOut extends Component {


static propTypes = {
	logout:PropTypes.func.isRequired,
}


render() {
	return (
<div>
<Fragment>
<NavLink tag={RouterNavLink} to="/" onClick={this.props.logout} >
Logout
</NavLink>
</Fragment>
</div>
		   );
}



}


export default connect(null,{logout})(SignOut);





