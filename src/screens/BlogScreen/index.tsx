import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/RootStack.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {ActivityIndicator, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useQuery} from '@tanstack/react-query';
import {getArticleById} from 'api/articles.ts';
import {transformDate} from 'utils/datePipe.ts';

export const BlogScreen = () => {
  const activeTheme = useActiveTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'Blog'>>();

  const {isPending, data} = useQuery({
    queryKey: ['articleById', route.params.blogId],
    queryFn: () => getArticleById(route.params.blogId),
  });

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
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
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text variant={'headlineMedium'}>{data?.data.title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  data?.data.image ||
                  'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
              }}
              style={{height: 250, width: '100%', borderRadius: 10}}
            />
          </View>
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
                {transformDate(data?.data.created_at || '')}
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
                {data?.data.read_time} minutes
              </Text>
            </View>
          </View>
          <Text variant={'bodyLarge'} style={{marginBottom: 20}}>
            {data?.data.description}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otherVideoCourseData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textWithIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
});
