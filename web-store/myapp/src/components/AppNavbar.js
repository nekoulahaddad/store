import React , {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink as RouterNavLink} from 'react-router-dom';
import SignOut from './SignOut';


 

class AppNavbar extends Component {

state = {
      isOpen: false
    };

static propTypes = {
  isAuthenticated:PropTypes.bool
}

toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



render () {

	return (

      <Navbar color="dark" dark className="navor" expand="md">
          <NavbarBrand href="/">syria shop</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <div>
            { !this.props.isAuthenticated  ? (
              <div>
              <NavItem>
               <NavLink tag={RouterNavLink}  to="/SignIn">SignIn</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/SignUp">SignUp</NavLink>
              </NavItem>
              </div>
              ):null}
            </div>
              <NavItem>
                <SignOut />
              </NavItem>
               </Nav>
          </Collapse>
        </Navbar>

		)
}


}


const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,null)(AppNavbar);