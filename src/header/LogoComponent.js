/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const LogoStyle = css`
    font-size: 3em;
    font-weight: bold;
`;

const iconStyle = css`
  font-size: 0.7em;
  padding-left: 10px;
  padding-right: 10px;
`;

function LogoComponent() {
  return (
    <div css={LogoStyle}>
      <LocalTaxiIcon sx={iconStyle}/>
      WITHME
      <LocalTaxiIcon sx={iconStyle}/>
    </div>
  )
}

export default LogoComponent