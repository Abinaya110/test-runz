import React, { memo } from "react";

const defaultProps = {
  width: 44,
  height: 44,
  fill: '#000'
};

const SvgUnknown = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width}  height={height} viewBox="0 0 44 44" fill={fill}>
    <path fill="#D9D9D9" d="M0 0h50v50H0z" />
    <path fill="#9F9F9F" d="M20.5 20a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <path
      fill="#9F9F9F"
      fillRule="evenodd"
      d="M17 16a1 1 0 0 0-1 1v8.837c.183-.189.378-.374.584-.552.887-.766 2.011-1.447 3.277-1.781 1.277-.337 2.695-.318 4.12.321.961.432 1.897 1.133 2.783 2.15 1.086-.95 2.338-1.485 3.652-1.503 1.25-.017 2.474.434 3.584 1.314V17a1 1 0 0 0-1-1H17Zm5 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#9F9F9F"
      d="M27.985 27.639a14.897 14.897 0 0 0-.307-.47c.885-.801 1.837-1.184 2.759-1.197 1.072-.014 2.233.471 3.33 1.633-1.497 2.001-4.541 2.014-5.782.034Z"
    />
    <path
      fill="#9F9F9F"
      d="M34 29.484c-2.22 1.728-5.652 1.559-7.286-1.049-1.112-1.775-2.267-2.757-3.348-3.241-1.073-.481-2.134-.5-3.122-.24-.999.264-1.925.814-2.678 1.466-.759.656-1.3 1.377-1.557 1.932L16 28.348V33a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3.516Z"
    />
  </svg>
);

SvgUnknown.defaultProps = defaultProps;

export default memo(SvgUnknown);