import React, { useEffect,useState } from "react";
import { StyleSheet, View, Text, TextInput,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {insertUser,getUser,updatetUser} from "../../helper/db";
const Settings = ({ navigation }) => {
  const [user,setUser]=useState('');
  const [id,setId]=useState(0);
  const [company,setCompany]=useState('');
  const [hasValue,setHasValue]=useState(false);

  useEffect(() => {
    const getData =async () =>{
      const dbUser = await getUser();
        setUser(dbUser.user);
        setCompany(dbUser.company);
        setId(dbUser.id);
        setHasValue(true);
    }
    getData();
  },[save]);
  const save =async () =>{
    

    const result=hasValue? await updatetUser(company,user,id): await insertUser(company,user); 
    navigation.navigate('apl');
    
  }
  return (
    
    <View style={{marginHorizontal:5,borderColor:Colors.primary,borderRadius:10,borderWidth: 1,width:'97%',padding:10,height:'97%',marginTop:10}}>
      
      <View style={{flexDirection: "column"}}>
      <View style={{flexDirection:'row'}}>
        
        <Text style={styles.label}>
          Company: 
        </Text>
          <TextInput
            style={styles.input}
            placeholder="Comany Name"
            keyboardType="default"
            onChangeText={setCompany}
            value={company}
          />
        </View>
        <View style={{  flexDirection: "row" }}>
        <Text style={styles.label}>
          User: 
        </Text>
          <TextInput
            style={styles.input}
            placeholder="User"
            keyboardType="default"
            onChangeText={setUser}
            value={user}
          />
        </View>
      </View>
      <TouchableOpacity
              color={Colors.accentColor}
              disabled={user === "" || company === ""}
              onPress={save}
              style={[
                styles.submit,
                user === "" || company === ""
                  ? styles.disabledButton
                  : styles.enabledButton,
              ]}
            >
              <View style={styles.receivedContainer}>
                <Text style={{ color: Colors.primary }}>{hasValue?"Update":"Save"}</Text>
                <MaterialCommunityIcons name="content-save" size={24}  color={Colors.primary} />
              </View>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'60%',
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius:10,
  },
  label:{ fontWeight: "bold" ,width:'30%',marginTop:20},
  receivedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  enabledButton: {
    backgroundColor: Colors.accentColor,
  },
  submit: {
    borderRadius: 5,

    alignItems: "center",
    marginEnd: 30,
    marginStart: 30,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
    marginTop: 20,
  },
});
export default Settings;
