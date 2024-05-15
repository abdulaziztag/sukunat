import React from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';

export const AppSosModal = ({
  modalState,
  changeModalState,
}: {
  modalState: boolean;
  changeModalState: (modalState: boolean) => void;
}) => {
  const activeTheme = useActiveTheme();
  const [editState, setEditState] = React.useState<boolean>(false);
  const [contactName, setContactName] = React.useState<string>('Me');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('903481121');

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
            <Text style={styles.modalText}>
              {editState ? 'Edit' : 'Saved'} contact
            </Text>
            {editState ? (
              <>
                <View style={{gap: 10, width: '100%'}}>
                  <TextInput
                    value={contactName}
                    onChangeText={setContactName}
                    style={{width: '100%'}}
                    label={'Contact name'}
                  />
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={{width: '100%'}}
                    keyboardType={'numeric'}
                    label={'Phone number'}
                  />
                </View>
                <IconButton
                  icon={'content-save'}
                  mode={'contained'}
                  size={40}
                  onPress={() => setEditState(false)}
                />
                <Text>Save contact</Text>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}} variant={'headlineSmall'}>
                    {contactName} - {phoneNumber}
                  </Text>
                  <IconButton
                    icon={'account-edit'}
                    size={20}
                    mode={'contained'}
                    onPress={() => setEditState(true)}
                  />
                </View>
                <Button
                  icon={'phone'}
                  buttonColor={'green'}
                  onPress={() => {}}
                  style={{width: '100%', borderRadius: 5, marginTop: 10}}>
                  <Text>Call</Text>
                </Button>
              </>
            )}
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
