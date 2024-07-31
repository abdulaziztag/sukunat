import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Text} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/RootStack.ts';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const VideoScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Video'>>();
  const activeTheme = useActiveTheme();

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{backgroundColor: activeTheme.backgroundSecondary, flex: 1}}>
      <ScrollView>
        <YoutubePlayer height={220} videoId={route.params.videoSrc} />
        <Text
          variant={'headlineMedium'}
          style={{marginHorizontal: 10, marginTop: 10}}>
          {route.params.videoTitle}
        </Text>
        <Text
          variant={'bodyMedium'}
          style={{marginHorizontal: 10, marginTop: 10}}>
          {route.params.videoDescription}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
