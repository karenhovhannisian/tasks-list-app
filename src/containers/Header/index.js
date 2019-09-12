import React, {Component} from "react";
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import {Link} from "react-router-dom"
import {LOGIN_PATH} from "../../common/constants";
import {ACTIONS} from "../../redux";
import {connect} from "react-redux";

class Header extends Component {

    signout() {
        this.props.logout()
    }

    render() {
        const {isLoggedIn} = this.props
        return (
            <div className="mb-4">
                <Navbar style={{cursor: "pointer"}} color="light" light expand>
                    <Nav className="px-5">
                        <NavItem>
                            <Link to="/" className="text-decoration-none text-dark">
                                Home
                            </Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {isLoggedIn ? <NavItem style={{cursor: "pointer"}} onClick={() => this.signout()}
                                                   className="p-2 text-decoration-none text-dark">Logout</NavItem> :
                                <Link className="p-5 text-decoration-none text-dark" to={LOGIN_PATH}>Login</Link>
                            }
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    postTask: (data) => dispatch(ACTIONS.attemptPostTask(data)),
    getTasks: () => dispatch(ACTIONS.attemptGetTasks()),
    logout: () => dispatch(ACTIONS.attemptLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
