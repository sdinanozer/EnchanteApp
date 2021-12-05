import React, { Component } from 'react';
//import * as React from 'react';
//import { AppRegistry } from 'react-native';
import { StyleSheet, FlatList, View, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, TextInput, FAB, Button, Paragraph, Text, Headline, Provider as PaperProvider, Title, Card } from 'react-native-paper';
//import { expo as appName } from './app.json';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Contacts" component={ContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [passw, setPassw] = React.useState('');

  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <Headline style={styles.titleFont}>
          ENCHANTE
        </Headline>
        <View style={styles.inputView}>
          <TextInput label="E-mail" value={email} style={styles.loginInput}
                    onChangeText={email => setEmail(email)} />
        </View>
        <View style={styles.inputView}>
          <TextInput label="Password" value={passw} secureTextEntry={true} style={styles.loginInput}
                    onChangeText={passw => setPassw(passw)} />
        </View>
      </KeyboardAvoidingView>
      <Button onPress={() => navigation.navigate("Contacts")} style={styles.loginButton} color="#ffffff" >
        LOGIN
      </Button>
      <Button onPress={() => navigation.navigate("Contacts")} style={styles.signupButton} color="#6800ef" >
        Create an account
      </Button>
    </PaperProvider>
  );
};

const ContactScreen = ({ navigation }) => {
  return (
    <PaperProvider>
      <Appbar style={styles.barTop}>
        <Appbar.Action icon="menu" onPress={() => console.log("Pressed menu.")} />
        <Text style={styles.menuText}> 
          Contacts
        </Text>
        <Appbar.Action style={{alignItems: 'flex-end', flex:1}} icon="magnify" onPress={() => console.log("Pressed search.")} />
        <Appbar.Action icon="filter-variant" onPress={() => console.log("Pressed filter.")} />
      </Appbar>

      <Appbar style={styles.barBottom}>
        <Appbar.Action icon="contacts" onPress={() => console.log("Pressed contacts.")} />
        <Appbar.Action icon="trash-can-outline" onPress={() => console.log("Pressed delete.")} />

        <FAB style={styles.fab} icon='plus' color='white' onPress={() => console.log("Pressed add contact")} />
      </Appbar>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  titleFont: {
    fontSize: 46,
    marginVertical: 16,
    paddingTop: 20,
    color: '#6800ef',
    fontFamily: 'Roboto',
    fontWeight: "100",
    letterSpacing: 4,
  },
  inputView: {
    width: "100%",
    marginVertical: 12,
    paddingTop: 8,
  },
  loginInput: {
    //left: 10,
    //right: 10,
  },
  loginButton: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 80,
    backgroundColor: "#6800ef",
  },
  signupButton: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 30,
  },
  barBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  barTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  menuText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    marginRight: 24,
    right: 0,
    bottom: 0,
  },
})

//AppRegistry.registerComponent(appName.name, () => App)

