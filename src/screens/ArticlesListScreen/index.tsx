import {ActivityIndicator, Text} from 'react-native-paper';
import {FlatList, Image, Pressable, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/RootStack.ts';
import {useQuery} from '@tanstack/react-query';
import {ARTICLES_PER_PAGE, getArticlesByCategory} from 'api/articles.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {transformDate} from 'utils/datePipe.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppPagination} from 'components/app/AppPagination';
import {useEffect, useState} from 'react';

export const ArticlesListScreen = () => {
  const activeTheme = useActiveTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ArticlesList'>>();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  const {data, isPending, refetch} = useQuery({
    queryKey: ['articlesList', route.params.categoryId],
    queryFn: () => getArticlesByCategory(route.params.categoryId, page),
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: activeTheme.backgroundSecondary,
      }}>
      {isPending ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 20}}
          color={activeTheme.textSecondary}
        />
      ) : data?.data.results.length ? (
        <>
          <FlatList
            data={data?.data.results}
            renderItem={({item}) => (
              <Pressable
                key={item.id}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#858181',
                }}
                android_ripple={{color: ''}}
                onPress={() => {
                  navigation.navigate('Blog', {blogId: item.id});
                }}>
                <Image
                  source={{
                    uri:
                      item.image ||
                      'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
                  }}
                  style={{height: 60, width: 80, borderRadius: 5}}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    height: 90,
                    gap: 20,
                  }}>
                  <Text
                    variant={'titleMedium'}
                    style={{fontWeight: 'bold'}}
                    numberOfLines={3}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <Icon name={'calendar'} size={16} />
                      <Text variant={'labelSmall'}>
                        {transformDate(item.created_at)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <Icon name={'clock'} size={16} />
                      <Text variant={'labelSmall'}>
                        {item.read_time} minutes
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
          {Math.round(data?.data.count / ARTICLES_PER_PAGE) > 1 && (
            <AppPagination
              page={page}
              setPage={setPage}
              totalPages={Math.round(data?.data.count / ARTICLES_PER_PAGE)}
            />
          )}
        </>
      ) : (
        <Text>No articles</Text>
      )}
    </SafeAreaView>
  );
};
