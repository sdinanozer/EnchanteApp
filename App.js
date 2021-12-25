import React, { Component } from 'react';
//import * as React from 'react';
//import { AppRegistry } from 'react-native';
import { StyleSheet, FlatList, View, KeyboardAvoidingView, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, TextInput, FAB, Button, Paragraph, Text, List, ListItem, IconButton, Colors,
         Headline, Provider as PaperProvider, Title, Card, Avatar } from 'react-native-paper';
//import { expo as appName } from './app.json';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <><StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ContactList" component={ContactListScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
      </NavigationContainer></>
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
      <Button onPress={() => navigation.navigate("ContactList")} style={styles.loginButton} color="#ffffff" >
        LOGIN
      </Button>
      <Button onPress={() => navigation.navigate("ContactList")} style={styles.signupButton} color="#6800ef" >
        Create an account
      </Button>
    </PaperProvider>
  );
};

const ContactListScreen = ({ navigation }) => {
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
            {id: 1, name: 'Vincent', pos: 'HR', img: require('./assets/pfp2.png')},
            {id: 2, name: 'Summer', pos: 'Marketing', img: require('./assets/pfp1.png')},
            {id: 3, name: 'Jane', pos: 'CEO', img: require('./assets/pfp9.png')},
            {id: 4, name: 'Birdie', pos: 'Sales Engineer', img: require('./assets/pfp3.png')},
            {id: 5, name: 'Devin', pos: 'DevOps', img: require('./assets/pfp5.png')},
            {id: 6, name: 'Dan', pos: 'CTO', img: require('./assets/pfp4.png')},
            {id: 7, name: 'Dominic', pos: 'QA', img: require('./assets/pfp11-2.png')},
            {id: 8, name: 'Katie', pos: 'Senior Developer', img: require('./assets/pfp6.png')},
            {id: 9, name: 'James', pos: 'Database Admin', img: require('./assets/pfp10.png')},
            {id: 10, name: 'Joel', pos: 'Network Admin', img: require('./assets/pfp8.png')},
            {id: 11, name: 'Marcelle', pos: 'Backend Developer', img: require('./assets/pfp7.png')},
          ]}
          renderItem={({item}) => ( <TouchableOpacity onPress={() => navigation.navigate("Contact", {itemId: item.id, name: item.name, job: item.pos, img: item.img})}>
                                    <List.Item
                                      title={item.name}
                                      description={item.pos}
                                      left={props => <Avatar.Image size={40} source={item.img} style={{marginTop: 8, marginLeft: 10}} />}
                                      />
                                    </TouchableOpacity>
                                  )}
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

const ContactScreen = ({ route, navigation }) => {
  const { itemId, name, job, img } = route.params;
  return (
    <PaperProvider>
      <View style={{marginBottom: 10, height: 200}}>
        <Image source={require('./assets/pfp11.jpg')} style={{height: 250}}/>
      </View>
      <FAB style={{alignSelf: 'flex-end', marginRight: 10}} color='white' icon="fountain-pen-tip"/>

      <View style={styles.infoContainer}>
        <View style={{flexDirection: "row", width: "100%", justifyContent: 'flex-end'}} >
          <List.Item
          title={[name, "Smith"].join(" ")}
          description={job}
          left={props => <Avatar.Image size={40} source={img} style={{marginTop: 8, marginLeft: 10}} />}
          style={{width: 100, flexGrow: 1}}
          />
          <View style={{marginRight: 0}}>   
            <IconButton
              icon="emoticon-happy"
              color="#24d4af"
              size={30}
              onPress={() => console.log('Pressed')}
            /> 
          </View>
          <View style={{marginLeft: 0}}>
            <IconButton
              icon="emoticon-neutral"
              color="#24d4af"
              size={30}
              onPress={() => console.log('Pressed')}
            /> 
          </View>
          <View style={{marginLeft: 10}}>   
            <IconButton
              icon="emoticon-sad"
              color="#24d4af"
              size={30}
              onPress={() => console.log('Pressed')}
            /> 
          </View>
        </View>
        <FlatList
          data={[
            {id: 1, name: 'Sandra Adams', icon:'account'},
            {id: 2, name: '123-456-7890', icon:'phone'},
            {id: 3, name: job, icon:'account-group'},
            {id: 4, name: 'CaseCampus', icon:'map-marker'},
            {id: 5, name: '12.12.2020', icon:'calendar-month'},
            {id: 6, name: 'sandra@cool-startup.io', icon:'email'},
            {id: 7, name: 'linkedin.com/in/sandraadams', icon:'link-variant'},
            {id: 8, name: 'Ask questions about digital marketing', icon:'note'},
          ]}
          renderItem={({item}) => <List.Item
                                    title={item.name}
                                    left={props => <List.Icon {...props} icon={item.icon} />}
                                  />}
          ItemSeparatorComponent={
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
    paddingVertical: 24,
    marginVertical: 24,
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
  infoContainer: {
    flex: 1,
  }
})

//AppRegistry.registerComponent(appName.name, () => App)

