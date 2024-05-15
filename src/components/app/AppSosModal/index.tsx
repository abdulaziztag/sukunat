import * as React from 'react';
import {Drawer} from 'react-native-drawer-layout';
import {Button} from 'react-native-paper';
import {Screens} from 'Screens.tsx';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {useDrawer} from 'providers/DrawerProvider.tsx';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForumChatScreen} from 'screens/ForumChatScreen';
import {VideoCourseScreen} from 'screens/VideoCourseScreen';
import {VideoScreen} from 'screens/VideoScreen';

const Stack = createNativeStackNavigator();

export const AppDrawer = () => {
  const activeTheme = useActiveTheme();
  const {drawerState, setDrawerState} = useDrawer();

  return (
    <Drawer
      open={drawerState}
      onClose={() => setDrawerState(false)}
      onOpen={() => setDrawerState(true)}
      renderDrawerContent={() => (
        <View
          style={{
            backgroundColor: activeTheme.backgroundSecondary,
            margin: 0,
            padding: 0,
            flex: 1,
          }}>
          <Button>Press me</Button>
        </View>
      )}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
          },
          headerTitleStyle: {
            color: activeTheme.textPrimary,
          },
          contentStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
          },
          headerTintColor: activeTheme.textPrimary,
        }}>
        <Stack.Screen
          name={'BottomNav'}
          options={{
            headerShown: false,
          }}
          component={Screens}
        />
        <Stack.Screen name={'ForumChat'} component={ForumChatScreen} />
        <Stack.Screen name={'VideoCourse'} component={VideoCourseScreen} />
        <Stack.Screen name={'Video'} component={VideoScreen} />
      </Stack.Navigator>
    </Drawer>
  );
};
