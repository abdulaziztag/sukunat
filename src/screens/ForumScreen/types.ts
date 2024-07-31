import type {
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/src/types';

export type TopBarElementProps = {key: string; value: () => JSX.Element};
export type TopBarProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
  activeIndex: number;
};

export type NavigationStateProps = {
  key: string;
  title: string;
};
