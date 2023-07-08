import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgOrganisation = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.9959 7.99991V21.9999C21.9959 22.2761 21.7721 22.4999 21.4959 22.4999H18.5C18.2239 22.4999 18 22.2761 18 21.9999V7.99991C18 7.72377 18.2239 7.49991 18.5 7.49991H21.4959C21.7721 7.49991 21.9959 7.72377 21.9959 7.99991ZM19.248 9.49991H20.748V10.9999H19.248V9.49991ZM20.748 12.4999H19.248V13.9999H20.748V12.4999ZM19.248 15.4999H20.748V16.9999H19.248V15.4999ZM20.748 18.4999H19.248V19.9999H20.748V18.4999Z"
      fill={fill}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 21.9999V5.78301C7 5.60737 7.09215 5.44462 7.24275 5.35426L11.7428 2.65426C11.9011 2.55926 12.0989 2.55926 12.2572 2.65426L16.7572 5.35426C16.9079 5.44462 17 5.60738 17 5.78301V21.9999C17 22.2761 16.7761 22.4999 16.5 22.4999H14V17.7267C14 17.5826 13.9379 17.4444 13.8271 17.3522C12.4409 16.1976 11.5644 16.2314 10.1764 17.3517C10.0619 17.4441 9.99707 17.5848 9.99707 17.7319V22.4999H7.5C7.22386 22.4999 7 22.2761 7 21.9999ZM13.5 5.99991C13.5 6.82834 12.8284 7.49991 12 7.49991C11.1716 7.49991 10.5 6.82834 10.5 5.99991C10.5 5.17148 11.1716 4.49991 12 4.49991C12.8284 4.49991 13.5 5.17148 13.5 5.99991ZM10 8.49991H8V10.4999H10V8.49991ZM13 8.49991V10.4999H11V8.49991H13ZM16 8.49991H14V10.4999H16V8.49991Z"
      fill={fill}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.99593 7.99991V21.9999C5.99593 22.2761 5.77207 22.4999 5.49593 22.4999H2.5C2.22386 22.4999 2 22.2761 2 21.9999V7.99991C2 7.72377 2.22386 7.49991 2.5 7.49991H5.49593C5.77207 7.49991 5.99593 7.72377 5.99593 7.99991ZM3.24805 9.49991H4.74805V10.9999H3.24805V9.49991ZM4.74805 12.4999H3.24805V13.9999H4.74805V12.4999ZM3.24805 15.4999H4.74805V16.9999H3.24805V15.4999ZM4.74805 18.4999H3.24805V19.9999H4.74805V18.4999Z"
      fill={fill}
    />
  </svg>
);

SvgOrganisation.defaultProps = defaultProps;

export default memo(SvgOrganisation);
