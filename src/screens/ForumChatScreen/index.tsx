import {FlatList, Keyboard, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  Divider,
  IconButton,
  Menu,
  Text,
  TextInput,
} from 'react-native-paper';
import {RootStackParamList} from 'types/RootStack.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Answer} from 'screens/ForumChatScreen/components/Answer.tsx';
import {Question} from 'screens/ForumChatScreen/components/Question.tsx';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  deleteConversation,
  getConversationById,
  IAnswer,
  postReply,
} from 'api/forum.ts';
import {AppYesNoModal} from 'components/app/AppYesNoModal';
import {useEffect, useRef, useState} from 'react';

export const ForumChatScreen = () => {
  const activeTheme = useActiveTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ForumChat'>>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList<IAnswer>>(null);
  const [lastAnswerId, setLastAnswerId] = useState(0);
  const [answerId, setAnswerId] = useState(0);

  const {isPending, data, isSuccess} = useQuery({
    queryKey: ['conversationById', route.params.chatId],
    queryFn: () => getConversationById(route.params.chatId),
    refetchInterval: 1000,
  });

  useEffect(() => {
    const lastId = data?.data.replies.at(-1)?.id;
    if (lastId !== lastAnswerId) {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 30000, animated: true});
      }
      setLastAnswerId(lastId || 0);
    }
  }, [data?.data.replies, isSuccess, lastAnswerId]);

  const postAnswerMutation = useMutation({
    mutationFn: () => postReply(route.params.chatId, answer),
    onSuccess: () => {
      setAnswer('');
      queryClient.invalidateQueries({
        queryKey: ['conversationById', route.params.chatId],
      });
      Keyboard.dismiss();
    },
  });

  const deleteAnswerMutation = useMutation({
    mutationFn: () => deleteConversation(answerId),
    onSuccess: () => {
      setModalState(false);
      queryClient.invalidateQueries({
        queryKey: ['conversationById', route.params.chatId],
      });
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: activeTheme.backgroundSecondary,
      }}>
      {isPending ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 20}}
          color={activeTheme.textSecondary}
        />
      ) : (
        <FlatList
          ref={flatListRef}
          ListHeaderComponent={<Question question={data?.data} />}
          data={data?.data.replies || []}
          renderItem={item => (
            <Answer
              iconAction={() => {
                setAnswerId(item.item.id);
                setModalState(true);
              }}
              answer={item.item}
              key={item.index}
            />
          )}
          style={styles.mainContainer}
          contentContainerStyle={{paddingBottom: 10}}
        />
      )}
      <View
        style={[
          styles.addCommentInputContainer,
          {backgroundColor: activeTheme.backgroundPrimary},
        ]}>
        <TextInput
          style={[
            styles.addCommentInput,
            {
              backgroundColor: activeTheme.backgroundPrimary,
            },
          ]}
          outlineStyle={{borderRadius: 100}}
          multiline
          value={answer}
          onChangeText={setAnswer}
          mode={'outlined'}
          activeOutlineColor={activeTheme.textPrimary}
          outlineColor={activeTheme.textSecondary}
          label={'Add comment'}
        />
        <IconButton
          icon={'arrow-up'}
          mode={'contained'}
          disabled={!answer || postAnswerMutation.isPending}
          style={{
            marginTop: 10,
          }}
          iconColor={activeTheme.textPrimary}
          size={25}
          onPress={() => {
            postAnswerMutation.mutate();
          }}
        />
      </View>
      <AppYesNoModal
        modalState={modalState}
        changeModalState={setModalState}
        label={
          <>
            <Text>Are you sure you want to delete your reply? {'\n'}</Text>
            <Text numberOfLines={1} style={{color: activeTheme.info}}>
              {data?.data.replies.find(el => el.id === answerId)?.text}
            </Text>
          </>
        }
        noText={'Cancel'}
        loading={deleteAnswerMutation.isPending}
        yesText={'Delete'}
        yesAction={() => {
          deleteAnswerMutation.mutate();
          setModalState(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 72,
  },
  addCommentInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addCommentInput: {
    width: '85%',
    padding: 0,
    margin: 0,
  },
});
