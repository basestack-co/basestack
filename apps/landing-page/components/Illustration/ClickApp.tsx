import { IllustrationProps } from "./types";

const ClickApp = ({
  color,
  width = "auto",
  height = "auto",
}: IllustrationProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 381 310"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.9866 1.74519L51.7766 4.06919L54.0606 6.35319L56.3436 8.63719L59.0826 5.85819C60.8756 4.03919 61.3236 3.07919 60.3806 3.07919C59.5876 3.07919 58.3226 2.25619 57.5676 1.25019C56.2536 -0.501811 56.1016 -0.479808 53.9866 1.74519ZM325.696 12.2382C318.574 14.2702 313.892 21.8082 315.319 28.9442L315.946 32.0792H176.995H38.0446L35.6196 34.6592L33.1956 37.2402L32.8986 139.909C32.6866 213.02 32.9206 243.681 33.7116 246.407C35.7696 253.498 27.4796 253.079 165.771 253.079C278.924 253.079 289.856 253.22 289.299 254.672C288.963 255.548 288.407 257.46 288.065 258.922C287.48 261.415 287.715 261.316 291.857 257.329C298.183 251.239 300.105 251.581 301.696 259.079C302.396 262.379 303.296 265.079 303.696 265.079C304.096 265.079 304.996 262.379 305.696 259.079C306.396 255.779 307.29 253.079 307.682 253.079C308.074 253.079 311.725 265.676 315.795 281.073C319.866 296.47 323.494 309.07 323.858 309.073C324.223 309.076 327.899 304.466 332.028 298.829C336.157 293.192 340.222 287.679 341.061 286.579C342.534 284.649 342.923 284.912 352.134 294.052L361.681 303.525L367.189 298.086C370.218 295.095 372.696 292.19 372.696 291.632C372.696 291.073 368.603 286.507 363.601 281.484L354.506 272.351L357.851 269.998C359.691 268.703 365.445 264.506 370.637 260.671L380.079 253.697L368.637 250.563L357.196 247.429L356.696 141.666L356.196 35.9022L353.835 33.9912C352.451 32.8702 349.927 32.0792 347.732 32.0792H343.99L344.404 27.3292C345.319 16.8522 335.966 9.30719 325.696 12.2382ZM335.696 13.5922C335.696 13.7502 334.121 15.4542 332.196 17.3792C330.271 19.3042 328.696 21.8612 328.696 23.0622C328.696 24.3622 328.19 25.0792 327.446 24.8332C325.485 24.1872 323.65 19.8742 323.936 16.5832C324.15 14.1202 324.729 13.4942 327.196 13.0582C329.966 12.5702 335.696 12.9302 335.696 13.5922ZM342.3 26.1652C344.02 27.5932 343.534 30.8702 341.036 34.6832C338.893 37.9532 337.902 37.6932 337.146 33.6642C336.794 31.7852 335.437 29.2452 334.131 28.0182C332.826 26.7922 332.027 25.3522 332.356 24.8192C333.136 23.5582 340.332 24.5322 342.3 26.1652ZM326.494 29.1252C329.532 27.7412 330.12 28.2542 329.289 31.5632C328.445 34.9262 322.865 38.4642 320.933 36.8612C319.174 35.4012 316.696 30.6162 316.696 28.6802C316.696 27.3542 317.12 27.3582 320.364 28.7142C323.227 29.9102 324.573 30.0002 326.494 29.1252ZM319.811 36.6912C326.084 42.8172 335.653 42.4842 341.152 35.9492C344.231 32.2892 349.884 31.9682 353.382 35.2532C355.599 37.3362 355.696 38.0492 355.696 52.2532V67.0792H194.624H33.5516L33.8736 52.1812C34.1536 39.2102 34.4416 37.0112 36.1006 35.1812L38.0056 33.0792H177.059H316.112L319.811 36.6912ZM50.6956 46.0792C49.5956 47.1792 48.6956 48.9792 48.6956 50.0792C48.6956 54.2302 54.8736 57.5992 58.2956 55.3142C60.5506 53.8092 61.7156 50.2632 60.7726 47.7812C59.2066 43.6622 53.9926 42.7822 50.6956 46.0792ZM70.3506 45.9082C68.1646 48.3232 68.2476 52.3632 70.5246 54.4242C74.4886 58.0122 80.6956 55.2542 80.6956 49.9052C80.6956 44.7842 73.7846 42.1132 70.3506 45.9082ZM91.0956 44.8442C85.9956 48.2492 88.3166 56.0222 94.4456 56.0642C97.2286 56.0832 100.696 52.7632 100.696 50.0792C100.696 45.9282 94.5176 42.5592 91.0956 44.8442ZM220.696 48.4632C220.696 49.2902 219.718 50.6502 218.523 51.4872C216.541 52.8762 216.504 53.0682 218.107 53.6832C219.073 54.0542 220.253 55.3072 220.729 56.4682L221.594 58.5792L222.232 56.4432C222.583 55.2682 223.843 53.8722 225.033 53.3412L227.196 52.3742L224.946 51.6592C223.708 51.2662 222.696 50.3262 222.696 49.5712C222.696 48.8152 222.246 47.9192 221.696 47.5792C221.146 47.2392 220.696 47.6372 220.696 48.4632ZM355.696 158.146C355.696 242.505 355.603 247.186 353.946 246.692C352.984 246.404 350.059 245.646 347.446 245.006C344.833 244.365 342.696 243.45 342.696 242.971C342.696 242.493 341.684 242.166 340.446 242.245C338.093 242.395 325.177 239.363 322.851 238.115C322.045 237.683 323.964 236.871 327.63 236.093C330.998 235.378 333.98 234.429 334.255 233.983C334.736 233.205 330.656 231.821 323.892 230.468C322.134 230.117 320.696 229.562 320.696 229.235C320.696 228.909 323.043 226.265 325.912 223.36C328.781 220.456 330.692 218.079 330.159 218.079C329.626 218.079 326.154 218.947 322.443 220.008C318.732 221.07 315.699 221.632 315.704 221.258C315.708 220.885 316.604 217.654 317.696 214.079C318.788 210.504 319.684 207.143 319.688 206.61C319.693 206.078 317.031 208.279 313.773 211.503L307.85 217.364L306.787 213.417C306.202 211.246 305.435 208.023 305.081 206.254C304.023 200.962 303.134 201.771 301.257 209.735L299.474 217.297L293.585 211.469C290.346 208.264 287.699 206.078 287.704 206.61C287.708 207.143 288.604 210.504 289.696 214.079C290.788 217.654 291.684 220.885 291.688 221.258C291.693 221.632 288.66 221.07 284.949 220.008C281.238 218.947 277.766 218.079 277.233 218.079C276.7 218.079 278.698 220.543 281.672 223.554C284.646 226.566 286.88 229.203 286.637 229.415C286.395 229.627 282.876 230.601 278.819 231.579C270.72 233.531 270.873 234.123 279.992 236.137C283.179 236.842 285.959 237.696 286.169 238.036C286.379 238.376 284.334 240.858 281.624 243.551C278.913 246.245 276.696 248.764 276.696 249.149C276.696 249.534 279.849 248.929 283.704 247.805C287.558 246.681 290.945 245.995 291.231 246.281C291.518 246.567 291.299 247.994 290.744 249.452L289.737 252.102L164.244 251.84L38.7506 251.579L36.4736 249.301L34.1956 247.024L33.9296 158.051L33.6636 69.0792H194.68H355.696V158.146ZM46.9456 78.1612C45.1796 80.0232 45.1316 151.115 46.8956 152.879C47.8056 153.789 64.6996 154.079 116.814 154.079C154.609 154.079 186.244 153.806 187.114 153.472C188.518 152.933 188.696 148.647 188.696 115.472V78.0792H140.858C114.546 78.0792 82.9336 77.8012 70.6076 77.4612C52.7326 76.9682 47.9426 77.1102 46.9456 78.1612ZM202.896 78.2792C201.175 80.0002 201.175 151.158 202.896 152.879C203.806 153.789 220.7 154.079 272.814 154.079C310.609 154.079 342.244 153.806 343.114 153.472C344.517 152.934 344.696 148.656 344.696 115.579C344.696 82.5022 344.517 78.2242 343.114 77.6862C342.244 77.3522 310.609 77.0792 272.814 77.0792C220.7 77.0792 203.806 77.3692 202.896 78.2792ZM187.458 115.829L187.196 152.579H184.196H181.196L180.912 141.829L180.628 131.079H132.162H83.6956V142.079V153.079H80.6956H77.6956V116.079V79.0792H132.708H187.721L187.458 115.829ZM214.484 82.9432C214.313 83.8302 213.389 84.7072 212.431 84.8912C210.296 85.3032 208.895 82.1922 210.71 81.0712C212.576 79.9172 214.849 81.0452 214.484 82.9432ZM318.009 80.8142C313.606 81.1242 312.757 81.5122 312.395 83.3792C312.041 85.2042 311.945 85.1112 311.832 82.8292C311.698 80.1122 311.765 80.0812 317.446 80.2642L323.196 80.4492L318.009 80.8142ZM336.696 82.5792C336.696 84.9432 336.396 85.0792 331.196 85.0792C325.996 85.0792 325.696 84.9432 325.696 82.5792C325.696 80.2152 325.996 80.0792 331.196 80.0792C336.396 80.0792 336.696 80.2152 336.696 82.5792ZM69.6956 82.5792C69.6956 83.7872 68.1396 84.0792 61.6956 84.0792C55.2516 84.0792 53.6956 83.7872 53.6956 82.5792C53.6956 81.3712 55.2516 81.0792 61.6956 81.0792C68.1396 81.0792 69.6956 81.3712 69.6956 82.5792ZM164.696 82.5792C164.696 83.4042 165.371 84.0792 166.196 84.0792C167.021 84.0792 167.696 83.4042 167.696 82.5792C167.696 81.7542 167.021 81.0792 166.196 81.0792C165.371 81.0792 164.696 81.7542 164.696 82.5792ZM169.384 81.7252C168.079 83.0292 168.702 84.0792 170.779 84.0792C171.943 84.0792 172.688 83.5552 172.467 82.8922C171.98 81.4302 170.31 80.7982 169.384 81.7252ZM173.696 82.5792C173.696 83.4042 174.371 84.0792 175.196 84.0792C176.021 84.0792 176.696 83.4042 176.696 82.5792C176.696 81.7542 176.021 81.0792 175.196 81.0792C174.371 81.0792 173.696 81.7542 173.696 82.5792ZM177.696 82.5792C177.696 83.4042 178.371 84.0792 179.196 84.0792C180.021 84.0792 180.696 83.4042 180.696 82.5792C180.696 81.7542 180.021 81.0792 179.196 81.0792C178.371 81.0792 177.696 81.7542 177.696 82.5792ZM227.45 82.8292C227.75 83.7372 226.199 84.0792 221.779 84.0792C216.952 84.0792 215.696 83.7592 215.696 82.5292C215.696 81.2762 216.783 81.0372 221.367 81.2792C224.785 81.4602 227.202 82.0762 227.45 82.8292ZM281.696 83.0792C281.696 83.6352 279.029 84.0792 275.696 84.0792C272.363 84.0792 269.696 83.6352 269.696 83.0792C269.696 82.5232 272.363 82.0792 275.696 82.0792C279.029 82.0792 281.696 82.5232 281.696 83.0792ZM295.196 83.0792C294.856 83.6292 292.13 84.0792 289.137 84.0792C286.144 84.0792 283.696 83.6292 283.696 83.0792C283.696 82.5222 286.382 82.0792 289.755 82.0792C293.54 82.0792 295.582 82.4542 295.196 83.0792ZM308.696 83.0792C308.696 83.6292 306.221 84.0792 303.196 84.0792C300.171 84.0792 297.696 83.6292 297.696 83.0792C297.696 82.5292 300.171 82.0792 303.196 82.0792C306.221 82.0792 308.696 82.5292 308.696 83.0792ZM322.696 84.5792C322.696 84.8542 322.471 85.0792 322.196 85.0792C321.921 85.0792 321.696 84.8542 321.696 84.5792C321.696 84.3042 321.921 84.0792 322.196 84.0792C322.471 84.0792 322.696 84.3042 322.696 84.5792ZM67.6956 87.5792C67.6956 88.7692 66.2516 89.0792 60.6956 89.0792C55.1396 89.0792 53.6956 88.7692 53.6956 87.5792C53.6956 86.3892 55.1396 86.0792 60.6956 86.0792C66.2516 86.0792 67.6956 86.3892 67.6956 87.5792ZM343.46 120.329L343.196 152.579L339.946 152.892L336.696 153.206V144.119V135.032L319.446 135.305L302.196 135.579L301.907 144.329L301.618 153.079H296.157H290.696V144.079V135.079H273.196H255.696V144.079V153.079H250.196H244.696V144.079V135.079H227.196H209.696V144.142V153.206L206.446 152.892L203.196 152.579L202.932 120.329L202.668 88.0792H273.196H343.724L343.46 120.329ZM68.6956 92.6232C68.6956 93.8982 67.4496 94.1162 61.5256 93.8732C56.9006 93.6832 54.2086 93.1352 53.9426 92.3292C53.6356 91.4032 55.4916 91.0792 61.1126 91.0792C67.2816 91.0792 68.6956 91.3672 68.6956 92.6232ZM83.9206 108.829L83.6956 127.079H132.196H180.696L180.471 108.829L180.245 90.5792L179.948 108.329L179.65 126.079H132.196H84.7416L84.4436 108.329L84.1466 90.5792L83.9206 108.829ZM65.6956 96.5792C65.6956 97.7462 64.3626 98.0792 59.6956 98.0792C55.0286 98.0792 53.6956 97.7462 53.6956 96.5792C53.6956 95.4122 55.0286 95.0792 59.6956 95.0792C64.3626 95.0792 65.6956 95.4122 65.6956 96.5792ZM228.363 97.7462C227.996 98.1122 227.696 99.4622 227.696 100.746V103.079H273.196H318.696V100.079V97.0792H273.863C249.204 97.0792 228.729 97.3792 228.363 97.7462ZM61.6956 101.579C61.6956 102.662 60.5846 103.079 57.6956 103.079C54.8066 103.079 53.6956 102.662 53.6956 101.579C53.6956 100.496 54.8066 100.079 57.6956 100.079C60.5846 100.079 61.6956 100.496 61.6956 101.579ZM235.363 105.746C234.996 106.112 234.696 107.462 234.696 108.746V111.079H273.196H311.696V108.079V105.079H273.863C253.054 105.079 235.729 105.379 235.363 105.746ZM248.775 118.329C248.702 119.95 250.499 120.079 273.196 120.079C295.893 120.079 297.69 119.95 297.617 118.329C297.57 117.284 297.335 117.082 297.034 117.829C296.65 118.779 290.927 119.079 273.196 119.079C255.465 119.079 249.742 118.779 249.358 117.829C249.057 117.082 248.822 117.284 248.775 118.329ZM253.696 123.579C253.696 124.861 256.529 125.079 273.196 125.079C289.863 125.079 292.696 124.861 292.696 123.579C292.696 122.297 289.863 122.079 273.196 122.079C256.529 122.079 253.696 122.297 253.696 123.579ZM282.998 123.823C277.939 124.004 269.389 124.005 263.998 123.825C258.607 123.645 262.746 123.497 273.196 123.496C283.646 123.495 288.057 123.642 282.998 123.823ZM179.696 142.579V153.079H132.196H84.6956V142.579V132.079H132.196H179.696V142.579ZM243.696 144.579V153.079H227.196H210.696V144.579V136.079H227.196H243.696V144.579ZM289.696 144.579V153.079H273.196H256.696V144.579V136.079H273.196H289.696V144.579ZM335.696 144.604V153.129L319.446 152.854L303.196 152.579L302.906 144.329L302.615 136.079H319.156H335.696V144.604ZM47.4456 167.159C45.8296 168.1 45.6956 170.963 45.6956 204.506C45.6956 233.925 45.9546 241.049 47.0566 241.963C48.0456 242.784 67.5096 243.023 118.307 242.836L188.196 242.579L188.458 205.146C188.664 175.863 188.446 167.538 187.458 166.911C185.534 165.689 49.5556 165.93 47.4456 167.159ZM202.101 168.234C201.658 168.949 201.826 169.117 202.541 168.674C203.176 168.282 203.696 167.763 203.696 167.52C203.696 166.686 202.813 167.081 202.101 168.234ZM207.509 167.762C208.23 168.051 209.093 168.015 209.425 167.683C209.757 167.351 209.167 167.115 208.113 167.158C206.948 167.206 206.711 167.443 207.509 167.762ZM213.509 167.762C214.23 168.051 215.093 168.015 215.425 167.683C215.757 167.351 215.167 167.115 214.113 167.158C212.948 167.206 212.711 167.443 213.509 167.762ZM219.509 167.762C220.23 168.051 221.093 168.015 221.425 167.683C221.757 167.351 221.167 167.115 220.113 167.158C218.948 167.206 218.711 167.443 219.509 167.762ZM225.029 167.746C225.396 168.112 225.996 168.112 226.363 167.746C226.729 167.379 226.429 167.079 225.696 167.079C224.963 167.079 224.663 167.379 225.029 167.746ZM230.509 167.762C231.23 168.051 232.093 168.015 232.425 167.683C232.757 167.351 232.167 167.115 231.113 167.158C229.948 167.206 229.711 167.443 230.509 167.762ZM236.509 167.762C237.23 168.051 238.093 168.015 238.425 167.683C238.757 167.351 238.167 167.115 237.113 167.158C235.948 167.206 235.711 167.443 236.509 167.762ZM242.509 167.762C243.23 168.051 244.093 168.015 244.425 167.683C244.757 167.351 244.167 167.115 243.113 167.158C241.948 167.206 241.711 167.443 242.509 167.762ZM248.029 167.746C248.396 168.112 248.996 168.112 249.363 167.746C249.729 167.379 249.429 167.079 248.696 167.079C247.963 167.079 247.663 167.379 248.029 167.746ZM253.509 167.762C254.23 168.051 255.093 168.015 255.425 167.683C255.757 167.351 255.167 167.115 254.113 167.158C252.948 167.206 252.711 167.443 253.509 167.762ZM259.509 167.762C260.23 168.051 261.093 168.015 261.425 167.683C261.757 167.351 261.167 167.115 260.113 167.158C258.948 167.206 258.711 167.443 259.509 167.762ZM265.029 167.746C265.396 168.112 265.996 168.112 266.363 167.746C266.729 167.379 266.429 167.079 265.696 167.079C264.963 167.079 264.663 167.379 265.029 167.746ZM271.029 167.746C271.396 168.112 271.996 168.112 272.363 167.746C272.729 167.379 272.429 167.079 271.696 167.079C270.963 167.079 270.663 167.379 271.029 167.746ZM276.509 167.762C277.23 168.051 278.093 168.015 278.425 167.683C278.757 167.351 278.167 167.115 277.113 167.158C275.948 167.206 275.711 167.443 276.509 167.762ZM282.509 167.762C283.23 168.051 284.093 168.015 284.425 167.683C284.757 167.351 284.167 167.115 283.113 167.158C281.948 167.206 281.711 167.443 282.509 167.762ZM288.029 167.746C288.396 168.112 288.996 168.112 289.363 167.746C289.729 167.379 289.429 167.079 288.696 167.079C287.963 167.079 287.663 167.379 288.029 167.746ZM294.029 167.746C294.396 168.112 294.996 168.112 295.363 167.746C295.729 167.379 295.429 167.079 294.696 167.079C293.963 167.079 293.663 167.379 294.029 167.746ZM299.509 167.762C300.23 168.051 301.093 168.015 301.425 167.683C301.757 167.351 301.167 167.115 300.113 167.158C298.948 167.206 298.711 167.443 299.509 167.762ZM305.509 167.762C306.23 168.051 307.093 168.015 307.425 167.683C307.757 167.351 307.167 167.115 306.113 167.158C304.948 167.206 304.711 167.443 305.509 167.762ZM311.029 167.746C311.396 168.112 311.996 168.112 312.363 167.746C312.729 167.379 312.429 167.079 311.696 167.079C310.963 167.079 310.663 167.379 311.029 167.746ZM317.029 167.746C317.396 168.112 317.996 168.112 318.363 167.746C318.729 167.379 318.429 167.079 317.696 167.079C316.963 167.079 316.663 167.379 317.029 167.746ZM322.509 167.762C323.23 168.051 324.093 168.015 324.425 167.683C324.757 167.351 324.167 167.115 323.113 167.158C321.948 167.206 321.711 167.443 322.509 167.762ZM328.509 167.762C329.23 168.051 330.093 168.015 330.425 167.683C330.757 167.351 330.167 167.115 329.113 167.158C327.948 167.206 327.711 167.443 328.509 167.762ZM334.029 167.746C334.396 168.112 334.996 168.112 335.363 167.746C335.729 167.379 335.429 167.079 334.696 167.079C333.963 167.079 333.663 167.379 334.029 167.746ZM340.029 167.746C340.396 168.112 340.996 168.112 341.363 167.746C341.729 167.379 341.429 167.079 340.696 167.079C339.963 167.079 339.663 167.379 340.029 167.746ZM343.854 170.079C343.854 171.454 344.081 172.017 344.358 171.329C344.636 170.642 344.636 169.517 344.358 168.829C344.081 168.142 343.854 168.704 343.854 170.079ZM58.6956 171.579C58.6956 173.579 58.1956 174.079 56.1956 174.079C54.4376 174.079 53.6956 173.535 53.6956 172.246C53.6956 169.927 54.5436 169.079 56.8626 169.079C58.1516 169.079 58.6956 169.821 58.6956 171.579ZM161.946 169.816C157.347 170.138 156.686 170.456 156.617 172.381C156.574 173.59 156.306 174.002 156.023 173.296C154.808 170.272 156.555 169.076 161.915 169.264L167.196 169.449L161.946 169.816ZM180.696 171.579C180.696 173.943 180.396 174.079 175.196 174.079C169.996 174.079 169.696 173.943 169.696 171.579C169.696 169.215 169.996 169.079 175.196 169.079C180.396 169.079 180.696 169.215 180.696 171.579ZM201.775 173.662C201.823 174.827 202.06 175.064 202.379 174.267C202.668 173.545 202.632 172.682 202.3 172.35C201.968 172.018 201.732 172.608 201.775 173.662ZM166.696 173.579C166.696 173.854 166.471 174.079 166.196 174.079C165.921 174.079 165.696 173.854 165.696 173.579C165.696 173.304 165.921 173.079 166.196 173.079C166.471 173.079 166.696 173.304 166.696 173.579ZM343.775 175.662C343.823 176.827 344.06 177.064 344.379 176.267C344.668 175.545 344.632 174.682 344.3 174.35C343.968 174.018 343.732 174.608 343.775 175.662ZM187.696 209.586V242.093L117.446 241.836L47.1956 241.579L46.9316 209.329L46.6676 177.079H117.182H187.696V209.586ZM201.775 179.662C201.823 180.827 202.06 181.064 202.379 180.267C202.668 179.545 202.632 178.682 202.3 178.35C201.968 178.018 201.732 178.608 201.775 179.662ZM343.775 181.662C343.823 182.827 344.06 183.064 344.379 182.267C344.668 181.545 344.632 180.682 344.3 180.35C343.968 180.018 343.732 180.608 343.775 181.662ZM201.775 184.662C201.823 185.827 202.06 186.064 202.379 185.267C202.668 184.545 202.632 183.682 202.3 183.35C201.968 183.018 201.732 183.608 201.775 184.662ZM343.775 187.662C343.823 188.827 344.06 189.064 344.379 188.267C344.668 187.545 344.632 186.682 344.3 186.35C343.968 186.018 343.732 186.608 343.775 187.662ZM122.696 209.579V230.079H151.696H180.696V209.579V189.079H151.696H122.696V209.579ZM201.775 190.662C201.823 191.827 202.06 192.064 202.379 191.267C202.668 190.545 202.632 189.682 202.3 189.35C201.968 189.018 201.732 189.608 201.775 190.662ZM179.696 209.579V229.079H151.696H123.696V209.579V190.079H151.696H179.696V209.579ZM343.775 192.662C343.823 193.827 344.06 194.064 344.379 193.267C344.668 192.545 344.632 191.682 344.3 191.35C343.968 191.018 343.732 191.608 343.775 192.662ZM53.6956 197.079V200.079H79.6956H105.696V197.079V194.079H79.6956H53.6956V197.079ZM266.096 197.479C261.848 201.727 261.379 207.461 264.946 211.541C271.618 219.172 283.728 214.744 283.674 204.694C283.621 194.896 273.027 190.548 266.096 197.479ZM201.775 196.662C201.823 197.827 202.06 198.064 202.379 197.267C202.668 196.545 202.632 195.682 202.3 195.35C201.968 195.018 201.732 195.608 201.775 196.662ZM343.775 198.662C343.823 199.827 344.06 200.064 344.379 199.267C344.668 198.545 344.632 197.682 344.3 197.35C343.968 197.018 343.732 197.608 343.775 198.662ZM276.016 204.215C278.18 204.35 278.18 204.354 275.946 204.785C274.493 205.065 273.648 205.991 273.56 207.399C273.425 209.563 273.421 209.563 272.99 207.329C272.71 205.876 271.784 205.031 270.376 204.943C268.212 204.808 268.212 204.804 270.446 204.373C271.899 204.093 272.744 203.167 272.832 201.759C272.967 199.595 272.971 199.595 273.402 201.829C273.682 203.282 274.608 204.127 276.016 204.215ZM201.775 202.662C201.823 203.827 202.06 204.064 202.379 203.267C202.668 202.545 202.632 201.682 202.3 201.35C201.968 201.018 201.732 201.608 201.775 202.662ZM53.6956 205.079V208.079H75.6956H97.6956V205.079V202.079H75.6956H53.6956V205.079ZM343.775 204.662C343.823 205.827 344.06 206.064 344.379 205.267C344.668 204.545 344.632 203.682 344.3 203.35C343.968 203.018 343.732 203.608 343.775 204.662ZM201.775 207.662C201.823 208.827 202.06 209.064 202.379 208.267C202.668 207.545 202.632 206.682 202.3 206.35C201.968 206.018 201.732 206.608 201.775 207.662ZM305.69 213.05C306.394 216.366 307.316 219.079 307.74 219.079C308.164 219.079 310.577 216.78 313.103 213.971C315.629 211.161 317.696 209.143 317.696 209.486C317.696 209.829 316.947 212.803 316.031 216.096C315.116 219.389 314.583 222.299 314.847 222.563C315.111 222.827 318.448 222.169 322.262 221.101L329.196 219.158L323.78 224.207C317.71 229.866 317.793 230.111 326.454 232.049C332.648 233.435 332.249 234.108 324.1 236.013C319.708 237.04 317.945 236.934 311.35 235.244C307.14 234.166 303.696 233.707 303.696 234.226C303.696 234.744 304.435 238.109 305.337 241.703C306.739 247.283 306.796 249.065 305.724 253.908C303.909 262.106 303.464 262.256 301.739 255.252C300.283 249.345 298.769 247.36 297.841 250.143C297.609 250.84 297.918 251.06 298.566 250.659C299.188 250.275 299.696 250.475 299.696 251.103C299.696 251.732 299.134 252.038 298.446 251.783C297.759 251.529 295.509 252.933 293.446 254.903C289.257 258.904 289.087 258.658 291.207 251.67C293.549 243.951 293.568 243.971 285.949 246.15C282.238 247.211 278.984 248.079 278.716 248.079C278.449 248.079 280.585 246.019 283.463 243.501C286.341 240.984 288.696 238.554 288.696 238.101C288.696 237.649 286.333 236.726 283.446 236.05C276.046 234.319 274.822 233.51 278.32 232.664C279.902 232.281 282.947 231.509 285.086 230.947L288.977 229.926L283.633 224.515L278.289 219.104L285.177 221.074C288.965 222.157 292.279 222.829 292.541 222.568C292.802 222.306 292.466 220.176 291.792 217.835C291.119 215.494 290.323 212.679 290.024 211.579C289.658 210.237 291.12 211.173 294.469 214.425C297.214 217.09 299.686 218.89 299.964 218.425C300.241 217.96 301.038 215.007 301.734 211.864C302.429 208.72 303.316 206.344 303.705 206.584C304.093 206.824 304.986 209.734 305.69 213.05ZM343.775 210.662C343.823 211.827 344.06 212.064 344.379 211.267C344.668 210.545 344.632 209.682 344.3 209.35C343.968 209.018 343.732 209.608 343.775 210.662ZM201.775 213.662C201.823 214.827 202.06 215.064 202.379 214.267C202.668 213.545 202.632 212.682 202.3 212.35C201.968 212.018 201.732 212.608 201.775 213.662ZM53.8856 214.829C54.1936 216.429 56.2946 216.602 78.4586 216.847C102.189 217.109 102.696 217.072 102.696 215.097C102.696 213.128 102.102 213.079 78.1226 213.079C55.2576 213.079 53.5726 213.201 53.8856 214.829ZM101.696 215.079C101.696 215.717 93.1956 216.079 78.1956 216.079C63.1956 216.079 54.6956 215.717 54.6956 215.079C54.6956 214.441 63.1956 214.079 78.1956 214.079C93.1956 214.079 101.696 214.441 101.696 215.079ZM343.775 215.662C343.823 216.827 344.06 217.064 344.379 216.267C344.668 215.545 344.632 214.682 344.3 214.35C343.968 214.018 343.732 214.608 343.775 215.662ZM4.32162 219.686C3.95262 220.845 2.64862 222.277 1.42362 222.868C-0.318382 223.709 -0.429384 223.958 0.913616 224.011C1.85862 224.049 3.26462 225.287 4.03762 226.763C5.36462 229.294 5.48062 229.331 6.09162 227.406C6.44862 226.283 7.74262 224.875 8.96762 224.277L11.1956 223.189L9.05962 222.547C7.88462 222.194 6.48862 220.932 5.95762 219.742L4.99062 217.579L4.32162 219.686ZM53.6956 220.079C53.6956 222.011 54.3626 222.079 73.1956 222.079C92.0286 222.079 92.6956 222.011 92.6956 220.079C92.6956 218.147 92.0286 218.079 73.1956 218.079C54.3626 218.079 53.6956 218.147 53.6956 220.079ZM201.775 219.662C201.823 220.827 202.06 221.064 202.379 220.267C202.668 219.545 202.632 218.682 202.3 218.35C201.968 218.018 201.732 218.608 201.775 219.662ZM91.6956 220.079C91.6956 220.71 84.8626 221.079 73.1956 221.079C61.5286 221.079 54.6956 220.71 54.6956 220.079C54.6956 219.448 61.5286 219.079 73.1956 219.079C84.8626 219.079 91.6956 219.448 91.6956 220.079ZM343.775 221.662C343.823 222.827 344.06 223.064 344.379 222.267C344.668 221.545 344.632 220.682 344.3 220.35C343.968 220.018 343.732 220.608 343.775 221.662ZM201.775 225.662C201.823 226.827 202.06 227.064 202.379 226.267C202.668 225.545 202.632 224.682 202.3 224.35C201.968 224.018 201.732 224.608 201.775 225.662ZM343.775 227.662C343.823 228.827 344.06 229.064 344.379 228.267C344.668 227.545 344.632 226.682 344.3 226.35C343.968 226.018 343.732 226.608 343.775 227.662ZM201.775 230.662C201.823 231.827 202.06 232.064 202.379 231.267C202.668 230.545 202.632 229.682 202.3 229.35C201.968 229.018 201.732 229.608 201.775 230.662ZM343.775 233.662C343.823 234.827 344.06 235.064 344.379 234.267C344.668 233.545 344.632 232.682 344.3 232.35C343.968 232.018 343.732 232.608 343.775 233.662ZM201.775 236.662C201.823 237.827 202.06 238.064 202.379 237.267C202.668 236.545 202.632 235.682 202.3 235.35C201.968 235.018 201.732 235.608 201.775 236.662ZM343.775 238.662C343.823 239.827 344.06 240.064 344.379 239.267C344.668 238.545 344.632 237.682 344.3 237.35C343.968 237.018 343.732 237.608 343.775 238.662ZM321.196 240.079C321.536 240.629 321.589 241.079 321.314 241.079C321.039 241.079 320.536 240.629 320.196 240.079C319.856 239.529 319.803 239.079 320.078 239.079C320.353 239.079 320.856 239.529 321.196 240.079ZM203.196 242.079C203.536 242.629 204.039 243.079 204.314 243.079C204.589 243.079 204.536 242.629 204.196 242.079C203.856 241.529 203.353 241.079 203.078 241.079C202.803 241.079 202.856 241.529 203.196 242.079ZM208.509 242.762C209.23 243.051 210.093 243.015 210.425 242.683C210.757 242.351 210.167 242.115 209.113 242.158C207.948 242.206 207.711 242.443 208.509 242.762ZM214.029 242.746C214.396 243.112 214.996 243.112 215.363 242.746C215.729 242.379 215.429 242.079 214.696 242.079C213.963 242.079 213.663 242.379 214.029 242.746ZM219.509 242.762C220.23 243.051 221.093 243.015 221.425 242.683C221.757 242.351 221.167 242.115 220.113 242.158C218.948 242.206 218.711 242.443 219.509 242.762ZM225.509 242.762C226.23 243.051 227.093 243.015 227.425 242.683C227.757 242.351 227.167 242.115 226.113 242.158C224.948 242.206 224.711 242.443 225.509 242.762ZM231.509 242.762C232.23 243.051 233.093 243.015 233.425 242.683C233.757 242.351 233.167 242.115 232.113 242.158C230.948 242.206 230.711 242.443 231.509 242.762ZM237.029 242.746C237.396 243.112 237.996 243.112 238.363 242.746C238.729 242.379 238.429 242.079 237.696 242.079C236.963 242.079 236.663 242.379 237.029 242.746ZM242.509 242.762C243.23 243.051 244.093 243.015 244.425 242.683C244.757 242.351 244.167 242.115 243.113 242.158C241.948 242.206 241.711 242.443 242.509 242.762ZM248.509 242.762C249.23 243.051 250.093 243.015 250.425 242.683C250.757 242.351 250.167 242.115 249.113 242.158C247.948 242.206 247.711 242.443 248.509 242.762ZM254.509 242.762C255.23 243.051 256.093 243.015 256.425 242.683C256.757 242.351 256.167 242.115 255.113 242.158C253.948 242.206 253.711 242.443 254.509 242.762ZM259.509 242.762C260.23 243.051 261.093 243.015 261.425 242.683C261.757 242.351 261.167 242.115 260.113 242.158C258.948 242.206 258.711 242.443 259.509 242.762ZM265.509 242.762C266.23 243.051 267.093 243.015 267.425 242.683C267.757 242.351 267.167 242.115 266.113 242.158C264.948 242.206 264.711 242.443 265.509 242.762ZM271.509 242.762C272.23 243.051 273.093 243.015 273.425 242.683C273.757 242.351 273.167 242.115 272.113 242.158C270.948 242.206 270.711 242.443 271.509 242.762ZM277.509 242.762C278.23 243.051 279.093 243.015 279.425 242.683C279.757 242.351 279.167 242.115 278.113 242.158C276.948 242.206 276.711 242.443 277.509 242.762ZM327.696 245.579C331.028 249.017 331.045 249.078 328.642 249C327.297 248.957 326.795 248.682 327.527 248.39C328.492 248.005 328.095 247.062 326.09 244.969C324.568 243.379 323.543 242.079 323.813 242.079C324.083 242.079 325.83 243.654 327.696 245.579ZM315.358 247.329C315.081 248.017 314.854 247.454 314.854 246.079C314.854 244.704 315.081 244.142 315.358 244.829C315.636 245.517 315.636 246.642 315.358 247.329ZM318.363 245.746C317.996 246.112 317.396 246.112 317.029 245.746C316.663 245.379 316.963 245.079 317.696 245.079C318.429 245.079 318.729 245.379 318.363 245.746ZM322.425 246.683C322.093 247.015 321.23 247.051 320.509 246.762C319.711 246.443 319.948 246.206 321.113 246.158C322.167 246.115 322.757 246.351 322.425 246.683ZM325.363 247.746C324.996 248.112 324.396 248.112 324.029 247.746C323.663 247.379 323.963 247.079 324.696 247.079C325.429 247.079 325.729 247.379 325.363 247.746ZM316.363 250.746C315.996 251.112 315.696 250.812 315.696 250.079C315.696 249.346 315.996 249.046 316.363 249.412C316.729 249.779 316.729 250.379 316.363 250.746ZM317.759 257.037C317.794 256.235 318.254 256.657 318.781 257.974C319.308 259.292 319.59 260.518 319.409 260.699C319.227 260.881 316.63 258.454 313.637 255.307C308.8 250.22 308.724 250.079 312.946 254.04C315.848 256.762 317.721 257.928 317.759 257.037ZM317.379 254.267C317.06 255.064 316.823 254.827 316.775 253.662C316.732 252.608 316.968 252.018 317.3 252.35C317.632 252.682 317.668 253.545 317.379 254.267ZM155.316 275.702C154.951 276.852 153.808 278.195 152.777 278.686C151.026 279.52 151.088 279.76 153.733 282.326C156.35 284.867 156.608 284.931 157.163 283.184C157.492 282.145 158.76 280.998 159.979 280.636L162.196 279.977L159.922 279.051C158.672 278.542 157.273 277.11 156.814 275.869C155.986 273.632 155.973 273.631 155.316 275.702Z"
      fill={color}
    />
  </svg>
);

export default ClickApp;
