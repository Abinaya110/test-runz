import { memo } from "react";

const defaultProps = {
  width: 600,
  height: 330,
};

const SvgNotAuthorized = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 600 330" fill="none">
    <rect y="318" width="600" height="12" rx="6" fill="#F3F3F3" />
    <path
      opacity="0.25"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M348.118 23.0769C326.732 -7.69232 273.268 -7.69229 251.882 23.0769L107.527 230.769C86.1409 261.538 112.873 300 155.645 300H444.355C487.127 300 513.859 261.538 492.473 230.769L348.118 23.0769ZM316.052 202.216L319.376 80H281.45L284.859 202.216H316.052ZM285.967 250.795C290.001 254.773 294.831 256.761 300.456 256.761C304.092 256.761 307.444 255.852 310.513 254.034C313.581 252.159 316.052 249.688 317.927 246.619C319.859 243.494 320.853 240.057 320.91 236.307C320.853 230.739 318.78 225.966 314.689 221.989C310.598 218.011 305.853 216.023 300.456 216.023C294.831 216.023 290.001 218.011 285.967 221.989C281.933 225.966 279.944 230.739 280.001 236.307C279.944 241.932 281.933 246.761 285.967 250.795Z"
      fill="#FFB9B9"
    />
    <path
      d="M203.71 235.737L202.929 239.853L209.855 254.765L213.571 253.074L209.955 239.12L209.435 233.794L203.71 235.737Z"
      fill="#9F9F9F"
    />
    <path
      d="M211.356 212.58C211.356 212.58 207.73 211.025 204.916 216.278C202.102 221.531 202.45 233.053 202.45 233.053C202.45 233.053 201.426 233.916 202.076 234.521C202.726 235.125 203.333 236.085 202.669 237.191C202.32 237.774 201.51 238.914 202.836 239.238C204.161 239.562 210.36 238.031 210.36 238.031C210.36 238.031 212.679 237.112 211.361 236.493C210.044 235.874 211.899 232.13 211.899 232.13L213.432 221.314L211.356 212.58Z"
      fill="#FFC60B"
    />
    <path
      d="M214.203 260.462C215.659 260.066 216.229 257.987 215.476 255.817C214.723 253.647 212.933 252.209 211.477 252.605C210.022 253 209.452 255.08 210.205 257.249C210.958 259.419 212.748 260.857 214.203 260.462Z"
      fill="#9F9F9F"
    />
    <path
      d="M248.53 324.369L252.001 323.544L250.06 311.302L244.937 312.519L248.53 324.369Z"
      fill="#9F9F9F"
    />
    <path
      d="M260.401 321.475C260.558 321.61 260.773 322.117 260.83 322.304C261.004 322.88 260.618 323.472 259.968 323.626L249.218 326.179C248.774 326.285 248.318 326.052 248.199 325.659L248.078 325.263C248.078 325.263 247.186 324.199 247.836 322.471C247.836 322.471 249.545 323.297 251.032 321.015L251.341 319.911L256.533 321.69L259.018 321.38C259.562 321.313 260.008 321.136 260.401 321.475Z"
      fill="#181818"
    />
    <path
      d="M214.506 324.298L218.1 324.298L219.809 312.029L214.505 312.029L214.506 324.298Z"
      fill="#9F9F9F"
    />
    <path
      d="M226.819 324.226C226.931 324.393 226.99 324.931 226.99 325.125C226.99 325.721 226.444 326.205 225.77 326.205H214.64C214.181 326.205 213.808 325.875 213.808 325.468V325.058C213.808 325.058 213.257 323.826 214.391 322.306C214.391 322.306 215.8 323.496 217.905 321.633L218.526 320.637L223.02 323.546L225.511 323.818C226.056 323.877 226.539 323.808 226.819 324.226Z"
      fill="#181818"
    />
    <path
      d="M238.424 251.217L247.874 287.269L252.437 316.399L245.267 317.264L225.389 267.656L220.827 317.264L212.68 317.841C212.68 317.841 206.162 259.004 209.095 251.793L238.424 251.217Z"
      fill="#4F200D"
    />
    <path
      d="M249.673 208.586L252.933 205.57L256.678 189.793L252.531 189.342L246.658 202.681L243.705 207.344L249.673 208.586Z"
      fill="#9F9F9F"
    />
    <path
      d="M228.639 223.932C228.639 223.932 231.691 228.912 237.355 225.968C243.019 223.024 249.009 211.433 249.009 211.433C249.009 211.433 250.206 208.486 251.457 207.902C252.116 207.594 253.813 207.261 252.923 206.334C252.033 205.407 245.63 203.379 245.63 203.379C245.63 203.379 243.129 202.986 243.826 204.153C244.522 205.32 242.236 204.597 242.466 205.833C242.697 207.068 240.609 207.494 240.609 207.494L228.639 223.932Z"
      fill="#FFC60B"
    />
    <path
      d="M257.968 187.564C258.723 185.395 258.156 183.315 256.701 182.918C255.246 182.521 253.454 183.957 252.699 186.126C251.943 188.295 252.51 190.375 253.965 190.772C255.42 191.169 257.212 189.733 257.968 187.564Z"
      fill="#9F9F9F"
    />
    <path
      d="M229.045 206.679H220.123L219.761 209.168C219.761 209.168 208.509 211.907 208.79 213.401C209.071 214.895 210.759 239.793 210.759 239.793L209.353 252.242C209.353 252.242 234.671 261.703 238.61 250.499L236.64 237.552C236.64 237.552 241.423 215.393 240.298 214.397C239.172 213.401 229.889 209.417 229.889 209.417L229.045 206.679Z"
      fill="#FFC60B"
    />
    <path
      d="M223.862 206.71C228.285 206.71 231.87 203.536 231.87 199.622C231.87 195.707 228.285 192.534 223.862 192.534C219.439 192.534 215.854 195.707 215.854 199.622C215.854 203.536 219.439 206.71 223.862 206.71Z"
      fill="#9F9F9F"
    />
    <path
      d="M229.793 196.706C230.816 196.63 231.84 196.553 232.863 196.477C232.511 196.334 232.145 196.181 231.91 195.908C231.676 195.636 231.628 195.205 231.911 194.972C232.241 194.699 232.789 194.843 233.151 195.084C232.952 194.164 232.331 193.321 231.461 192.788C230.398 192.137 227.768 192.913 226.486 192.764C225.007 192.591 224.823 191.476 223.344 191.303C222.786 191.238 222.159 191.189 221.721 191.501C221.234 191.846 221.18 192.5 220.751 192.901C220.139 193.473 219.089 193.304 218.217 193.465C216.983 193.693 216.053 194.651 215.623 195.7C215.193 196.749 215.177 197.89 215.166 199.006C215.154 200.257 215.15 201.705 216.172 202.569C216.794 203.095 218.491 204.901 218.674 205.645C218.804 206.174 224.111 206.818 225.262 206.789L229.182 205.645C229.567 204.144 228.93 201.173 228.014 199.864C228.316 200.217 229.711 201.278 229.924 200.878C230.137 200.478 230.041 199.224 230.306 198.85C230.641 198.377 229.165 196.753 229.793 196.706Z"
      fill="#565656"
    />
    <path
      d="M400.244 227.882L400.046 241.598L396.205 253.826L393.135 252.808L394.498 241.6L394.319 226.434L400.244 227.882Z"
      fill="#FFE3C5"
    />
    <path
      d="M396.192 255.797C396.553 254.039 395.892 252.46 394.717 252.27C393.543 252.08 392.298 253.351 391.938 255.109C391.578 256.867 392.238 258.447 393.413 258.637C394.588 258.827 395.832 257.555 396.192 255.797Z"
      fill="#FFE3C5"
    />
    <path
      d="M395.584 211.55C395.584 211.55 402.163 211.63 402.158 214.736C402.154 216.489 401.731 232.41 400.551 242.082C399.642 249.54 397.905 251.486 397.905 251.486L393.748 243.09L395.584 211.55Z"
      fill="#FFA647"
    />
    <path
      d="M395.415 239.573H373.195C375.057 235.88 376.202 232.363 374.412 229.566L395.415 228.484C394.365 232.261 394.237 235.967 395.415 239.573Z"
      fill="#FFE3C5"
    />
    <path
      d="M392.675 206.846L383.848 206.305L380.196 210.362L378.344 210.661C375.568 211.11 373.592 213.311 373.716 215.815L374.436 230.363L395.535 231.73L400.589 212.786L394.502 210.633L392.675 206.846Z"
      fill="#FF8400"
    />
    <path
      d="M338.844 211.234C339.47 211.735 339.917 212.32 340.153 212.887L346.458 217.321L343.996 219.926L337.865 215.147C337.206 214.998 336.504 214.665 335.878 214.164C334.447 213.02 333.951 211.437 334.77 210.628C335.589 209.819 337.413 210.091 338.844 211.234Z"
      fill="#FFE3C5"
    />
    <path
      d="M383.42 214.967L359.262 229.463L341.945 218.754L344.544 214.569L358.174 221.608L370.744 213.032C375.219 209.296 380.829 210.02 383.42 214.967Z"
      fill="#FFA647"
    />
    <path
      d="M387.738 205.09C391.355 205.09 394.287 202.484 394.287 199.271C394.287 196.057 391.355 193.451 387.738 193.451C384.121 193.451 381.189 196.057 381.189 199.271C381.189 202.484 384.121 205.09 387.738 205.09Z"
      fill="#FFE3C5"
    />
    <path
      d="M396.639 197.841V198.97L389.254 197.122L383.716 198.153C383.652 197.404 383.403 196.669 382.987 196.017C383.276 197.062 383.309 197.871 383.002 198.288L382.257 198.425C382.136 198.133 381.902 197.878 381.596 197.723C381.566 197.707 381.528 197.693 381.494 197.703C381.441 197.72 381.437 197.781 381.437 197.828C381.445 198.076 381.452 198.325 381.464 198.573L379.324 198.97V197.841C377.272 193.737 382.681 190.186 387.984 190.15C390.376 190.133 392.538 191.009 394.107 192.4C395.672 193.794 396.639 195.715 396.639 197.841Z"
      fill="#181818"
    />
    <path
      d="M400.794 211.074L400.236 211.033C400.276 210.871 400.316 210.711 400.352 210.548C400.661 209.188 399.981 207.457 399.931 206.15C399.668 207.531 400.117 209.229 399.653 210.54C399.601 210.686 397.583 211.626 397.528 211.769C395.294 211.044 392.968 208.725 390.334 210.079C388.777 210.88 386.999 210.529 385.231 210.162C384.793 210.071 384.732 208.15 384.299 208.075C383.523 207.94 382.383 209.686 381.653 209.754L384.677 199.342C384.677 193.678 384.086 187.736 392.161 189.739C394.191 190.242 396.201 190.637 397.7 192.126C399.199 193.618 400.266 195.702 400.644 198.076C400.872 199.508 402.295 204.369 400.794 211.074Z"
      fill="#181818"
    />
    <path
      d="M395.58 315.776L391.976 315.851L389.967 301.461L395.286 301.349L395.58 315.776Z"
      fill="#FFE3C5"
    />
    <path
      d="M383.214 322.458C383.214 322.999 383.646 323.438 384.179 323.438H391.334C391.334 323.438 392.038 320.923 394.908 319.841L395.106 323.438H398.797L398.35 317.654C398.35 317.654 399.337 314.559 397.287 312.977C395.236 311.395 396.897 311.615 396.897 311.615L396.091 308.035L390.513 308.618L390.472 314.238L387.766 319.816L383.796 321.559C383.442 321.714 383.214 322.067 383.214 322.458Z"
      fill="#4F200D"
    />
    <path
      d="M384.614 313.431L381.149 314.317L375.096 300.851L380.209 299.543L384.614 313.431Z"
      fill="#FFE3C5"
    />
    <path
      d="M374.56 322.683C374.715 323.206 375.258 323.533 375.773 323.413L382.694 321.8C382.694 321.8 382.657 319.208 385.124 317.514L386.343 320.949L389.913 320.117L387.829 314.622C387.829 314.622 387.9 311.407 385.465 310.339C383.03 309.271 384.699 309.11 384.699 309.11L382.897 305.829L377.669 307.65L379.234 313.095L378.209 319.101L374.866 321.682C374.569 321.911 374.448 322.305 374.56 322.683Z"
      fill="#4F200D"
    />
    <path
      d="M393.37 238.723L395.638 239.395C399.183 245.214 400.687 252.942 400.487 262.26L396.459 304.113H389.869L385.045 257.488L376.541 274.988L382.763 304.113L376.541 304.677L364.009 274.391L372.737 239.192L393.37 238.723Z"
      fill="#744F40"
    />
  </svg>
);

SvgNotAuthorized.defaultProps = defaultProps;

export default memo(SvgNotAuthorized);
