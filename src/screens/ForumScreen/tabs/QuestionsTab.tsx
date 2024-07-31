import {FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ListItem} from 'screens/ForumScreen/components/ListItem.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {
  deleteConversation,
  getConversations,
  IPostedConversation,
} from 'api/forum.ts';
import {AppYesNoModal} from 'components/app/AppYesNoModal';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const QuestionsTab = () => {
  const activeTheme = useActiveTheme();
  const [modalState, setModalState] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestions] = useState<IPostedConversation[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {data, isLoading, refetch, isSuccess, isRefetching} = useQuery({
    queryKey: ['myQuestions'],
    queryFn: () => getConversations(cursor, 'user_posts'),
  });

  const deleteQuestion = useMutation({
    mutationFn: () => {
      return deleteConversation(questionId);
    },
    onSuccess: () => {
      setQuestions(prevState => {
        return prevState.filter(el => el.id !== questionId);
      });
      queryClient.setQueryData(
        ['questions'],
        (oldData: IPostedConversation[]) => {
          return {...oldData, deletedId: questionId, results: []};
        },
      );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setCursor(data.next);
      setQuestions(prevState => {
        if (data.newAdded) {
          return [...(data?.results || []), ...prevState];
        } else {
          return [...prevState, ...(data?.results || [])];
        }
      });
    }
  }, [data, isSuccess]);

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        flex: 1,
        paddingHorizontal: 10,
      }}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 20}}
          color={activeTheme.textSecondary}
        />
      ) : question ? (
        <FlatList
          data={question}
          onScroll={({nativeEvent}) => {
            if (
              Math.round(
                nativeEvent.contentOffset.y +
                  nativeEvent.layoutMeasurement.height,
              ) === Math.round(nativeEvent.contentSize.height)
            ) {
              cursor && refetch();
            }
          }}
          renderItem={item => (
            <ListItem
              item={item.item}
              isQuestionsTab={true}
              listIndex={item.index}
              iconAction={() => {
                setQuestionId(item.item.id);
                setModalState(true);
              }}
            />
          )}
          ListFooterComponent={
            question && cursor ? (
              <ActivityIndicator
                size={'large'}
                style={{marginBottom: 25}}
                color={activeTheme.textSecondary}
              />
            ) : (
              <Text
                variant={'titleLarge'}
                style={{textAlign: 'center', marginBottom: 25}}>
                That's it ;)
              </Text>
            )
          }
        />
      ) : (
        <Text
          variant={'titleLarge'}
          style={{textAlign: 'center', marginTop: 10}}>
          No questions yet
        </Text>
      )}
      <AppYesNoModal
        label={'Are you sure you want to delete this question?'}
        modalState={modalState}
        changeModalState={setModalState}
        noText={'Cancel'}
        yesText={'Delete'}
        loading={deleteQuestion.isPending}
        yesAction={() => {
          deleteQuestion.mutate();
          setModalState(false);
        }}
      />
    </SafeAreaView>
  );
};
