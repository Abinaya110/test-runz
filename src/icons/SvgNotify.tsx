import React, { memo } from "react";

const defaultProps = {
  width: 44,
  height: 44,
  fill: '#000'
};

const SvgNotify = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width}  height={height} viewBox="0 0 44 44" fill={fill}>
    <path
      fill={fill}
      d="M12 2c-4 .002-7 3-6 6 .957 2.983 1 4 0 5-1.056 1-2 2.896-2 4 0 1.105 0 2 2 2h12c2 0 2-.895 2-2 0-1.104-.996-3-2-4s-1.009-2.068 0-5c1-3-2-6.002-6-6ZM13 20h4a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 13 20Z"
    />
  </svg>
);

SvgNotify.defaultProps = defaultProps;

export default memo(SvgNotify);