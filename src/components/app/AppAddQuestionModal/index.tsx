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
import {IPostedConversation, postConversation} from 'api/forum.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const updateCache = (
  oldData: IPostedConversation[],
  data: {data: IPostedConversation},
) => {
  return {...oldData, newAdded: true, results: [{...data.data}]};
};

export const AppAddQuestionModal = ({
  modalState,
  changeModalState,
}: {
  modalState: boolean;
  changeModalState: (modalState: boolean) => void;
}) => {
  const activeTheme = useActiveTheme();
  const [question, setQuestion] = React.useState<string>('');
  const queryClient = useQueryClient();

  const addQuestionMutation = useMutation({
    mutationFn: () => {
      return postConversation(question);
    },
    onSuccess: data => {
      setQuestion('');
      queryClient.setQueryData(['questions'], oldData =>
        updateCache(oldData as IPostedConversation[], data),
      );
      queryClient.setQueryData(['myQuestions'], oldData =>
        updateCache(oldData as IPostedConversation[], data),
      );
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
              Add Question
            </Text>
            <TextInput
              numberOfLines={3}
              multiline={true}
              label={'Question'}
              value={question}
              mode={'outlined'}
              onChangeText={setQuestion}
              style={{width: '100%', marginBottom: 20}}
            />
            <Button
              mode={'contained'}
              onPress={() => {
                addQuestionMutation.mutate();
                changeModalState(false);
              }}
              disabled={addQuestionMutation.isPending || !question}>
              {addQuestionMutation.isPending ? (
                <ActivityIndicator
                  size={'large'}
                  style={{marginTop: 20}}
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
