import {useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {useState} from 'react';
import {TabBar} from './components/TabBar.tsx';
import {GeneralTab} from 'screens/ForumScreen/tabs/GeneralTab.tsx';
import {QuestionsTab} from 'screens/ForumScreen/tabs/QuestionsTab.tsx';
import {AnswersTab} from 'screens/ForumScreen/tabs/AnswersTab.tsx';
import {FAB} from 'react-native-paper';
import {SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {AppAddQuestionModal} from 'components/app/AppAddQuestionModal';

/*export const Tabs: TopBarElementProps[] = [
  {
    key: 'general',
    value: GeneralTab,
  },
  {
    key: 'questions',
    value: QuestionsTab,
  },
  {
    key: 'answers',
    value: AnswersTab,
  },
];*/

/*const renderScene = SceneMap({
  ...Tabs.reduce(
    (acc: {[key: string]: () => JSX.Element}, el: TopBarElementProps) => {
      acc[el.key] = el.value;
      return acc;
    },
    {},
  ),
});*/

export const ForumScreen = () => {
  const layout = useWindowDimensions();
  const activeTheme = useActiveTheme();

  const [index, setIndex] = useState(0);
  const [addQuestionModalState, setAddQuestionModalState] =
    useState<boolean>(false);
  const [routes] = useState([
    {key: 'general', title: 'Forum'},
    {key: 'questions', title: 'Savollarim'} /*
    {key: 'answers', title: 'Javoblarim'},*/,
  ]);

  const renderScene = ({
    route,
  }: SceneRendererProps & {route: {key: string; title: string}}) => {
    switch (route.key) {
      case 'general':
        return <GeneralTab />;
      case 'questions':
        return <QuestionsTab />; /*
      case 'answers':
        return <AnswersTab />;*/
      default:
        return null;
    }
  };

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => <TabBar {...props} activeIndex={index} />}
        initialLayout={{width: layout.width}}
      />
      <FAB
        icon={'plus'}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          borderRadius: 50,
          backgroundColor: activeTheme.backgroundSecondary,
        }}
        onPress={() => setAddQuestionModalState(true)}
      />
      <AppAddQuestionModal
        modalState={addQuestionModalState}
        changeModalState={modalState => setAddQuestionModalState(modalState)}
      />
    </>
  );
};
