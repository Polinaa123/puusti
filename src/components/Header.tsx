import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const LogoBox = styled.div`
  width: 50px;
  height: 35px;
  border: 2px solid #49CA38;
  margin-bottom: -3px;
`;

const LogoText = styled.span`
  color: #49CA38;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Kanit', sans-serif;
`;

const Navigation = styled.nav`
  display: flex;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  gap: 120px;
`;

const NavLink = styled(Link)`
  color: #49CA38;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Kanit', sans-serif;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC<{ onLogoClick?: () => void }> = ({ onLogoClick }) => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoBox />
        <LogoText>puusti</LogoText>
      </Logo>
      <Navigation>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/something">something</NavLink>
        <NavLink to="/for-investors">for investors</NavLink>
        <NavLink to="/contact-us">contact us</NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
