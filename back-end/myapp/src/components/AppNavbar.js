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
      <Navbar color="dark" dark  expand="md">
          <Nav className="ml-auto" navbar>
          <NavbarBrand tag={RouterNavLink} to="/">syria shop</NavbarBrand>
          </Nav>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
                  
            { !this.props.isAuthenticated  ? (
              <Nav className="ml-auto" navbar>  
              <NavItem>
               <NavLink tag={RouterNavLink}  to="/SignIn">SignIn</NavLink>
               </NavItem>
               <NavItem>
               <NavLink tag={RouterNavLink} to="/SignUp">SignUp</NavLink>
              </NavItem>
              </Nav>
              ):
              <Nav className="ml-auto" navbar> 
              <NavItem>
                <NavLink tag={RouterNavLink} to="/User">Profile</NavLink>
              </NavItem>
               <NavItem>
                <NavLink tag={RouterNavLink} to="/Items">add item</NavLink>
              </NavItem>
              <NavItem>
              <SignOut />
              </NavItem>
              </Nav>
                }
            
          </Collapse>
        </Navbar>
		)
}


}


const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,null)(AppNavbar);