import React, { useEffect, useState, Component } from 'react';
//import * as React from 'react';
//import { AppRegistry } from 'react-native';
import { StyleSheet, FlatList, View, KeyboardAvoidingView, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, TextInput, FAB, Button, Paragraph, Text, List, ListItem, IconButton, Colors,
         Headline, Provider as PaperProvider, Title, Card, Avatar, Searchbar } from 'react-native-paper';
//import { expo as appName } from './app.json';
import { auth } from './firebase';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

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
          <Stack.Screen name="EditScreen" component={ContactEditScreen} />
        </Stack.Navigator>
      </NavigationContainer></>
    );
  }
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [passw, setPassw] = React.useState('');
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("ContactList")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword( email, passw)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword( email, passw)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

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
      <Button onPress={handleLogin} style={styles.loginButton} color="#ffffff" >
      LOGIN
      </Button>
      <Button onPress={handleSignUp} style={styles.signupButton} color="#6800ef" >
        Create an account
      </Button>
      {/*
      <TouchableOpacity
      onPress={handleLogin}
      style={styles.button}
      >
      <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={handleSignUp}
      style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Create an account</Text>
      </TouchableOpacity>
      */}
    </PaperProvider>
  );
};

const ContactListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const list_data = [
    {id: 1, name: 'Vincent', pos: 'HR', img: require('./assets/pfp2.png')},
    {id: 2, name: 'Summer', pos: 'Marketing', img: require('./assets/pfp1.png')},
    {id: 3, name: 'Sandra', pos: 'Senior Developer', img: require('./assets/pfp9.png')},
    {id: 4, name: 'Birdie', pos: 'Sales Engineer', img: require('./assets/pfp3.png')},
    {id: 5, name: 'Devin', pos: 'DevOps', img: require('./assets/pfp5.png')},
    {id: 6, name: 'Dan', pos: 'CTO', img: require('./assets/pfp4.png')},
    {id: 7, name: 'Dominic', pos: 'QA', img: require('./assets/pfp11.png')},
    {id: 8, name: 'Katie', pos: 'Senior Developer', img: require('./assets/pfp6.png')},
    {id: 9, name: 'James', pos: 'Database Admin', img: require('./assets/pfp10.png')},
    {id: 10, name: 'Joel', pos: 'Network Admin', img: require('./assets/pfp8.png')},
    {id: 11, name: 'Marcelle', pos: 'Backend Developer', img: require('./assets/pfp7.png')},
  ]

  var sort_type = "name_asc"
  /*
  const sort_type = (sort_param, x, y) => {
    if (sort_param == "itemid") {
      return x.id > y.id;
    }
    else if (sort_param == "name_asc") {
      return x.name.localeCompare(y.name);
    }
    else if (sort_param == "name_desc") {
      return y.name.localeCompare(x.name);
    }
    else {
      return x.id > y.id;
    }
  }
  */

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
        console.log("Logged out");
      })
      .catch(error => alert(error.message))
  }

  return (
    <PaperProvider>
      <Appbar style={styles.barTop}>
        <Appbar.Action icon="menu" onPress={() => console.log("Pressed menu.")} />
        <Text style={styles.menuText}> 
          Contacts
        </Text>
        
        <Appbar.Action style={{alignItems: 'flex-end', flex:1}} icon="magnify" onPress={() => console.log("Pressed search.")} />
        <Appbar.Action icon="filter-variant" onPress={() => console.log("Pressed filter.")} />
        <Appbar.Action icon="logout" onPress={handleSignOut} />
      </Appbar>

      <View style={styles.contactContainer}>
        <FlatList
          data={
                  sort_type === "itemid" ? 
                    list_data.sort((a, b) => {a.id > b.id}) : 
                  sort_type === "name_asc" ?
                    list_data.sort((a, b) => {a.name.localeCompare(b.name)}) :
                  list_data.sort((a, b) => {b.name.localeCompare(a.name)})
                }
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

        <FAB style={styles.fab} 
             icon='plus' 
             color='white' 
             onPress={() => navigation.navigate("EditScreen", {itemId: 0, name: "Name Surname", job: "Job", img: "img"})} />
      </Appbar>
    </PaperProvider>
  );
};

const ContactScreen = (props) => {
  const { route, navigation } = props
  const { itemId, name, job, img } = route.params;
  const contact_data = [
    {id: 1, name: [name, "Smith"].join(" "), icon:'account'},
    {id: 2, name: '123-456-7890', icon:'phone'},
    {id: 3, name: job, icon:'account-group'},
    {id: 4, name: 'CaseCampus', icon:'map-marker'},
    {id: 5, name: '12.12.2020', icon:'calendar-month'},
    {id: 6, name: name.toLowerCase()+'@cool-startup.io', icon:'email'},
    {id: 7, name: 'linkedin.com/in/'+name.toLowerCase()+"smith", icon:'link-variant'},
    {id: 8, name: 'Ask questions about digital marketing', icon:'note'},
  ]
  var active_button = "happy"

  return (
    <PaperProvider>
      <View style={{marginBottom: 10, height: 200}}>
        <Image source={require('./assets/pfp9-2.jpg')} style={{height: 250}}/>
      </View>
      <FAB style={{alignSelf: 'flex-end', marginRight: 10}} 
           color='white' 
           icon="fountain-pen-tip" 
           onPress={() => navigation.navigate("EditScreen", {itemId: itemId, name: name, job: job, img: img})}/>

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
              color={active_button == "happy" ? "#24d4af" : "#92ead7"}
              size={30}
              onPress={() => active_button = "neutral"}
            /> 
          </View>
          <View style={{marginLeft: 0}}>
            <IconButton
              icon="emoticon-neutral"
              color="#92ead7"
              size={30}
              onPress={() => console.log(active_button)}
            /> 
          </View>
          <View style={{marginRight: 10}}>
            <IconButton
              icon="emoticon-sad"
              color="#92ead7"
              size={30}
              onPress={() => console.log(active_button)}
            /> 
          </View>
        </View>
        <FlatList
          data={contact_data}
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

const ContactEditScreen = ({ route, navigation }) => {
  const { itemId, name, job, img } = route.params;
  const [name_val, setName] = React.useState('');
  const [phone_val, setPhone] = React.useState('');
  const [job_val, setJob] = React.useState('');
  const [loc_val, setLoc] = React.useState('');
  const [date_val, setDate] = React.useState('');
  const [mail_val, setMail] = React.useState('');
  const [profile_val, setProfile] = React.useState('');
  const [note_val, setNotes] = React.useState('');

  return (
    <PaperProvider>
      <View style={styles.infoContainer}>
        <View style={{flexDirection: "row", width: "100%", justifyContent: 'flex-end', marginTop: 50}} >
          <List.Item
          title="Rate this encounter"
          description=""
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
          <View style={{marginRight: 10}}>
            <IconButton
              icon="emoticon-sad"
              color="#24d4af"
              size={30}
              onPress={() => console.log('Pressed')}
            /> 
          </View>
        </View>
        <View style={styles.editContainer}>
          <TextInput
            label="Name Surname"
            dense
            placeholder={name}
            value={name_val}
            onChangeText={name_val => setName(name_val)}
            right={<TextInput.Icon name="account" />}
          />
          <TextInput
            label="Phone Number"
            dense
            placeholder={"123-456-7890"}
            value={phone_val}
            onChangeText={phone_val => setPhone(phone_val)}
            right={<TextInput.Icon name="phone" />}
          />
          <TextInput
            label="Position"
            dense
            placeholder={job}
            value={job_val}
            onChangeText={job_val => setJob(job_val)}
            right={<TextInput.Icon name="account-group" />}
          />
          <TextInput
            label="Where You Met"
            dense
            placeholder={"CaseCampus"}
            value={loc_val}
            onChangeText={loc_val => setLoc(loc_val)}
            right={<TextInput.Icon name="map-marker" />}
          />
          <TextInput
            label="Calendar"
            dense
            placeholder={"12.12.2021"}
            value={date_val}
            onChangeText={date_val => setDate(date_val)}
            right={<TextInput.Icon name="calendar-month" />}
          />
          <TextInput
            label="E-mail"
            dense
            placeholder={name.toLowerCase()+'@cool-startup.io'}
            value={mail_val}
            onChangeText={mail_val => setMail(mail_val)}
            right={<TextInput.Icon name="email" />}
          />
          <TextInput
            label="LinkedIn Profile"
            dense
            placeholder={'linkedin.com/in/'+name.toLowerCase()+"smith"}
            value={profile_val}
            onChangeText={profile_val => setProfile(profile_val)}
            right={<TextInput.Icon name="link-variant" />}
          />
          <TextInput
            label="Notes"
            dense
            placeholder="Your notes here..."
            value={note_val}
            onChangeText={note_val => setNotes(note_val)}
            right={<TextInput.Icon name="note" />}
          />
        </View>
      </View>
      <Button onPress={() => navigation.navigate("Contact", {itemId: item.id, name: item.name, job: item.pos, img: item.img})} style={styles.loginButton} color="#ffffff" >
      Save Changes
      </Button>
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
    ...Platform.select({
      ios: {
        fontFamily: 'Arial',
      },
      android: {
        fontFamily: 'Roboto',
      }
    }),
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
        fontFamily: 'Arial',
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
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#6800ef',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#6800ef',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#6800ef',
    fontWeight: '700',
    fontSize: 16,
  },
  editContainer: {
    marginHorizontal: 25,
  }
})

//AppRegistry.registerComponent(appName.name, () => App)

