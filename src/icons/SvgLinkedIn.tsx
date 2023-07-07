import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
};

const SvgLinkedIn = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 600 601" fill="none">
    <path
      d="M511.25 511.25H422.35V372C422.35 338.8 421.75 296.05 376.1 296.05C329.8 296.05 322.7 332.25 322.7 369.55V511.25H233.8V224.9H319.15V264.05H320.35C337.75 234.35 370.15 216.55 404.55 217.8C494.65 217.8 511.3 277.05 511.3 354.2L511.25 511.2V511.25ZM133.5 185.75C119.844 185.684 106.765 180.234 97.1034 170.582C87.4422 160.93 81.9789 147.856 81.9 134.2C81.9 105.9 105.2 82.6 133.5 82.6C161.8 82.6 185.05 105.9 185.1 134.2C185.1 162.5 161.8 185.75 133.5 185.75ZM177.95 511.25H88.95V224.9H177.95V511.25ZM555.5 1.07397e-05H44.25C32.6575 -0.0673207 21.5069 4.44299 13.2212 12.5508C4.93545 20.6586 0.184233 31.7088 0 43.3V556.7C0.184233 568.291 4.93545 579.341 13.2212 587.449C21.5069 595.557 32.6575 600.067 44.25 600H555.55C567.169 600.094 578.356 595.599 586.679 587.491C595.003 579.383 599.79 568.318 600 556.7V43.25C599.79 31.6414 594.999 20.5864 586.673 12.4944C578.347 4.40245 567.16 -0.0706451 555.55 0.0500071L555.5 1.07397e-05Z"
      fill="#0A66C2"
    />
  </svg>
);

SvgLinkedIn.defaultProps = defaultProps;

export default memo(SvgLinkedIn);