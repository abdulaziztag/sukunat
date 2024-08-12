import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {AppAvatar} from 'components/app/AppAvatar';

export const TopContent = () => {
  const activeTheme = useActiveTheme();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: activeTheme.backgroundPrimary},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          maxWidth: 500,
        }}>
        <View>
          <Text variant={'titleLarge'}>Hello, Abdulaziz!</Text>
          <Text>Good day, isn't it?</Text>
        </View>
        <AppAvatar
          firstName={'Abdulaziz'}
          lastName={'Manopov'}
          size={75}
          font={'headlineSmall'}
        />
      </View>
      <View
        style={[styles.shape, {backgroundColor: activeTheme.backgroundPrimary}]}
      />
      <View
        style={[
          styles.shape,
          {
            backgroundColor: activeTheme.backgroundSecondary,
            borderTopRightRadius: 75,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 150,
    width: '100%',
    borderBottomLeftRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    bottom: -75,
    right: 0,
    height: 75,
    width: 75,
  },
});
