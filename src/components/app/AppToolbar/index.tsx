import * as React from 'react';
import {Appbar, Button, IconButton, Text} from 'react-native-paper';
import {useActiveTheme} from '@hooks/useActiveTheme.ts';
import {useDrawer} from 'providers/DrawerProvider.tsx';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable, View} from 'react-native';

export const AppToolbar = () => {
  const navigation = useNavigation();
  const activeTheme = useActiveTheme();
  const {setDrawerState} = useDrawer();

  return (
    <Appbar.Header
      style={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}>
      <Appbar.Action
        icon={'menu'}
        onPress={() => {
          setDrawerState(true);
        }}
      />
      <Appbar.Content title="Sukunat" />
      <Pressable
        android_ripple={{borderless: true}}
        onPress={() => {
          navigation.navigate('KenAi');
        }}
        style={{
          backgroundColor: activeTheme.backgroundSecondary,
          padding: 10,
          paddingTop: 11,
          paddingLeft: 11,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={'face-4'} color={activeTheme.textPrimary} size={26} />
      </Pressable>
    </Appbar.Header>
  );
};
