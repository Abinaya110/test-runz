import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#565656",
};

const SvgSubmit = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_1107_2639)">
      <path
        d="M21.7208 8.8775L14.2208 2.21084C14.101 2.10321 13.9526 2.03267 13.7935 2.00779C13.6344 1.98291 13.4715 2.00475 13.3246 2.07067C13.1776 2.13659 13.053 2.24375 12.9658 2.37913C12.8786 2.51451 12.8326 2.6723 12.8333 2.83334V5.50584C10.33 6.1775 2 9.30417 2 21.1667C2.00031 21.3601 2.06791 21.5475 2.19123 21.6965C2.31455 21.8456 2.48589 21.9471 2.67587 21.9837C2.86584 22.0202 3.06262 21.9895 3.23245 21.8969C3.40229 21.8042 3.53459 21.6554 3.60667 21.4758C6.0775 15.2983 10.8942 14.0092 12.8325 13.74V16.1667C12.8323 16.3275 12.8787 16.485 12.9661 16.6201C13.0535 16.7552 13.1781 16.8621 13.3249 16.9279C13.4717 16.9938 13.6344 17.0157 13.7934 16.9911C13.9524 16.9664 14.1008 16.8963 14.2208 16.7892L21.7208 10.1225C21.8087 10.0443 21.879 9.94844 21.9271 9.84115C21.9753 9.73386 22.0001 9.6176 22.0001 9.5C22.0001 9.38241 21.9753 9.26614 21.9271 9.15886C21.879 9.05157 21.8087 8.95568 21.7208 8.8775Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_1107_2639">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);

SvgSubmit.defaultProps = defaultProps;

export default memo(SvgSubmit);
