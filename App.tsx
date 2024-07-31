import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import {AppDrawer} from 'components/app/AppDrawer';
import {DrawerProvider} from 'providers/DrawerProvider.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from 'providers/AuthProvide.tsx';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const activeTheme = useActiveTheme();

  changeNavigationBarColor(activeTheme.backgroundPrimary, true, true);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SafeAreaProvider
            style={{backgroundColor: activeTheme.backgroundPrimary}}>
            <AuthProvider>
              <DrawerProvider>
                <StatusBar
                  barStyle={
                    colorScheme === 'dark' ? 'light-content' : 'dark-content'
                  }
                  backgroundColor={activeTheme.backgroundPrimary}
                />
                <AppDrawer />
              </DrawerProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
