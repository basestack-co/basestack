import { IllustrationProps } from "./types";

const WindowLoading = ({ color, width }: IllustrationProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="auto"
    viewBox="0 0 633 319"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M116.515 15.25C113.318 23.638 110.318 30.984 109.85 31.575C109.381 32.166 102.125 35.277 93.7254 38.489C85.3254 41.701 78.1314 44.598 77.7394 44.927C77.3474 45.256 82.2974 47.509 88.7394 49.934C110.384 58.08 110.198 57.969 112.331 64.099C113.364 67.069 114.425 70.063 114.688 70.75C115.065 71.735 107.751 72 80.1484 72H45.1304L42.5414 75.077L39.9524 78.153V102.378V126.602L29.7024 128.281C17.5474 130.272 13.0464 131.473 10.4064 133.43C8.58542 134.779 8.56543 134.992 10.1104 136.562C12.1504 138.633 19.6604 140.655 31.2024 142.24C36.0154 142.901 39.9524 143.699 39.9524 144.013C39.9524 144.328 34.8904 145.383 28.7024 146.359C17.4814 148.129 8.95243 150.962 8.95243 152.921C8.95243 155.658 19.9084 159.043 33.7024 160.567C37.1404 160.947 39.9524 161.582 39.9524 161.978C39.9524 162.373 36.0154 163.236 31.2024 163.895C2.09443 167.879 2.09443 174.024 31.2024 178.158C36.0154 178.842 39.9524 179.67 39.9524 180C39.9524 180.33 36.0154 181.158 31.2024 181.842C8.59143 185.053 2.94643 189.529 16.7194 193.327C19.8724 194.196 26.3904 195.447 31.2024 196.105C36.0154 196.764 39.9524 197.627 39.9524 198.022C39.9524 198.418 37.1404 199.053 33.7024 199.433C19.9084 200.957 8.95243 204.342 8.95243 207.079C8.95243 209.038 17.4814 211.871 28.7024 213.641L39.9524 215.415V228.631C39.9524 241.39 40.0424 241.953 42.5414 244.923L45.1304 248H202.441H359.753L360.99 253.25C367.935 282.714 401.141 297.071 426.812 281.708C436.773 275.746 445.835 262.838 447.539 252.184L448.212 247.972L479.215 248.236L510.217 248.5L515.905 269.737C519.033 281.417 521.811 291.192 522.078 291.46C522.346 291.727 526.108 287.121 530.439 281.223C534.77 275.325 538.688 270.066 539.147 269.535C539.646 268.959 543.595 272.167 548.96 277.508L557.939 286.445L563.453 280.999L568.967 275.553L559.886 266.433L550.804 257.314L557.628 252.655L564.452 247.995L580.613 247.998L596.774 248L599.363 244.923C601.862 241.953 601.952 241.39 601.952 228.631V215.415L613.202 213.641C624.423 211.871 632.952 209.038 632.952 207.079C632.952 204.342 621.996 200.957 608.202 199.433C604.765 199.053 601.952 198.418 601.952 198.022C601.952 197.627 605.89 196.764 610.702 196.105C615.515 195.447 622.032 194.196 625.185 193.327C638.958 189.529 633.313 185.053 610.702 181.842C605.89 181.158 601.952 180.33 601.952 180C601.952 179.67 605.89 178.842 610.702 178.158C639.81 174.024 639.81 167.879 610.702 163.895C605.89 163.236 601.952 162.373 601.952 161.978C601.952 161.582 604.765 160.947 608.202 160.567C621.996 159.043 632.952 155.658 632.952 152.921C632.952 150.962 624.423 148.129 613.202 146.359C607.015 145.383 601.952 144.328 601.952 144.013C601.952 143.699 605.89 142.901 610.702 142.24C622.244 140.655 629.754 138.633 631.794 136.562C633.339 134.992 633.319 134.779 631.498 133.43C628.858 131.473 624.357 130.272 612.202 128.281L601.952 126.602V102.224V77.846L599.029 74.923L596.106 72H363.462C142.348 72 130.845 71.913 131.379 70.25C134.285 61.205 135.843 58.528 138.591 57.858C140.165 57.475 157.162 54.565 176.364 51.393C198.268 47.773 210.564 45.343 209.364 44.871C208.312 44.457 192.152 41.589 173.452 38.498C154.752 35.407 138.552 32.512 137.452 32.065C136.015 31.481 133.785 26.857 129.525 15.626C126.264 7.032 123.312 0 122.963 0C122.615 0 119.713 6.862 116.515 15.25ZM128.971 18C131.794 25.425 134.633 31.991 135.278 32.591C135.924 33.191 150.852 36.066 168.452 38.979C186.052 41.892 201.038 44.582 201.754 44.957C202.47 45.331 188.754 48.036 171.274 50.967C153.794 53.898 138.402 56.588 137.07 56.944C135.192 57.446 134.053 59.155 132.004 64.546L129.36 71.5H122.932H116.505L113.87 64.646C112.42 60.877 110.611 57.407 109.849 56.937C109.087 56.466 102.263 53.733 94.6854 50.863C87.1064 47.994 81.2534 45.313 81.6794 44.905C82.1044 44.497 88.5044 41.857 95.9024 39.038C103.299 36.22 109.824 33.52 110.402 33.038C110.979 32.557 113.927 25.63 116.952 17.645C119.977 9.66 122.763 3.436 123.144 3.813C123.525 4.191 126.147 10.575 128.971 18ZM250.202 29.698C248.498 30.337 248.616 34.657 250.355 35.324C251.126 35.62 252.589 35.233 253.605 34.463C256.376 32.364 578.528 32.364 581.299 34.463C583.726 36.301 585.952 35.362 585.952 32.5C585.952 29.638 583.726 28.699 581.299 30.537C578.545 32.623 257.001 32.7 253.667 30.615C252.449 29.853 250.89 29.441 250.202 29.698ZM598.028 75.579C600.419 78.123 600.452 78.415 600.452 97.329V116.5H320.952H41.4524V97.329C41.4524 78.415 41.4854 78.123 43.8764 75.579L46.3014 73H320.952H595.603L598.028 75.579ZM62.4074 89.455C59.4074 92.454 59.2754 95.87 62.0254 99.365C64.6224 102.667 69.9744 102.978 72.9524 100C75.9304 97.022 75.6194 91.67 72.3174 89.073C68.8224 86.323 65.4064 86.455 62.4074 89.455ZM87.5874 89.073C84.2854 91.67 83.9744 97.022 86.9524 100C89.9304 102.978 95.2824 102.667 97.8794 99.365C100.629 95.87 100.497 92.454 97.4974 89.455C94.4984 86.455 91.0824 86.323 87.5874 89.073ZM111.407 89.455C108.407 92.454 108.275 95.87 111.025 99.365C113.622 102.667 118.974 102.978 121.952 100C124.93 97.022 124.619 91.67 121.317 89.073C117.822 86.323 114.406 86.455 111.407 89.455ZM70.2684 89.15C73.0884 90.634 73.9184 91.94 73.9374 94.921C73.9574 98.183 71.2184 101.003 68.0474 100.985C64.8924 100.966 63.6054 100.172 62.1024 97.316C60.4594 94.194 60.6444 93.217 63.4074 90.455C66.1694 87.692 67.1464 87.507 70.2684 89.15ZM96.4974 90.455C99.2604 93.217 99.4454 94.194 97.8024 97.316C96.3184 100.136 95.0124 100.966 92.0314 100.985C88.7694 101.005 85.9494 98.266 85.9674 95.095C85.9854 92.023 86.7514 90.727 89.4524 89.195C92.4354 87.504 93.7884 87.746 96.4974 90.455ZM120.317 90.073C125.016 93.769 122.813 101 116.988 101C113.541 101 111.222 99.167 110.411 95.8C109.907 93.707 110.333 92.528 112.311 90.55C115.402 87.459 116.882 87.37 120.317 90.073ZM600.952 178.351C600.952 217.843 600.59 239.74 599.904 241.707C598.227 246.523 595.99 247.093 580.034 246.782L565.616 246.5L569.784 243.614C572.076 242.027 573.952 240.437 573.952 240.082C573.952 239.281 504.118 220.501 503.487 221.132C503.236 221.383 504.554 227.306 506.416 234.294L509.803 247L278.127 246.968C89.6454 246.942 46.1334 246.694 44.7414 245.637C43.8004 244.922 42.5634 243.107 41.9914 241.603C41.3144 239.822 40.9524 217.829 40.9524 178.435V118H320.952H600.952V178.351ZM39.9524 135.094V142.188L34.7024 141.508C31.8144 141.134 26.0864 140.152 21.9724 139.326C5.87743 136.094 7.34143 133.462 27.1744 129.972C32.8274 128.977 38.0154 128.127 38.7024 128.082C39.5924 128.024 39.9524 130.042 39.9524 135.094ZM617.242 130.518C634.621 133.605 635.419 136.216 619.932 139.326C615.818 140.152 610.09 141.134 607.202 141.508L601.952 142.188V135.049V127.909L605.202 128.433C606.99 128.721 612.408 129.66 617.242 130.518ZM39.9524 153C39.9524 158.159 39.6024 160 38.6214 160C35.9654 160 16.3814 156.166 13.7024 155.122C10.2044 153.758 10.2014 152.236 13.6924 150.909C16.0754 150.003 35.2304 146.305 38.7024 146.081C39.5914 146.023 39.9524 148.024 39.9524 153ZM617.241 148.518C631.034 150.968 634.107 152.819 628.202 155.122C625.523 156.166 605.939 160 603.283 160C602.301 160 601.952 158.152 601.952 152.955V145.909L605.202 146.433C606.99 146.721 612.407 147.659 617.241 148.518ZM39.9524 171C39.9524 175.95 39.5864 177.991 38.7024 177.969C35.6574 177.892 16.1784 174.115 13.6214 173.106C7.72642 170.778 12.6684 168.267 28.4524 165.57C40.9264 163.439 39.9524 162.979 39.9524 171ZM618.792 166.657C631.224 169.132 633.816 170.918 628.202 173.136C625.706 174.123 606.2 177.893 603.202 177.969C602.317 177.991 601.952 175.938 601.952 170.939V163.877L606.702 164.536C609.314 164.899 614.755 165.853 618.792 166.657ZM121.952 182.5V191H320.452H518.952V182.5V174H320.452H121.952V182.5ZM517.952 182.5V189H436.952H355.952V182.5V176H436.952H517.952V182.5ZM39.9524 189.061V196.123L35.2024 195.464C28.1094 194.48 16.1004 192.007 13.3624 190.966C7.60043 188.775 11.5794 186.647 26.4524 183.966C41.1564 181.316 39.9524 180.861 39.9524 189.061ZM614.952 183.92C630.31 186.636 634.38 188.746 628.542 190.966C625.805 192.007 613.795 194.48 606.702 195.464L601.952 196.123V189.061C601.952 184.062 602.317 182.009 603.202 182.031C603.89 182.049 609.177 182.898 614.952 183.92ZM39.9524 207.045V214.091L36.7024 213.567C17.2284 210.428 10.9524 208.828 10.9524 207C10.9524 205.459 15.2634 204.02 25.9524 201.991C40.9214 199.15 39.9524 198.801 39.9524 207.045ZM615.033 201.903C626.548 204.006 630.952 205.416 630.952 207C630.952 208.828 624.676 210.428 605.202 213.567L601.952 214.091V207.045C601.952 201.848 602.301 200 603.283 200C604.014 200 609.302 200.856 615.033 201.903ZM374.528 249.337C374.81 250.073 375.133 252.6 375.247 254.953C375.451 259.207 375.425 259.241 370.952 260.601C368.477 261.354 366.157 261.976 365.796 261.985C364.877 262.006 361.952 253.131 361.952 250.322C361.952 248.149 362.34 248 367.983 248C372.096 248 374.178 248.425 374.528 249.337ZM389.327 251.125C390.375 256.366 390.123 256.882 386.202 257.512C384.14 257.844 381.461 258.317 380.251 258.564C378.416 258.939 377.876 258.388 377.006 255.257C375.055 248.23 375.223 248 382.327 248C388.667 248 388.705 248.017 389.327 251.125ZM403.452 252.5V256.5H397.452H391.452L391.142 252.201L390.832 247.901L397.142 248.201L403.452 248.5V252.5ZM417.577 251.125C417.233 252.844 416.952 254.891 416.952 255.675C416.952 256.778 415.652 257.032 411.202 256.8L405.452 256.5L405.145 252.25L404.837 248H411.52H418.202L417.577 251.125ZM431.578 252.71C431.223 255.3 430.6 257.735 430.192 258.121C429.785 258.507 426.825 258.361 423.615 257.797C418.344 256.871 417.834 256.564 418.352 254.636C418.667 253.461 418.931 251.488 418.938 250.25C418.951 248.144 419.377 248 425.588 248H432.224L431.578 252.71ZM446.952 248.818C446.952 250.425 443.756 260.515 442.993 261.319C442.565 261.769 440.018 261.486 437.333 260.689C432.655 259.302 432.462 259.101 432.699 255.871C433.27 248.081 433.349 248 440.471 248C444.036 248 446.952 248.368 446.952 248.818ZM0.000426519 257.783C-0.0255735 258.489 1.14043 261.414 2.59243 264.283C6.00943 271.035 15.8544 280.636 23.5494 284.719C36.0204 291.336 28.1594 291 170.296 291H299.221L292.155 294.535C287.483 296.872 283.408 299.909 280.127 303.499C275.389 308.683 270.165 317.546 271.223 318.604C271.498 318.879 272.764 316.943 274.036 314.302C278.902 304.198 291.547 294.11 301.264 292.581C313.24 290.695 313.102 290.802 305.324 289.431C301.404 288.74 295.727 287.006 292.708 285.578C285.737 282.28 277.743 274.317 274.263 267.203C272.776 264.164 271.397 262.166 271.197 262.764C270.564 264.663 274.976 272.111 279.795 277.278C284.862 282.711 290.199 286.453 295.842 288.53C301.458 290.597 47.4374 290.598 37.6824 288.531C23.7984 285.589 9.48343 274.793 3.12743 262.47C1.43443 259.186 0.0274265 257.077 0.000426519 257.783ZM392.439 264.84C393.4 267.798 393.789 270.546 393.312 271.002C392.839 271.455 390.694 271.977 388.546 272.162C384.723 272.493 384.574 272.379 381.546 266.833C379.844 263.717 378.746 260.873 379.104 260.514C380.036 259.582 389.329 258.236 390.079 258.924C390.424 259.241 391.486 261.903 392.439 264.84ZM403.75 264.25L403.452 270.5H399.553C395.429 270.5 394.745 269.542 392.588 260.75L391.914 258H397.981H404.047L403.75 264.25ZM415.613 260.947C415.288 262.568 414.355 265.493 413.539 267.447C412.233 270.572 411.626 271 408.503 271H404.952V264.5V258H410.577H416.202L415.613 260.947ZM428.681 259.94C430.106 260.01 428.958 263.153 425.359 269.038C423.354 272.315 422.89 272.547 419.067 272.182C416.797 271.966 414.725 271.442 414.464 271.019C414.202 270.596 414.694 268.056 415.556 265.375C416.417 262.694 417.27 260.003 417.45 259.395C417.674 258.642 419.315 258.543 422.615 259.086C425.275 259.523 428.005 259.908 428.681 259.94ZM378.318 263.323C378.639 264.601 380.003 267.27 381.35 269.255L383.799 272.864L379.356 274.378L374.913 275.892L370.933 270.856C368.743 268.086 366.952 265.199 366.952 264.439C366.952 263.053 371.583 261.259 375.594 261.09C377.041 261.029 377.924 261.753 378.318 263.323ZM438.086 262.158C440.212 262.795 441.952 263.635 441.952 264.023C441.952 264.876 438.522 269.504 435.179 273.162C433.003 275.543 432.414 275.714 429.599 274.776C424.893 273.207 424.505 272.436 426.804 269.208C427.958 267.587 429.352 265.077 429.902 263.631C431.013 260.708 432.409 260.457 438.086 262.158ZM403.752 278.25C403.917 281.413 403.673 284 403.21 284C402.033 284 396.931 273.354 397.727 272.559C398.084 272.201 399.519 272.041 400.915 272.204C403.262 272.478 403.475 272.932 403.752 278.25ZM410.952 273.033C410.952 274.332 406.089 284 405.435 284C405.169 284 404.952 281.3 404.952 278V272H407.952C409.602 272 410.952 272.465 410.952 273.033ZM398.291 278.619C399.807 281.71 400.827 284.459 400.557 284.728C399.932 285.354 394.408 281.576 390.205 277.648C386.607 274.285 387.221 273.042 392.494 273.015C395.2 273.002 395.839 273.62 398.291 278.619ZM420.554 274.166C420.975 274.846 420.063 276.333 418.363 277.74C413.658 281.633 407.949 285.33 407.436 284.817C407.174 284.555 408.342 281.789 410.031 278.671C412.827 273.508 413.404 273 416.468 273C418.319 273 420.158 273.524 420.554 274.166ZM395.952 284.301L398.452 286.096L395.015 285.535C390.848 284.856 381.218 280.55 378.62 278.203C376.799 276.559 376.868 276.461 380.593 275.387C384.339 274.306 384.583 274.394 388.952 278.39C391.427 280.654 394.577 283.314 395.952 284.301ZM428.545 275.613C429.869 275.945 430.952 276.523 430.952 276.897C430.952 278.083 420.615 283.801 416.452 284.917C410.074 286.626 409.381 286.199 413.552 283.129C415.697 281.55 418.785 278.838 420.414 277.103C422.043 275.368 423.997 274.187 424.757 274.479C425.516 274.77 427.221 275.28 428.545 275.613Z"
      fill={color}
    />
  </svg>
);

export default WindowLoading;