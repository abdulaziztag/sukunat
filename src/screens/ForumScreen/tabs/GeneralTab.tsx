import {FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'screens/ForumScreen/components/ListItem.tsx';
import {getConversations, IPostedConversation} from 'api/forum.ts';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';

export const GeneralTab = () => {
  const activeTheme = useActiveTheme();
  const [question, setQuestions] = useState<IPostedConversation[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  const {data, isLoading, refetch, isSuccess, isRefetching} = useQuery({
    queryKey: ['questions'],
    queryFn: () => getConversations(cursor),
  });

  useEffect(() => {
    if (isSuccess) {
      if (!data.results.length && data.deletedId) {
        setQuestions(prevState => {
          return prevState.filter(el => el.id !== data.deletedId);
        });
      } else {
        setCursor(data.next);
        setQuestions(prevState => {
          if (data.newAdded) {
            return [...(data?.results || []), ...prevState];
          } else {
            return [...prevState, ...(data?.results || [])];
          }
        });
      }
    }
  }, [data, isSuccess]);

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        flex: 1,
      }}>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 20}}
          color={activeTheme.textSecondary}
        />
      ) : (
        <FlatList
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
          data={question}
          renderItem={item => (
            <ListItem
              iconAction={() => {}}
              item={item.item}
              key={item.index}
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
      )}
    </SafeAreaView>
  );
};
