import {IconButton, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';

export const AppPagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  const activeTheme = useActiveTheme();

  return (
    <View style={styles.pagination}>
      <IconButton
        icon={'chevron-left'}
        size={40}
        iconColor={activeTheme.textPrimary}
        onPress={() => setPage(page - 1)}
        disabled={page === 1}
      />
      <Text variant={'bodyLarge'} style={{color: activeTheme.textPrimary}}>
        Page {page} out of {totalPages}
      </Text>
      <IconButton
        icon={'chevron-right'}
        size={40}
        iconColor={activeTheme.textPrimary}
        onPress={() => setPage(page + 1)}
        disabled={page === totalPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
