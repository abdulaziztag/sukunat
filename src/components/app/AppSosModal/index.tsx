import React from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Button, IconButton, Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {getSOSContacts} from 'api/SOS.ts';
import {EditContact} from './components/EditContact.tsx';
import {CallContact} from 'components/app/AppSosModal/components/CallContact.tsx';

export const AppSosModal = ({
  modalState,
  changeModalState,
  openWS,
  closeWS,
}: {
  modalState: boolean;
  changeModalState: (modalState: boolean) => void;
  openWS: (url: string) => void;
  closeWS: () => void;
}) => {
  const activeTheme = useActiveTheme();
  const [editState, setEditState] = React.useState<boolean>(false);

  const {data, isPending, isError} = useQuery({
    queryKey: ['contacts'],
    queryFn: getSOSContacts,
    retry: 1,
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
            <Text style={styles.modalText}>
              {editState ? 'Edit' : 'Save'} contact
            </Text>
            {isPending ? (
              <Text>Loading...</Text>
            ) : editState ? (
              <EditContact
                setEditState={setEditState}
                isContactExist={!!data?.data.phone_number}
              />
            ) : isError ? (
              <>
                <Text>Contact not added</Text>
                <Button onPress={() => setEditState(true)}>Add contact</Button>
              </>
            ) : (
              <CallContact
                setEditState={setEditState}
                changeModalState={changeModalState}
                phone_number={data?.data.phone_number || '0'}
                name={data?.data.name || 'Not found'}
                id={data?.data.id || 0}
                openWS={openWS}
                closeWS={closeWS}
              />
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
    fontSize: 20,
  },
});
