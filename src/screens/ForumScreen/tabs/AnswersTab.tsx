import {FlatList} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ListItem} from 'screens/ForumScreen/components/ListItem.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {getConversations, IPostedConversation} from 'api/forum.ts';
import {useQuery} from '@tanstack/react-query';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const AnswersTab = () => {
  const activeTheme = useActiveTheme();
  const [question, setQuestions] = useState<IPostedConversation[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  const {data, isLoading, refetch, isSuccess} = useQuery({
    queryKey: ['myAnswers'],
    queryFn: () => getConversations(cursor, 'user_replies'),
  });

  useEffect(() => {
    if (isSuccess) {
      setCursor(data.next);
      setQuestions(prevState => {
        return [...prevState, ...(data?.results || [])];
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
              iconAction={() => {}}
              item={item.item}
              listIndex={item.index}
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
    </SafeAreaView>
  );
};
