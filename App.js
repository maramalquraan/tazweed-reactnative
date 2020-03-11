/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Main from './Screens/Main/Main';

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Main />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
});

export default App;
