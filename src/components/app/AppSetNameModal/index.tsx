import React from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {useMutation} from '@tanstack/react-query';
import {changeUserInfo} from 'api/auth.ts';
import {useNavigation} from '@react-navigation/native';

export const AppSetNameModal = ({
  modalState,
  changeModalState,
}: {
  modalState: boolean;
  changeModalState: (modalState: boolean) => void;
}) => {
  const activeTheme = useActiveTheme();
  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const navigation = useNavigation();

  const setNameMutation = useMutation({
    mutationFn: () => {
      return changeUserInfo(name, surname);
    },
    onSuccess: () => {
      setName('');
      setSurname('');
      navigation.navigate('BottomNav');
    },
  });

  return (
    <View
      style={[
        styles.centeredView,
        {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: modalState ? 'absolute' : 'relative',
          flex: +modalState,
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
      ]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalState}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          changeModalState(false);
        }}>
        <View
          style={[
            styles.centeredView,
            {
              width: '80%',
              alignSelf: 'center',
            },
          ]}>
          <IconButton
            mode={'contained'}
            icon={'close'}
            containerColor={'red'}
            iconColor={'white'}
            size={20}
            style={{marginTop: 20, alignSelf: 'flex-end'}}
            onPress={() => changeModalState(false)}
          />
          <View
            style={[
              styles.modalView,
              {backgroundColor: activeTheme.backgroundSecondary},
            ]}>
            <Text
              style={{
                color: activeTheme.textPrimary,
                fontSize: 20,
                marginBottom: 10,
              }}>
              Add your name
            </Text>
            <TextInput
              label={'First name'}
              value={name}
              onChangeText={setName}
              style={{width: '100%', marginBottom: 20}}
            />
            <TextInput
              label={'Last name'}
              value={surname}
              onChangeText={setSurname}
              style={{width: '100%', marginBottom: 20}}
            />
            <Button
              mode={'contained'}
              onPress={() => {
                setNameMutation.mutate();
                changeModalState(false);
              }}
              disabled={
                setNameMutation.isPending || name === '' || surname === ''
              }>
              {setNameMutation.isPending ? (
                <ActivityIndicator
                  size={'small'}
                  color={activeTheme.textSecondary}
                />
              ) : (
                'Add'
              )}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
