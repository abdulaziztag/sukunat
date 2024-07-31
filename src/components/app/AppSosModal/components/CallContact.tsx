import {Alert, Linking, PermissionsAndroid, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import React, {useState} from 'react';
import {IIdentifiedContact, ILocation, sendLocation} from 'api/SOS.ts';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Geolocation from '@react-native-community/geolocation';
import Clipboard from '@react-native-clipboard/clipboard';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        title: 'Location Permission',
        message:
          'This App needs access to your location so we can know where you are.',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
}

export const CallContact = ({
  setEditState,
  name,
  phone_number,
  openWS,
  closeWS,
}: {
  setEditState: (state: boolean) => void;
  changeModalState: (state: boolean) => void;
  openWS: (url: string) => void;
  closeWS: () => void;
} & IIdentifiedContact) => {
  const activeTheme = useActiveTheme();
  const [wsUrl, setWsUrl] = useState<string>('');
  const queryClient = useQueryClient();

  const sosQuery = useQuery({
    queryKey: ['isSOSCalled'],
  });

  const callContactMutation = useMutation({
    mutationFn: ({latitude, longitude}: ILocation) =>
      sendLocation({latitude, longitude}),
    onSuccess: async data => {
      setWsUrl(data.data.tracking_url);
      openWS(data.data.tracking_url.split('/')[6]);
      queryClient.setQueryData(['isSOSCalled'], () => true);
      Clipboard.setString(wsUrl);
    },
  });

  if (!sosQuery.data === undefined) {
    queryClient.setQueryData(['isSOSCalled'], () => false);
  }

  const callHandler = async () => {
    Geolocation.getCurrentPosition(
      info => {
        callContactMutation.mutate({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      async () => {
        await requestLocationPermission();
        Alert.alert('Error', 'Please enable location services in app settings');
      },
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontWeight: 'bold'}} variant={'bodyLarge'}>
          {phone_number} - {name}
        </Text>
        <IconButton
          icon={'account-edit'}
          size={20}
          mode={'contained'}
          onPress={() => setEditState(true)}
        />
      </View>
      {callContactMutation.isPending ? (
        <Text>Your location is going to live</Text>
      ) : sosQuery.data ? (
        <>
          <Text style={{textAlign: 'center'}}>
            Message with your location was sent to your contact
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <View style={{alignItems: 'center'}}>
              <IconButton
                icon={'close'}
                iconColor={'white'}
                containerColor={activeTheme.error}
                onPress={() => {
                  queryClient.setQueryData(['isSOSCalled'], () => false);
                  closeWS();
                }}
              />
              <Text>Close</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <IconButton
                containerColor={activeTheme.success}
                icon={'content-copy'}
                iconColor={'white'}
                onPress={() => Clipboard.setString(wsUrl)}
              />
              <Text>Copy link</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <IconButton
                mode={'contained'}
                containerColor={activeTheme.warning}
                icon={'open-in-new'}
                iconColor={'white'}
                onPress={() => {
                  Linking.openURL(wsUrl);
                }}
              />
              <Text>Open</Text>
            </View>
          </View>
        </>
      ) : (
        <Button
          icon={'phone'}
          textColor={'white'}
          buttonColor={'green'}
          onPress={callHandler}>
          Send live location
        </Button>
      )}
    </>
  );
};
