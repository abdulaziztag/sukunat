import {Image, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {IAnswer} from 'api/forum.ts';
import {transformDate, transformDateToTime} from 'utils/datePipe.ts';
import {AppAvatar} from 'components/app/AppAvatar';

export const Answer = ({
  answer,
  iconAction,
}: {
  answer: IAnswer;
  iconAction: () => void;
}) => {
  const activeTheme = useActiveTheme();

  return (
    <View
      onTouchEnd={answer.is_author ? iconAction : () => {}}
      style={[
        styles.answerContainer,
        {
          justifyContent: answer.is_author ? 'flex-end' : 'flex-start',
        },
      ]}>
      {!answer.is_author && (
        <AppAvatar
          avatarSrc={answer.user.profile_photo}
          firstName={answer.user.first_name}
          lastName={answer.user.last_name}
          bgColor={answer.user.color}
        />
      )}
      <View
        style={[
          styles.answer,
          {
            backgroundColor: answer.is_author
              ? activeTheme.answerBlock
              : activeTheme.answerBlockForumChat,
            maxWidth: answer.is_author ? '90%' : '80%',
          },
        ]}>
        {!answer.is_author && (
          <Text
            variant={'bodySmall'}
            style={{fontWeight: 'bold', color: answer.user.color}}>
            {answer.user.first_name || 'Anonymous'} {answer.user.last_name}
          </Text>
        )}
        <Text variant={'titleMedium'}>{answer.text}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 40,
          }}>
          <Text variant={'labelMedium'} style={{opacity: 0.7}}>
            {transformDate(answer.created_at)}
          </Text>
          <Text variant={'labelMedium'} style={{opacity: 0.7}}>
            {transformDateToTime(answer.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  answer: {
    flexDirection: 'column',
    rowGap: 5,
    elevation: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
