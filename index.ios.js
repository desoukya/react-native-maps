'use strict';

import React, { Component } from 'react';
import API from './src/api';
import { AppRegistry, StyleSheet, MapView, View, Text } from 'react-native';

class Carpool extends Component {

  constructor(props) {
    super();
    this.state = {
      pin: {
        latitude  : 0,
        longitude : 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        latitude  : region.latitude,
        longitude : region.longitude
      }
    });

    API(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      });
  }

  render() {
    return (
    <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        style={styles.map}>
      </MapView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> {this.state.city}</Text>
        <Text style={styles.text}> {this.state.temperature}</Text>
        <Text style={styles.text}> {this.state.description}</Text>
      </View>
    </View>
  )}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('carpool', () => Carpool);
