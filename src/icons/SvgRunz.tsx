import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgRunz = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4H3ZM8.70729 6.29217L8.30197 5.1456L7.45938 6.0225L3.2131 10.4417C2.92611 10.7403 2.93558 11.2151 3.23426 11.5021C3.53294 11.7891 4.00772 11.7796 4.29471 11.4809L7.69839 7.93869L9.53065 13.1217L9.90357 14.1766L10.7377 13.4308L15.3354 9.31992L19.6921 13.2471C19.9997 13.5245 20.474 13.4999 20.7513 13.1922C21.0287 12.8845 21.0041 12.4103 20.6964 12.133L15.8396 7.75495L15.3394 7.30413L14.8375 7.75292L10.572 11.5668L8.70729 6.29217Z"
      fill={fill}
    />
  </svg>
);

SvgRunz.defaultProps = defaultProps;

export default memo(SvgRunz);
