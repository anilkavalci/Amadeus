import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigation/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/utils/query-client';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NotifierWrapper
        componentProps={{
          titleStyle: styles.notifierTitleStyle,
        }}>
        <QueryClientProvider client={queryClient}>
          <React.Suspense fallback={<></>}>
            <Navigation />
          </React.Suspense>
        </QueryClientProvider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  notifierTitleStyle: {
    fontSize: 22,
    color: '#1F214C',
  },
});
