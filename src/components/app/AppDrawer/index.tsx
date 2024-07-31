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
import {BlogScreen} from 'screens/BlogScreen';
import {RootStackParamList} from 'types/RootStack.ts';
import {PhoneNumberScreen} from 'screens/PhoneNumberScreen';
import {VerifyCodeScreen} from 'screens/VerifyCodeScreen';
import {deleteStoragePhoneNumber, deleteTokens} from 'utils/tokens.ts';
import {useAuth} from 'providers/AuthProvide.tsx';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {ArticlesListScreen} from 'screens/ArticlesListScreen';
import {ChatWithAIScreen} from 'screens/ChatWithAIScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppDrawer = () => {
  const activeTheme = useActiveTheme();
  const {drawerState, setDrawerState} = useDrawer();
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const logOut = async () => {
    queryClient.invalidateQueries();
    await deleteTokens();
    await deleteStoragePhoneNumber();
    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }
    //setDrawerState(false);
    navigation.navigate('PhoneNumber');
  };

  useEffect(() => {
    isAuthenticated
      ? navigation.navigate('BottomNav')
      : navigation.navigate('PhoneNumber');
  }, [isAuthenticated, navigation]);

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
          <Button onPress={logOut}>Logout</Button>
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
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
          name={'ForumChat'}
          component={ForumChatScreen}
        />
        <Stack.Screen
          name={'VideoCourse'}
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
          component={VideoCourseScreen}
        />
        <Stack.Screen
          name={'KenAi'}
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
          component={ChatWithAIScreen}
        />
        <Stack.Screen
          name={'Video'}
          component={VideoScreen}
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
        />
        <Stack.Screen
          name={'Blog'}
          component={BlogScreen}
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
        />
        <Stack.Screen
          name={'PhoneNumber'}
          component={PhoneNumberScreen}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen name={'VerifyCode'} component={VerifyCodeScreen} />
        <Stack.Screen
          name={'ArticlesList'}
          options={{
            headerStyle: {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          }}
          component={ArticlesListScreen}
        />
      </Stack.Navigator>
    </Drawer>
  );
};
