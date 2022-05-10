/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AdComponent from './AdComponent';
import LogoComponent from './LogoComponent';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding-top: 6px;
  padding-left: 10%; 
  padding-right: 10%; 
  padding-bottom: 10px;

  background-color: #2BAE66;
  color: #FCF6F5;

`;

function Header() {
  return (
    <header css={headerStyle}>
        <AdComponent/>
        <LogoComponent/>
        <AdComponent/>
      </header>
  )
}

export default Header