import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {IConversation} from 'api/forum.ts';
import {AppAvatar} from 'components/app/AppAvatar';
import {transformDate} from 'utils/datePipe.ts';
import {memo} from 'react';

const QuestionBlock = ({question}: {question?: IConversation}) => {
  const activeTheme = useActiveTheme();

  return (
    <View
      style={[
        styles.questionContainer,
        {backgroundColor: activeTheme.questionListItem},
      ]}>
      <View style={styles.author}>
        <AppAvatar
          firstName={question?.user.first_name || ''}
          lastName={question?.user.last_name}
          avatarSrc={question?.user.profile_photo}
          bgColor={question?.user.color}
        />
        <Text variant={'titleMedium'}>
          {question?.user.first_name} {question?.user.last_name}
        </Text>
      </View>
      <Text style={styles.question}>{question?.text}</Text>
      <View style={styles.questionData}>
        <View style={styles.iconWithText}>
          <Icon
            name={'calendar-month'}
            size={20}
            color={activeTheme.textPrimary}
          />
          <Text>{transformDate(question?.created_at || '')}</Text>
        </View>
        <View style={styles.iconWithText}>
          <Icon
            name={'remove-red-eye'}
            size={20}
            color={activeTheme.textPrimary}
          />
          <Text>{question?.views}</Text>
        </View>
      </View>
    </View>
  );
};

export const Question = memo(QuestionBlock);

const styles = StyleSheet.create({
  questionContainer: {
    padding: 10,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    height: 54,
    width: 54,
    borderRadius: 100,
  },
  question: {
    marginTop: 10,
  },
  questionData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconWithText: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },
});
