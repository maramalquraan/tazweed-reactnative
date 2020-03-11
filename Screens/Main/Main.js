/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { } from 'react-native';
import SearchBar from './../../Features/SearchBar/SearchBar';
import List from '../../Features/List/List';
import axios from 'axios';

class Main extends React.Component {
  _searchBar = null;
  sellers = [];

  constructor(props) {
    super(props);
    this.state = { sellers: [], refreshing: false };
    this.search = this.search.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    this.setState({
      refreshing: true
    })
    axios.get("http://localhost:8080/v1/sellers")
      .then((response) => {
        this.sellers = response?.data?.data;
        console.log("response", response)
        this.setState({ sellers: response?.data?.data, refreshing: false })
      })
      .catch((error) => {
        this.setState({ refreshing: false })
        console.log('"/sellers" get request error', error)
      })
  }

  search(txt) {
    let sellers = this.sellers.filter(item => {
      return item.name.trim().toLowerCase().indexOf(txt.trim().toLowerCase()) !== -1;
    });
    this.setState({ sellers })
  }

  render() {
    return (
      <>
        <SearchBar ref={ref => (this._searchBar = ref)} search={this.search} />
        <List refresh={this.refresh} data={this.state.sellers} refreshing={this.state.refreshing}/>
      </>
    );
  }
}

export default Main;
