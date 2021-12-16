import React, { Component } from 'react';
//import * as React from 'react';
//import { AppRegistry } from 'react-native';
import { StyleSheet, FlatList, View, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, TextInput, FAB, Button, Paragraph, Text, List, 
         Headline, Provider as PaperProvider, Title, Card } from 'react-native-paper';
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

      <View style={styles.contactContainer}>
        <FlatList
          data={[
            {id: 1, name: 'Vincent', pos: 'ceo'},
            {id: 2, name: 'Summer', pos: 'ceo'},
            {id: 3, name: 'Jane', pos: 'ceo'},
            {id: 4, name: 'Birdie', pos: 'ceo'},
            {id: 5, name: 'Devin', pos: 'ceo'},
            {id: 6, name: 'Dan', pos: 'ceo'},
            {id: 7, name: 'Dominic', pos: 'ceo'},
            {id: 8, name: 'Jackson', pos: 'ceo'},
            {id: 9, name: 'James', pos: 'ceo'},
            {id: 10, name: 'Joel', pos: 'ceo'},
            {id: 11, name: 'John', pos: 'ceo'},
            {id: 12, name: 'Jillian', pos: 'ceo'},
            {id: 13, name: 'Jimmy', pos: 'ceo'},
            {id: 14, name: 'Julie', pos: 'ceo'},
          ]}
          renderItem={({item}) => <List.Item
                                    title={item.name}
                                    description={item.pos}
                                    left={props => <List.Icon {...props} icon="folder" />}
                                  />}
          ItemSeparatorComponent={
            //Platform.OS == 'android' &&
            (({ highlighted }) => (
              <View
                style={{
                  borderBottomColor: '#bbbbbb',
                  marginHorizontal: 20,
                  borderBottomWidth: 2,
                }}
              />
            ))
          }      
        />
      </View>


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
  contactContainer: {
    flex: 1,
    paddingTop: 24,
    marginTop: 24,
  },
  contactItem: {
    padding: 20,
    marginVertical: 8,
    fontSize: 18,
    height: 44,
  },
  menuText: {
    fontSize: 20,
    color: '#ffffff',
    ...Platform.select({
      ios: {
        fontFamily: 'Papyrus',
      },
      android: {
        fontFamily: 'Roboto',
      }
    }),
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

