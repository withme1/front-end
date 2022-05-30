/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

const formStyle = css`
  display: flex;
  padding: 3px 6px;
  display: flex;
  flex-direction: row;
`;

function OtherChat({ text, time }) {
  const isPC = useMediaQuery({ query: "(min-width: 700px)" });

  const itemStyle = css`
    display: inline-block;
    word-break: break-all;
    background-color: #2BAE66;
    border-radius: 10px;
    border-bottom-left-radius: 0px;
    padding: 4px 7px;
    color: #FCF6F5;
    font-size: ${isPC ? '1' : '1.2'}em;
  `;

  return (
    <div css={formStyle}>
      <div css={css`display:flex; flex-direction:column; word-break: break-word;`}>
        <div css={itemStyle}>
          {text}
        </div>
        <div css={css`display:flex; flex-direction:row; font-size:${isPC ? '0.3' : '0.6'}em`}>
          {time.format('A hh:mm')}
        </div>
      </div>
    </div>
  )
}

export default OtherChat