import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppBottomNavBtnProps} from 'components/app/AppBottomNavBtn/types.ts';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Pressable} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const AppBottomNavBtn = ({
  label,
  icon,
  handleClick,
  isActive,
  isBig,
}: AppBottomNavBtnProps) => {
  const navigation = useNavigation();
  const activeTheme = useActiveTheme();

  const changeScreen = () => {
    !isBig && navigation.navigate(label);
    handleClick(label);
  };

  return (
    <Pressable
      disabled={icon === 'map-marker' || icon === 'wrench'}
      android_ripple={{
        color: activeTheme.backgroundSecondary,
        borderless: !isBig,
        foreground: true,
      }}
      style={[
        {
          backgroundColor: activeTheme.backgroundPrimary,
          borderColor: activeTheme.backgroundPrimary,
        },
        isBig ? styles.big : styles.btn,
      ]}
      onPress={changeScreen}>
      {!isBig && (
        <Icon
          name={isActive || isBig ? icon : `${icon}-outline`}
          size={isBig ? 40 : 32}
          color={isBig ? 'white' : activeTheme.textPrimary}
        />
      )}
      <Text
        variant={isBig ? 'titleLarge' : 'labelSmall'}
        style={{
          fontSize: isBig ? 22 : 9,
          fontWeight: 'bold',
          color: isBig ? 'white' : activeTheme.textPrimary,
          letterSpacing: isBig ? 3 : 0.5,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  big: {
    bottom: 20,
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: 'red',
    borderWidth: 10,
  },
});
