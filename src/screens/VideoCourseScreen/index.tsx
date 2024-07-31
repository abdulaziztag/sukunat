import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/RootStack.ts';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getArticleById} from 'api/articles.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getVideoCoursePlaylist, getVideoCoursesList} from 'api/videoCourses.ts';
import {transformDate} from 'utils/datePipe.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoCourse'>;

export const VideoCourseScreen: React.FC<Props> = ({navigation}) => {
  const activeTheme = useActiveTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'VideoCourse'>>();

  const {isPending, data} = useQuery({
    queryKey: ['playlistId', route.params.playlistId],
    queryFn: () => getVideoCoursePlaylist(route.params.playlistId),
  });

  return isPending ? (
    <ActivityIndicator
      size={'large'}
      style={{marginTop: 20}}
      color={activeTheme.textSecondary}
    />
  ) : (
    <SafeAreaView
      edges={['left', 'right']}
      style={{backgroundColor: activeTheme.backgroundSecondary, flex: 1}}>
      <FlatList
        style={{marginTop: 10}}
        data={data?.data.results}
        ListHeaderComponent={() => (
          <>
            <Text variant={'headlineMedium'} style={{marginHorizontal: 10}}>
              {data?.data.video_course.title}
            </Text>
            <Text
              variant={'bodyLarge'}
              style={{marginHorizontal: 10, marginTop: 10}}>
              {data?.data.video_course.description}
            </Text>
            <View style={styles.otherVideoCourseData}>
              <View style={styles.textWithIcons}>
                <Icon
                  name={'calendar-month'}
                  size={20}
                  color={activeTheme.textSecondary}
                />
                <Text
                  variant={'bodyMedium'}
                  style={{color: activeTheme.textSecondary}}>
                  {transformDate(data?.data.video_course.created_at || '')}
                </Text>
              </View>
              <View style={styles.textWithIcons}>
                <Icon
                  name={'access-time'}
                  size={20}
                  color={activeTheme.textSecondary}
                />
                <Text
                  variant={'bodyMedium'}
                  style={{color: activeTheme.textSecondary}}>
                  {data?.data.video_course.total_duration}
                </Text>
              </View>
            </View>
            <Text
              variant={'titleLarge'}
              style={{marginHorizontal: 10, marginTop: 10}}>
              Course list
            </Text>
          </>
        )}
        renderItem={item => {
          return (
            <Pressable
              android_ripple={{color: ''}}
              onPress={() => {
                navigation.navigate('Video', {
                  videoSrc: item.item.youtube_id,
                  videoTitle: item.item.title,
                  videoDescription: item.item.description,
                });
              }}
              key={item.index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                columnGap: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text variant={'bodyMedium'} style={{alignSelf: 'center'}}>
                {item.index + 1}
              </Text>
              <Image
                source={{uri: item.item.image || data?.data.video_course.image}}
                height={50}
                width={80}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                }}
              />
              <View style={{flex: 1}}>
                <Text variant={'titleMedium'} numberOfLines={2}>
                  {item.item.title}
                </Text>
                <Text
                  variant={'labelSmall'}
                  numberOfLines={1}
                  style={{color: activeTheme.textSecondary}}>
                  {item.item.description}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otherVideoCourseData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  textWithIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
});
