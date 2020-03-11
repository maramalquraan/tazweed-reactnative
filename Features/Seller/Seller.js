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
  Modal,
  TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      item: null,
      email: ""
    };
    this.appoint.bind(this);
  }

  appoint(seller, item) {
    axios.post('http://localhost:8080/v1/slots/book', { slot: { seller_id: seller._id, slot_time: item, email: this.state.email } }).then(() => { seller, item, this.props.refresh()}).catch((error) => { console.log('"/"post request error:', error) })
  }

  email_modal(item) {
    this.props.handle_modalVisibility()
    this.setState({
      visible: !this.state.visible,
      item
    })
  }

  handle_emailInput = (text) => {
    this.setState({
      email: text
    })
  }

  submitEmail = () => {
    this.appoint(this.props.seller, this.state.item)
    this.setState({
      visible: !this.state.visible
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.id || index} style={styles.item} onPress={() => this.email_modal(item)}>
        <View style={styles.inner_item}>
          <Text style={styles.item_txt}> {item} </Text>
          <Text style={styles.item_txt}> Request </Text>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <>
        <Modal
          animationType="slide" visible={this.props.visible} transparent>
          <TouchableOpacity style={styles.container} onPress={this.props.handle_modalVisibility}>
            <TouchableOpacity activeOpacity={1} style={styles.inner_container}>
              <Text style={styles.title}> Request to book an appointment </Text>
              <FlatList
                data={this.props.available_slots}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${item.id || index}`}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.handle_modalVisibility} style={styles.close_btn}>
              <Text style={styles.close_txt}> Close </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Modal animationType="slide" visible={this.state.visible} transparent>
          <TouchableOpacity style={{ ...styles.container }} onPress={() =>
            this.setState({
              visible: !this.state.visible
            })}>
            <TouchableOpacity activeOpacity={1} style={{
              ...styles.inner_container,
              height: hp("25"),
              width: wp("90"),
              justifyContent: "space-between"
            }}>
              <Text style={styles.title}> Provide contacting email </Text>
              <TextInput textContentType="emailAddress" style={styles.input} placeholder="Email" onChangeText={this.handle_emailInput} />
              <TouchableOpacity onPress={this.submitEmail} style={styles.close_btn}>
                <Text style={{ ...styles.close_txt, color: "black" }}> Submit </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>

        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  inner_container: {
    backgroundColor: "white",
    height: hp("85"),
    width: wp("90"),
    padding: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10
  },
  title: {
    backgroundColor: "white",
    fontSize: 17.5,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10
  },
  item: {
    flex: 1,
    flexDirection: "column"
  },
  inner_item: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15
  },
  item_txt: { fontSize: 17.5 },
  separator: {
    width: "90%",
    height: 0.5,
    backgroundColor: "grey",
    alignSelf: "center"
  },
  close_btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  },
  close_txt: { fontSize: 17.5, color: "white" },
  input: {
    height: 25,
    width: wp("60"),
    alignSelf: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 16,
  }
});

export default Seller;
