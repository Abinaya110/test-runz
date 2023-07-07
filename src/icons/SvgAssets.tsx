import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#181818",
};

const SvgAssets = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_998_8096)">
      <path
        d="M14.2816 12.8335C14.3746 12.7969 14.4617 12.741 14.5368 12.6659C14.7482 12.4545 14.807 12.1484 14.7134 11.8843L15.0222 12.1932L16.353 13.5239L14.2816 12.8335ZM13.4762 12.6659C13.5405 12.7302 13.6137 12.7804 13.6917 12.8165L13.608 12.9003L13.2725 13.2358C13.2364 13.1577 13.1862 13.0846 13.1218 13.0202L12.4147 12.3131C12.1218 12.0203 11.6469 12.0203 11.354 12.3131C11.0612 12.606 11.0612 13.0809 11.354 13.3738L12.0612 14.0809C12.1255 14.1453 12.1986 14.1955 12.2767 14.2316L11.8574 14.6508C11.8213 14.5728 11.7711 14.4996 11.7068 14.4353L10.9997 13.7282C10.7068 13.4353 10.2319 13.4353 9.93901 13.7282C9.64612 14.0211 9.64612 14.4959 9.93901 14.7888L10.6461 15.4959C10.7105 15.5603 10.7836 15.6105 10.8617 15.6466L10.4424 16.0659C10.4063 15.9878 10.3561 15.9147 10.2917 15.8503L9.58464 15.1432C9.29174 14.8503 8.81687 14.8503 8.52398 15.1432C8.23108 15.4361 8.23108 15.911 8.52398 16.2039L9.23108 16.911C9.29544 16.9753 9.36857 17.0255 9.44664 17.0616L9.02735 17.4809C8.99127 17.4028 8.94106 17.3297 8.87671 17.2654L8.1696 16.5582C7.87671 16.2654 7.40184 16.2654 7.10894 16.5582C6.81605 16.8511 6.81605 17.326 7.10894 17.6189L7.81605 18.326C7.8804 18.3904 7.95354 18.4406 8.0316 18.4767L7.61232 18.8959C7.57624 18.8179 7.52603 18.7447 7.46168 18.6804L6.75457 17.9733C6.46168 17.6804 5.9868 17.6804 5.69391 17.9733C5.40102 18.2662 5.40102 18.741 5.69391 19.0339L6.40102 19.741C6.46537 19.8054 6.53851 19.8556 6.61657 19.8917L5.47626 21.032L3.35494 18.9107L11.4867 10.7789L11.6331 10.6325L11.6331 10.4254L11.6331 8.80407L12.1938 9.36473L12.5473 9.71829L12.9009 9.36473L16.4364 5.82919L16.79 5.47564L16.4364 5.12209L15.8751 4.56078L17.4988 4.55992L17.7058 4.55981L17.8521 4.41347L18.9113 3.35432L21.0326 5.47565L20.3476 6.16063C20.3115 6.08257 20.2613 6.00943 20.197 5.94508L19.4899 5.23798C19.197 4.94508 18.7221 4.94508 18.4292 5.23798C18.1363 5.53087 18.1363 6.00574 18.4292 6.29864L19.1363 7.00574C19.3429 7.21231 19.64 7.2732 19.8999 7.18839L20.597 9.28269L19.2648 7.95051L18.9611 7.64677C18.9252 7.54204 18.8655 7.44367 18.7819 7.36012L18.0748 6.65301C17.7819 6.36012 17.3071 6.36012 17.0142 6.65301C16.7213 6.9459 16.7213 7.42078 17.0142 7.71367L17.7213 8.42078C17.7856 8.48513 17.8588 8.53534 17.9368 8.57142L17.5176 8.9907C17.4815 8.91264 17.4313 8.8395 17.3669 8.77515L16.6598 8.06804C16.3669 7.77515 15.892 7.77515 15.5991 8.06804C15.3063 8.36094 15.3063 8.83581 15.5991 9.1287L16.3063 9.83581C16.3706 9.90016 16.4437 9.95038 16.5218 9.98645L16.1025 10.4057C16.0664 10.3277 16.0162 10.2545 15.9519 10.1902L15.2448 9.48308C14.9519 9.19018 14.477 9.19018 14.1841 9.48308C13.8912 9.77597 13.8912 10.2508 14.1841 10.5437L14.8912 11.2508C14.9556 11.3152 15.0287 11.3654 15.1068 11.4015L15.0222 11.4861L14.6875 11.8208C14.6514 11.7427 14.6012 11.6696 14.5368 11.6052L13.8297 10.8981C13.5368 10.6052 13.062 10.6052 12.7691 10.8981C12.4762 11.191 12.4762 11.6659 12.7691 11.9588L13.4762 12.6659Z"
        fill={fill}
        stroke={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_998_8096">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

SvgAssets.defaultProps = defaultProps;

export default memo(SvgAssets);
