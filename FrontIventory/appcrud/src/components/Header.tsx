import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { IHeaderProps } from "../Interfaces/IHeaderProps";

export const Header: React.FC<IHeaderProps> = ({ userName, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Manufactura</NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink disabled className="text-white">
                        Hola, {userName}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Button color="danger" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </NavItem>
            </Nav>
        </Navbar>
    );
};
