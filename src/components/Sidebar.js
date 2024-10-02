import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <ListGroup>
            <ListGroup.Item
                action
                active={location.pathname === '/dashboard'}
                onClick={() => handleNavigation('/dashboard')}
            >
                Dashboard
            </ListGroup.Item>
            <ListGroup.Item
                action
                active={location.pathname === '/transactions'}
                onClick={() => handleNavigation('/transactions')}
            >
                Transacciones
            </ListGroup.Item>
            <ListGroup.Item
                action
                active={location.pathname === '/funds'}
                onClick={() => handleNavigation('/funds')}
            >
                Fondos
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Sidebar;
