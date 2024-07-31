import {HomeScreen} from 'screens/HomeScreen';
import {SettingsScreen} from 'screens/SettingsScreen';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SosScreen} from 'screens/SosScreen';
import {AppToolbar} from 'components/app/AppToolbar';
import {ComponentType, useState} from 'react';
import {AppBottomNavBtn} from 'components/app/AppBottomNavBtn';
import {ForumScreen} from 'screens/ForumScreen';
import {View} from 'react-native';
import {AppSosModal} from 'components/app/AppSosModal';
import {RootStackParamList} from 'types/RootStack.ts';
import {useWebSocket} from 'hooks/useWebSocket.ts';
import useInterval from 'hooks/useInterval.ts';
import Geolocation from '@react-native-community/geolocation';

const Tab = createBottomTabNavigator<RootStackParamList>();

export type TabLabels =
  | 'Home'
  | 'SOS'
  | 'Forum'
  | 'Tools'
  | 'KenAi'
  | 'Location';

type Tab = {
  name: TabLabels;
  icon: string;
  isBig?: boolean;
  screen: ComponentType<any>;
};

const tabs: Tab[] = [
  {
    name: 'Home',
    icon: 'home',
    screen: HomeScreen,
  },
  {
    name: 'Location',
    icon: 'location',
    screen: SettingsScreen,
  },
  {
    name: 'SOS',
    icon: 'alert-decagram-outline',
    isBig: true,
    screen: SosScreen,
  },
  {
    name: 'Tools',
    icon: 'hammer',
    screen: SettingsScreen,
  },
  {
    name: 'Forum',
    icon: 'chatbubbles',
    screen: ForumScreen,
  },
];

export const Screens = () => {
  const activeTheme = useActiveTheme();
  const [activeButton, setActiveButton] = useState<TabLabels>('Home');
  const [modalState, setModalState] = useState<boolean>(false);
  const [calledSOS, setCalledSOS] = useState<boolean>(false);

  const [wsId, setWsId] = useState<string | null>();
  const {sendMessage, closeSocket} = useWebSocket(
    `wss://qadamavia.uz:9001/ws/location/${wsId}/`,
    !!wsId,
  );

  useInterval(
    () => {
      Geolocation.getCurrentPosition(info => {
        sendMessage(
          JSON.stringify({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          }),
        );
      });
    },
    calledSOS ? 2000 : null,
  );

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          header: (/*{route, options}*/) => {
            // const title = getHeaderTitle(options, route.name);

            return <AppToolbar />;
          },
          tabBarStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            height: 75,
            borderTopColor: activeTheme.backgroundPrimary,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: activeTheme.backgroundSecondary,
        }}>
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.screen}
            options={{
              tabBarButton: () => (
                <AppBottomNavBtn
                  handleClick={label => {
                    tab.isBig && setModalState(true);
                    !tab.isBig && setActiveButton(label);
                  }}
                  isActive={activeButton === tab.name}
                  label={tab.name}
                  isBig={tab.isBig}
                  icon={tab.icon}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
      <AppSosModal
        modalState={modalState}
        changeModalState={state => setModalState(state)}
        openWS={(url: string) => {
          setWsId(url);
          setCalledSOS(true);
        }}
        closeWS={() => {
          setCalledSOS(false);
          setWsId(null);
          closeSocket();
        }}
      />
    </View>
  );
};
