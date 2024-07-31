import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Card, Text, TextInput} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/RootStack.ts';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {VideoCourses} from 'screens/HomeScreen/components/VideoCourse.tsx';
import {getArticlesCategories} from 'api/articles.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const activeTheme = useActiveTheme();

  const {isPending, refetch, data, error, isRefetching} = useQuery({
    queryKey: ['articleLists'],
    queryFn: getArticlesCategories,
  });

  return (
    <SafeAreaView edges={['right', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        style={{
          paddingTop: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 40,
        }}>
        <View style={styles.featuresGrid}>
          {isPending ? (
            <ActivityIndicator
              size={'large'}
              color={activeTheme.textSecondary}
            />
          ) : (
            data?.data.map(e => (
              <Card
                style={[
                  styles.featureContainer,
                  {backgroundColor: activeTheme.backgroundPrimary},
                ]}
                key={e.id}
                onPress={() =>
                  navigation.navigate('ArticlesList', {categoryId: +e.id})
                }>
                <Icon
                  name={e.icon_id}
                  size={30}
                  color={activeTheme.textPrimary}
                  style={{alignSelf: 'center', paddingBottom: 10}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    alignItems: 'flex-end',
                    color: activeTheme.textPrimary,
                  }}>
                  {e.name}
                </Text>
              </Card>
            ))
          )}
        </View>
        <Text
          style={{marginTop: 10, marginHorizontal: 10}}
          variant={'titleLarge'}>
          Video courses
        </Text>
        <View style={{paddingTop: 10}}>
          {isPending ? (
            <ActivityIndicator
              size={'large'}
              color={activeTheme.textSecondary}
            />
          ) : (
            <VideoCourses />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  featuresGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  youtubePlayer: {
    alignSelf: 'stretch',
    height: 200,
  },
  featureContainer: {
    flex: 1,
    aspectRatio: 1,
    height: 1,
    flexBasis: '48%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
});
