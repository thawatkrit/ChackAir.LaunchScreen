/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import locations from './locations';
const KEYS_TO_FILTERS = ['user.name', 'subject'];

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      searchTerm: '' 
    };
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  handleInputChange = (text) => {
    if (/^\d+$/.test(text)) {
      this.setState({text: text});
    }
  }
  render() {
    const filteredLocations = locations.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <View style={styles.container}>
        <View style={styles.AqiHeaderInput}>
          <Text style={styles.FontStyle}>ค่า P.AQI</Text>
          <TouchableOpacity
          onPress={this.onPress}>
          <Image
            source={require('./imgs/selectFromDevice.png')}
            style={styles.IconStyle}
          />
         </TouchableOpacity>
         </View>
         <TextInput 
            style={styles.FontInput}
            placeholder="พิมค่า P.AQI..."
            keyboardType={'numeric'}
            onChangeText={this.handleInputChange}
            value={this.state.text}
        />
        <View style={styles.LocationHeaderInput}>
          <Text style={styles.FontStyle}>ชื่อสถานที่</Text>
          <TouchableOpacity
          onPress={this.onPress}>
          <Image
            source={require('./imgs/selectLocation.png')}
            style={styles.IconStyle}
          />
          </TouchableOpacity>
        </View>
        <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term)}} 
          style={styles.searchInput}
          placeholder="พิมชื่อสถานที่ (อำเภอ หรือจังหวัด)..."
          />
        <View style={styles.ItemScroll}>
          <ScrollView>
            {filteredLocations.map(location => {
             return (
                <TouchableOpacity 
                  onPress={this.onChangeText}
                  key={location.id} 
                  style={styles.locationItem}>
                  <View>
                    <Text style={styles.locationName}>{location.user.name}</Text>
                    <Text style={styles.locationSubject}>{location.subject}</Text>
                  </View>
               </TouchableOpacity>
             )
           })}
         </ScrollView>
        </View>
        <View style={styles.BottomButton}>
          <TouchableOpacity
            onPress={this.onPress}>
            <Image
              source={require('./imgs/checkIt.png')}
              style={styles.ButtonIconStyle}
            />
          </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#708090',
  },
  AqiHeaderInput: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    //justifyContent: "flex-end",
    marginTop: 75,
    marginLeft: 10,
    marginRight: 10,
  },
  LocationHeaderInput: {
    //flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    //justifyContent: "flex-end",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  IconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
  },
  FontStyle: {
    fontSize: 30,
    width: 270,
    fontFamily: "KohinoorW00-Bold",
    color: '#001121',
    padding: 5,
  },
  FontInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 20,
    padding: 10,
    fontFamily: "KohinoorW00-Bold",
    color: '#001121',
    backgroundColor: '#F5F5F5',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  locationItem: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0.5,
    borderColor: '#F5F5F5',
    padding: 10,
  },
  locationName: {
    color: '#001121',
    fontFamily: "KohinoorW00-Bold"
  },
  locationSubject: {
    color: '#425473',
    fontFamily: "KohinoorW00-Bold"
  },
  searchInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 20,
    padding: 10,
    fontFamily: "KohinoorW00-Bold",
    color: '#001121',
    backgroundColor: '#F5F5F5',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  ItemScroll: {
    height: 300,
  },
  BottomButton: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonIconStyle: {
    padding: 10,
    height: 190,
    width: 190,
    resizeMode: 'stretch',
  }
});
