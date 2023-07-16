import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#181818",
};

const SvgProcedures = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.05718 4C7.30402 2.8567 8.32107 2 9.53821 2H14.4618C15.6789 2 16.696 2.8567 16.9428 4H19C19.5523 4 20 4.44772 20 5V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V5C4 4.44772 4.44772 4 5 4H7.05718ZM12.6185 3.16629C12.6185 3.50793 12.3416 3.78488 11.9999 3.78488C11.6583 3.78488 11.3813 3.50793 11.3813 3.16629C11.3813 2.82465 11.6583 2.5477 11.9999 2.5477C12.3416 2.5477 12.6185 2.82465 12.6185 3.16629ZM7.75 7.75C7.33579 7.75 7 8.08579 7 8.5C7 8.91421 7.33579 9.25 7.75 9.25H16.25C16.6642 9.25 17 8.91421 17 8.5C17 8.08579 16.6642 7.75 16.25 7.75H7.75ZM7 11.5C7 11.0858 7.33579 10.75 7.75 10.75H16.25C16.6642 10.75 17 11.0858 17 11.5C17 11.9142 16.6642 12.25 16.25 12.25H7.75C7.33579 12.25 7 11.9142 7 11.5ZM7.75 13.75C7.33579 13.75 7 14.0858 7 14.5C7 14.9142 7.33579 15.25 7.75 15.25H16.25C16.6642 15.25 17 14.9142 17 14.5C17 14.0858 16.6642 13.75 16.25 13.75H7.75ZM7 17.5C7 17.0858 7.33579 16.75 7.75 16.75H16.25C16.6642 16.75 17 17.0858 17 17.5C17 17.9142 16.6642 18.25 16.25 18.25H7.75C7.33579 18.25 7 17.9142 7 17.5Z"
      fill={fill}
    />
  </svg>
);

SvgProcedures.defaultProps = defaultProps;

export default memo(SvgProcedures);
