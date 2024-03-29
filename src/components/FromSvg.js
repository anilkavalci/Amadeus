import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function FromSvg(props) {
  return (
    <Svg
      width="35px"
      height="35px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Path
          d="M24 0v24H0V0h24zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018zm.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022zm-.715.002a.023.023 0 00-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092z"
          fillRule="nonzero"
          transform="translate(-624) translate(624)"
        />
        <Path
          d="M21 20a1 1 0 01.117 1.993L21 22H3a1 1 0 01-.117-1.993L3 20h18zM7.262 3.772a1.25 1.25 0 01.996.154l.122.089 6.184 5.091 3.832-.692a3.96 3.96 0 013.667 1.27c.457.515.651 1.197.425 1.865a3.474 3.474 0 01-2.184 2.18l-.207.063-15.077 4.04a1.1 1.1 0 01-1.079-.302l-.086-.102-3.177-4.246a1.01 1.01 0 01.43-1.542l.118-.039 2.27-.608a1.25 1.25 0 011.04.183l.11.085.796.7 2.395-.936L3.97 6.112a1.01 1.01 0 01.42-1.563l.113-.037 2.759-.74zm.144 2.032l-.935.25 3.763 4.784c.393.499.23 1.22-.313 1.512l-.113.053-4.2 1.64a1.01 1.01 0 01-.935-.105l-.099-.077-.947-.833-.471.127 1.935 2.587L19.58 11.86c.444-.119.805-.437.98-.858a1.96 1.96 0 00-1.64-.643l-.167.023-4.284.774a1.01 1.01 0 01-.719-.14l-.102-.075-6.24-5.137z"
          fill="#09244B"
          transform="translate(-624) translate(624)"
        />
      </G>
    </Svg>
  );
}

export default FromSvg;
