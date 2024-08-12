import {Image, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';
import React, {useEffect} from 'react';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getVideoCoursesList, VIDEO_COURSES_PER_PAGE} from 'api/videoCourses.ts';
import {AppPagination} from 'components/app/AppPagination';
import {ARTICLES_PER_PAGE} from 'api/articles.ts';

export const VideoCourses = () => {
  const activeTheme = useActiveTheme();
  const navigation = useNavigation();
  const [page, setPage] = React.useState(1);

  const {data, isSuccess, refetch} = useQuery({
    queryKey: ['videoCourses'],
    queryFn: () => getVideoCoursesList(page),
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    isSuccess && (
      <>
        {data.data.results.map(item => (
          <Pressable
            android_ripple={{foreground: true, color: ''}}
            key={item.id}
            style={{
              marginHorizontal: 10,
              borderRadius: 10,
              marginVertical: 5,
              borderWidth: 1,
              gap: 10,
              flexDirection: 'row',
              borderBottomColor: activeTheme.textSecondary,
            }}
            onPress={() => {
              navigation.navigate('VideoCourse', {playlistId: item.id});
            }}>
            <Image
              source={{
                uri:
                  item.image ||
                  'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
              }}
              resizeMode={'cover'}
              style={{
                height: 100,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingRight: 10,
              }}>
              <Text variant={'titleMedium'}>{item.title}</Text>
              <Text
                variant={'bodyMedium'}
                numberOfLines={1}
                style={{
                  color: activeTheme.textPrimary,
                  width: '90%',
                }}>
                {item.description}
              </Text>
              {
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Icon
                      name={'play-circle'}
                      size={20}
                      color={activeTheme.textSecondary}
                    />
                    <Text style={{color: activeTheme.textSecondary}}>
                      {item.video_count} video(s)
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Icon
                      name={'access-time'}
                      size={20}
                      color={activeTheme.textSecondary}
                    />
                    <Text style={{color: activeTheme.textSecondary}}>
                      {item.total_duration.split(':').join(' : ')}
                    </Text>
                  </View>
                </View>
              }
            </View>
          </Pressable>
        ))}
        {Math.round(data?.data.count / VIDEO_COURSES_PER_PAGE) > 1 && (
          <AppPagination
            page={page}
            setPage={setPage}
            totalPages={Math.round(data?.data.count / VIDEO_COURSES_PER_PAGE)}
          />
        )}
      </>
    )
  );
};
