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
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Seller from '../Seller/Seller';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false, available_slots: [], item: {}};
    this.renderItem.bind(this);
    this.handle_modalVisibility.bind(this);
  }

  handle_modalVisibility = item => {
    item
      ? this.setState({
          showModal: !this.state.showModal,
          available_slots: item.available_slots,
          item,
        })
      : this.setState({
          showModal: !this.state.showModal,
        });
  };

  renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: 'silver'}}>
        <TouchableOpacity
          key={item.id || index}
          style={styles.item}
          onPress={() => this.handle_modalVisibility(item)}>
          <View style={styles.item_header}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={require('./tazweed.png')}
                resizeMode="contain"
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </View>
            <Image source={require('./forward.png')} style={styles.Icon} />
          </View>
          <Text style={styles.footer_title}>
            {item.available_slots.length
              ? 'Available Booking Time'
              : 'No Available Booking Time'}
          </Text>
          <View style={styles.item_footer}>
            {item.available_slots.slice(0, 4).map((time, index) => (
              <View key={index} style={styles.time_slots}>
                <Text style={styles.time}>{time}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={styles.listSection}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.props.refresh}
              />
            }
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${item.id || index}`}
          />
        </View>
        <Seller
          visible={this.state.showModal}
          handle_modalVisibility={this.handle_modalVisibility}
          available_slots={this.state.available_slots}
          seller={this.state.item}
          refresh={this.props.refresh}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  listSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: 7.5,
    padding: 10,
  },
  item_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    height: 60,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50 / 2,
  },
  name: {
    fontSize: 20,
  },
  Icon: {
    height: 20,
    width: 20,
    zIndex: 1,
    alignSelf: 'center',
  },
  footer_title: {
    color: '#565656',
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 50,
  },
  item_footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2.5,
    flexWrap: 'wrap',
    marginLeft: 50,
  },
  time_slots: {
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    padding: 10,
    paddingHorizontal: 15,
    margin: 2.5,
  },
  time: {
    fontSize: 13.5,
    color: '#565656',
    fontWeight: 'bold',
  },
});

export default List;
