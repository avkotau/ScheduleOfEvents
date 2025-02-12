import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const BASE_WIDTH = 430;
const BASE_HEIGHT = 932;

// Scaling
export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Vertical scaling verticalScale
export const vScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
