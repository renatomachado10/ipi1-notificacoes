import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Expo from 'expo';

async function getToken() 
{

  if (!Expo.Constants.isDevice) 
  {
    return;
  }

  let { status } = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS,);

  if (status !== 'granted')
  {
    return;
  }

  let value = await Expo.Notifications.getExpoPushTokenAsync();
  
  console.log('Our token', value);

}

export default class App extends Component {
  componentDidMount() 
  {
    getToken();

    this.listener = Expo.Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() 
  {
    this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => 
  {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`,);
  };

  render() 
  {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>IPI-1</Text>
        <Text style={styles.paragraph}>Renato Machado Neves</Text>
        <Text style={styles.paragraph}>Teste Notificações</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  paragraph: 
  {
    margin: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },

});
