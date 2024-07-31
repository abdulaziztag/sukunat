import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const AppAvatar = ({
  firstName,
  lastName,
  avatarSrc,
  bgColor,
}: {
  firstName: string;
  lastName?: string;
  avatarSrc?: string;
  bgColor?: string;
}) => {
  return (
    <View style={[styles.avatar, {backgroundColor: bgColor || '#FFAB91'}]}>
      {avatarSrc ? (
        <Image style={styles.avatar} source={{uri: avatarSrc}} />
      ) : (
        <Text
          variant={'bodyLarge'}
          style={{color: 'white', fontWeight: 'bold', letterSpacing: -1.5}}>
          {firstName[0].toUpperCase()} {lastName && lastName[0].toUpperCase()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 45,
    width: 45,
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
