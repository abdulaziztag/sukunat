import {NavigationStateProps, TopBarProps} from 'screens/ForumScreen/types.ts';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const TabBar = ({
  navigationState,
  jumpTo,
  activeIndex,
}: TopBarProps<NavigationStateProps>) => {
  const activeTheme = useActiveTheme();

  return (
    <View
      style={[
        {backgroundColor: activeTheme.backgroundPrimary},
        styles.barContainer,
      ]}>
      <View
        style={[
          styles.barInnerContainer,
          {
            backgroundColor: activeTheme.backgroundSecondary,
            borderColor: activeTheme.backgroundSecondary,
          },
        ]}>
        {navigationState.routes.map((tab: any, index: number) => (
          <Pressable
            key={index}
            style={[
              {
                backgroundColor:
                  activeIndex === index
                    ? activeTheme.backgroundPrimary
                    : activeTheme.backgroundSecondary,
              },
              styles.tabBtn,
            ]}
            onPress={() => jumpTo(tab.key)}>
            <Text>{tab.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 60,
    flexDirection: 'row',
    padding: 10,
  },
  barInnerContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
  },
  tabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    margin: 1,
  },
});
