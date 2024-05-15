import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'screens/ForumScreen/components/ListItem.tsx';

export const GeneralTab = () => {
  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        flex: 1,
        paddingHorizontal: 10,
      }}>
      <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '10', '8', '9']}
        renderItem={item => (
          <ListItem item={item.item} listIndex={item.index} />
        )}
      />
    </SafeAreaView>
  );
};
