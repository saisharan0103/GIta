import { ImageSourcePropType } from 'react-native';

export const artwork = {
  appIcon: require('../../assets/images/generated/krishna-app-icon.png') as ImageSourcePropType,
  hero: require('../../assets/images/generated/krishna-hero.png') as ImageSourcePropType,
  reels: [
    require('../../assets/images/generated/krishna-hero.png'),
    require('../../assets/images/generated/reel-vrindavan.png'),
    require('../../assets/images/generated/reel-radha-garden.png'),
    require('../../assets/images/generated/reel-butter.png'),
    require('../../assets/images/generated/reel-kurukshetra.png'),
  ] as ImageSourcePropType[],
};
