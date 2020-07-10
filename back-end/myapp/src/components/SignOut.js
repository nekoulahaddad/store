import React, {Component,Fragment} from 'react';
import {logout} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';


class SignOut extends Component {


static propTypes = {
	logout:PropTypes.func.isRequired,
	isAuthenticated:PropTypes.bool
}


render() {
	return (
		<div>
{ this.props.isAuthenticated ? (
<Fragment>
<NavLink onClick={this.props.logout} href='#'>
Logout
</NavLink>
</Fragment>
):null}
        </div>
		);
}



}


const mapStateToProps = state => ({
	isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(SignOut);





