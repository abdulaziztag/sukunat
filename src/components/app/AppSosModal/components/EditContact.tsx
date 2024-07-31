import {View} from 'react-native';
import {
  ActivityIndicator,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {changeSOSContact, postSOSContact} from 'api/SOS.ts';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const EditContact = ({
  setEditState,
  isContactExist,
}: {
  setEditState: (state: boolean) => void;
  isContactExist: boolean;
}) => {
  const activeTheme = useActiveTheme();
  const [contactName, setContactName] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const queryClient = useQueryClient();

  const postContactMutation = useMutation({
    mutationFn: () => {
      return postSOSContact({phone_number: phoneNumber, name: contactName});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['contacts']});
      setEditState(false);
    },
  });

  const changeContactMutation = useMutation({
    mutationFn: () => {
      return changeSOSContact({phone_number: phoneNumber, name: contactName});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['contacts']});
      setEditState(false);
    },
  });

  return (
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
          keyboardType={'phone-pad'}
          label={'Phone number'}
        />
      </View>
      <IconButton
        icon={'content-save'}
        mode={'contained'}
        size={40}
        disabled={
          postContactMutation.isPending ||
          changeContactMutation.isPending ||
          !contactName ||
          !phoneNumber
        }
        onPress={() => {
          isContactExist
            ? changeContactMutation.mutate()
            : postContactMutation.mutate();
        }}
      />
      <Text>
        {postContactMutation.isPending || changeContactMutation.isPending ? (
          <ActivityIndicator size={'small'} color={activeTheme.textSecondary} />
        ) : (
          'Save contact'
        )}
      </Text>
    </>
  );
};
