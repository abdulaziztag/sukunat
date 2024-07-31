import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {verifyCode} from 'api/auth.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {getStoragePhoneNumber, setTokens} from 'utils/tokens.ts';
import {AppSetNameModal} from 'components/app/AppSetNameModal';

export const VerifyCodeScreen = () => {
  const activeTheme = useActiveTheme();
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameModalState, setNameModalState] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetch = async () => {
      setPhoneNumber((await getStoragePhoneNumber()) || '');
    };

    fetch();
  }, []);

  const mutateCode = useMutation({
    mutationFn: () => verifyCode(phoneNumber, code),
    onSuccess: async data => {
      await setTokens(data.data?.access || '', data.data?.refresh || '');
      queryClient.invalidateQueries();
      if (data.data?.full_name) {
        navigation.navigate('BottomNav');
      } else {
        setNameModalState(true);
      }
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
            value={code}
            onChangeText={setCode}
            mode={'outlined'}
            keyboardType={'number-pad'}
            label="6-digit code"
            style={{
              backgroundColor: activeTheme.backgroundSecondary,
            }}
          />
          <Button
            mode={'contained'}
            style={{borderRadius: 5}}
            onPress={() => mutateCode.mutate()}
            disabled={code.length < 6 || mutateCode.isPending}>
            {mutateCode.isPending ? (
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
      <AppSetNameModal
        modalState={nameModalState}
        changeModalState={setNameModalState}
      />
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
