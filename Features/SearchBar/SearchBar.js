/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image
} from 'react-native';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searching_txt: '' };
    this.search = this.search.bind(this);
  }

  search(searching_txt) {
    this.setState({ searching_txt });
    this.props.search(searching_txt);
  }

  render() {
    return (
      <View style={styles.searchSection}>
        <Image source={require('./search-icon.png')} style={styles.Icon} />
        <TextInput
          style={styles.input}
          placeholder="Seller name"
          onChangeText={this.search}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingRight: 20,
    paddingLeft: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    color: '#424242',
    fontSize: 17.5,
    justifyContent: "center"
  },
  Icon: {
    height: 20,
    width: 20,
    left: 40, zIndex: 1, 
    position: "absolute", 
    alignSelf: "center"
  },
});

export default SearchBar;
