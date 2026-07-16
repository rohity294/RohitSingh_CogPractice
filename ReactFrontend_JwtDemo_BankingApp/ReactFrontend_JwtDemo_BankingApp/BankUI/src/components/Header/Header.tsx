import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import {
  HeaderWrapper,
  Nav,
  NavMenu,
  NavLink,
  Profile,
  Username,
  LogoutButton,
} from './Header.styled';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const readUsername = () => (typeof window !== 'undefined' ? sessionStorage.getItem('auth_username') : null);
    const onAuthChange = () => setUsername(readUsername());

    // initialize and listen for auth changes
    setUsername(readUsername());
    window.addEventListener('authChange', onAuthChange);
    return () => window.removeEventListener('authChange', onAuthChange);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUsername(null);
    // show toast
    try {
      window.dispatchEvent(new CustomEvent('toast', { detail: 'Logged out successfully' }));
    } catch (e) {}
    navigate('/');
  };

  return (
    <HeaderWrapper data-testid="Header">
      <Nav>
        <h2>BankUI</h2>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/services">Services</NavLink>
        </NavMenu>

        <Profile>
          {username ? (
            <>
              <Username>{username}</Username>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <NavMenu>
              <NavLink to="/login">Sign In</NavLink>
            </NavMenu>
          )}
        </Profile>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
