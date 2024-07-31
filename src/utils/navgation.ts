// NavigationService.ts
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from 'types/RootStack.ts';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: any, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
