import {Card, IconButton, Text} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IPostedConversation} from 'api/forum.ts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppAvatar} from 'components/app/AppAvatar';
import {transformDate} from 'utils/datePipe.ts';

export const ListItem = ({
  item,
  listIndex,
  iconAction,
  isQuestionsTab = false,
}: {
  item: IPostedConversation;
  listIndex: number;
  iconAction: () => void;
  isQuestionsTab?: boolean;
}) => {
  const activeTheme = useActiveTheme();
  const navigation = useNavigation();

  const goToChat = () => {
    navigation.navigate('ForumChat', {
      chatId: item.id,
    });
  };

  return (
    <Card
      style={[
        styles.cardContainer,
        {
          backgroundColor: activeTheme.questionListItem,
          marginTop: listIndex === 0 ? 10 : 0,
          marginHorizontal: 10,
        },
      ]}>
      <Pressable
        android_ripple={{borderless: true}}
        onPress={goToChat}
        style={{
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.cardHeader}>
            <AppAvatar
              firstName={item?.user?.first_name}
              lastName={item?.user?.last_name}
              avatarSrc={item?.user?.profile_photo}
              bgColor={item?.user?.color}
            />
            <Text>
              {item?.user?.first_name} {item?.user?.last_name}
            </Text>
          </View>
          {item.is_author && isQuestionsTab && (
            <IconButton
              onPress={iconAction}
              iconColor={activeTheme.error}
              icon={'delete'}
              size={32}
            />
          )}
        </View>
        <Text variant={'titleMedium'} style={styles.cardBody}>
          {item.text}
        </Text>
        <View style={styles.cardFooter}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Icon
              name={'calendar-month'}
              size={20}
              color={activeTheme.textSecondary}
            />
            <Text>{transformDate(item.created_at)}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Icon
              name={'remove-red-eye'}
              size={20}
              color={activeTheme.textSecondary}
            />
            <Text>{item.views}</Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 100,
  },
  cardBody: {
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
