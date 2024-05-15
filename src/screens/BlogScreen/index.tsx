import {FlatList, Image, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconButton, Text, TextInput} from 'react-native-paper';
import {RootStackParamList} from 'types/RootStack.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Answer} from 'screens/ForumChatScreen/components/Answer.tsx';
import {Question} from 'screens/ForumChatScreen/components/Question.tsx';

export const ForumChatScreen = () => {
  const activeTheme = useActiveTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ForumChat'>>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: activeTheme.backgroundPrimary,
      }}>
      <FlatList
        ListHeaderComponent={<Question />}
        data={['1', '2', '1', '2']}
        renderItem={() => <Answer />}
        style={styles.mainContainer}
        contentContainerStyle={{paddingBottom: 10}}
      />
      <View
        style={[
          styles.addCommentInputContainer,
          {backgroundColor: activeTheme.backgroundSecondary},
        ]}>
        <TextInput
          style={[
            styles.addCommentInput,
            {backgroundColor: activeTheme.backgroundSecondary},
          ]}
          mode={'outlined'}
          activeOutlineColor={activeTheme.textPrimary}
          outlineColor={activeTheme.textSecondary}
          label={'Add comment'}
        />
        <IconButton
          icon={'arrow-up'}
          mode={'contained'}
          style={{
            marginTop: 10,
            backgroundColor: 'green',
          }}
          iconColor={activeTheme.textPrimary}
          size={25}
          onPress={() => {}}
        />
      </View>
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
    flexGrow: 1,
    height: 45,
    padding: 0,
    margin: 0,
  },
});
