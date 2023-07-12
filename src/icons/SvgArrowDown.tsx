import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#000",
};

const SvgArrowDown = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      fill="#181818"
      d="M1.222.757a1 1 0 0 0 0 1.414l7.07 7.071a1 1 0 1 0 1.415-1.414L2.636.757a1 1 0 0 0-1.414 0Z"
    />
    <path
      fill="#181818"
      d="M8.293 7.828a1 1 0 1 0 1.414 1.414l7.07-7.07A1 1 0 0 0 15.365.756L8.293 7.828Z"
    />
  </svg>
);

SvgArrowDown.defaultProps = defaultProps;

export default memo(SvgArrowDown);
