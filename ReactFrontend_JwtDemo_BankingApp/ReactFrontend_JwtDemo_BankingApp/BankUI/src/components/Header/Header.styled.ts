import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    margin: 0;
    color: #1a73e8;
    font-size: 1.5rem;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Username = styled.span`
  color: #0f172a;
  font-weight: 600;
`;

export const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.15s ease;

  &:hover {
    background: #dc2626;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e8f0fe;
    color: #1a73e8;
  }

  &.active {
    background-color: #1a73e8;
    color: white;
  }
`;
