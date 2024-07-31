import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/Settings/Settings";
import Scanning from "../screens/scanning/Scanning";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  } from "react-native";
import App from "../App";
import {AppRegistry} from 'react-native';
import { name as appName } from '../app.json';
AppRegistry.registerComponent(appName, () => App);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      headerStyle={{
        color: "#fff",
        backgroundColor: Colors.primary,
        
        
      }}
      options={{}}
      screenOptions={{
        headerTitle: () => (
          <Image style={{}} source={require("../assets/logos.png")} />
        ),

        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        // headerRight: () => (
        //   <Image style={{}} source={require("../assets/apl.png")} />
        // ),
      }}
    >
      {/* <Stack.Screen name="main" component={MainScreen} /> */}
      <Stack.Screen name="scanning" component={Scanning} />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: "SETTINGS",
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
}
function MyTabs() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="scanning"
        headerStyle={{
          color: "#e9e9e9",
    backgroundColor: "#ffffff",
    

          // backgroundColor: Colors.primary,
        }}
        screenOptions={{
          tabBarActiveTintColor: Colors.accentColor,
          headerShown: true,
          headerLeft: () => (
            <Image
              style={{
                marginLeft: "3%",
                width:360,
                height:60,
                marginLeft: "3%",
                width:360,
                height:60,
              }}
              source={require("../assets/logos.png")}
            />
          ),
          headerTintColor: "#000",
          tabBarStyle: {
            backgroundColor: "#fff"
          },
          headerTintColor: "#000",
          tabBarStyle: {
            backgroundColor: "#fff"
          },
        }}
      >
        <Tab.Screen
          name="apl"
          component={MyStack}
          options={{
            headerTitle: "",

             headerStyle: {     backgroundColor: "#ffffff"            },
             headerStyle: {     backgroundColor: "#ffffff"            },
            tabBarLabel: "Main",

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            headerTitle: "",
            headerStyle: {     backgroundColor: "#ffffff",
          },
            headerStyle: {     backgroundColor: "#ffffff",
          },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
