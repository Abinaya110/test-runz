import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#000",
};

const SvgArrowUp = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      fill="#181818"
      d="M1.222 9.243a1 1 0 0 1 0-1.415l7.07-7.07A1 1 0 1 1 9.708 2.17L2.636 9.243a1 1 0 0 1-1.414 0Z"
    />
    <path
      fill="#181818"
      d="M8.293 2.171A1 1 0 1 1 9.707.757l7.07 7.071a1 1 0 0 1-1.413 1.415L8.293 2.17Z"
    />
  </svg>
);

SvgArrowUp.defaultProps = defaultProps;

export default memo(SvgArrowUp);
