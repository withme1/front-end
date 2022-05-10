/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const testDivStyle = css`
    border: 1px solid black;
    height: 100px;
`;

function TestDiv({children}) {
  return (
    <div className='testDiv' css={testDivStyle}>{children}</div>
  )
}

export default TestDiv