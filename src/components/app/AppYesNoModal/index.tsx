import React from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Button, IconButton, Text} from 'react-native-paper';

export const AppYesNoModal = ({
  modalState,
  changeModalState,
  label,
  noText,
  yesText,
  loading,
  yesAction,
}: {
  modalState: boolean;
  changeModalState: (modalState: boolean) => void;
  noText: string;
  yesText: string;
  label: string | JSX.Element;
  loading: boolean;
  yesAction: () => void;
}) => {
  const activeTheme = useActiveTheme();

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
          <View
            style={[
              styles.modalView,
              {backgroundColor: activeTheme.backgroundSecondary},
            ]}>
            <Text variant={'bodyLarge'} style={{textAlign: 'center'}}>
              {label}
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
              <Button
                mode={'contained'}
                style={{flex: 1, borderRadius: 5}}
                buttonColor={activeTheme.textPrimary}
                disabled={loading}
                onPress={() => changeModalState(false)}>
                {noText}
              </Button>
              <Button
                mode={'contained'}
                buttonColor={activeTheme.error}
                onPress={yesAction}
                disabled={loading}
                textColor={'white'}
                style={{
                  flex: 1,
                  borderRadius: 5,
                }}>
                {loading ? 'Deleting' : yesText}
              </Button>
            </View>
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
    paddingHorizontal: 30,
    paddingVertical: 20,
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
