import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {useMutation} from '@tanstack/react-query';
import {sendCode} from 'api/auth.ts';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setStoragePhoneNumber} from 'utils/tokens.ts';

export const PhoneNumberScreen = () => {
  const activeTheme = useActiveTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const mutatePhoneNumber = useMutation({
    mutationFn: () => sendCode(phoneNumber),
    onSuccess: async () => {
      await setStoragePhoneNumber(phoneNumber);
      navigation.navigate('VerifyCode');
    },
  });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: activeTheme.backgroundSecondary}}>
      <TouchableWithoutFeedback
        style={{backgroundColor: activeTheme.backgroundSecondary}}
        onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inner,
            {backgroundColor: activeTheme.backgroundSecondary},
          ]}>
          <TextInput
            mode={'outlined'}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType={'phone-pad'}
            label="Phone number"
            disabled={mutatePhoneNumber.isPending}
            style={{
              backgroundColor: activeTheme.backgroundSecondary,
            }}
          />
          <Button
            mode={'contained'}
            style={{borderRadius: 5}}
            disabled={phoneNumber.length < 10 || mutatePhoneNumber.isPending}
            onPress={() => mutatePhoneNumber.mutate()}>
            {mutatePhoneNumber.isPending ? (
              <ActivityIndicator
                size={'small'}
                color={activeTheme.textSecondary}
              />
            ) : (
              'Submit'
            )}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
