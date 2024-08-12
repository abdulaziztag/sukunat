import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

export const AppAvatar = ({
  firstName,
  lastName,
  avatarSrc,
  bgColor,
  size = 45,
  font = 'bodyLarge',
}: {
  firstName: string;
  lastName?: string;
  avatarSrc?: string;
  bgColor?: string;
  size?: number;
  font?: VariantProp<never>;
}) => {
  return (
    <View
      style={[
        styles.avatar,
        {backgroundColor: bgColor || '#FFAB91', height: size, width: size},
      ]}>
      {avatarSrc ? (
        <Image style={styles.avatar} source={{uri: avatarSrc}} />
      ) : (
        <Text
          variant={font}
          style={{color: 'white', fontWeight: 'bold', letterSpacing: -1.5}}>
          {firstName[0].toUpperCase()} {lastName && lastName[0].toUpperCase()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
