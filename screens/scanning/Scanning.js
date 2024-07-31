import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ApiGet from "../../api/ApiGet";
import ApiGetNew from "../../api/ApiGetNew";
import DetailsModal from "../../components/DetailsModal";
import { getUser } from "../../helper/db";

const Scanning = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState("");
  const [scanned, setScanned] = useState(false);
  
  const [scanNow, setScanNow] = useState(false);
  
  const [detailsModalVisible, setDetailsContainerVisible] = useState(false);
  const [detail, setDetails] = useState([]);
  const [user, setUser] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toastType, setToastType] = useState("#19c22d");
  const [toastHeader, setToastHeader] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  const [isTyping,setIsTyping]=useState(false);
  const getDetailsApi = async () => {
    try {
      if (user === "") {
        alert("Please enter company & user name in setting tab");
        setText("");
        return false;
      }
      if (text.length > 1) {
        var barcode = "";
        setIsLoading(true);
        setDetails([]);
        barcode = text.replace(/\s/g, "");
        let prefix = barcode.substring(0, 3).toLowerCase();

        if (prefix === "eah" || prefix === "agp") {
          barcode = barcode.replace(/\D/g, "");
          // console.log("barcode:", barcode);
          // console.log("var isNotRecevied = await callIsNotReceived(barcode);");

          var isNotRecevied = await callIsNotReceived(barcode);
          // console.log("Is not Received: ", isNotRecevied);
          if (isNotRecevied) {
            var result = JSON.parse(
              await ApiGet("ESP_HS_GetDespatchInfo", barcode)
            );
            // console.log("----------Log-------------");

            // console.log(result);
            // console.log("----------Log-------------");
            setDetails(result);
            setDetailsContainerVisible(true);
          } else {
            alert("The order is already received");
          }
        } else {
          // console.log("the barcode is"+barcode);
          // console.log("the barcode is"+barcode);
          alert("The barcode is NOT exist within the system!");
          setText("");
        }
      }
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
      setDetails([]);
      console.log(ex);
    }
  };
  const callReceived = async () => {
    setDetailsContainerVisible(true);

    var barcode = text.replace(/\D/g, "");
    var result = await callReceivedApi(barcode, `${company}-${user}`);
    console.warn('Result: '+result);
    console.error('Json Result: '+JSON.stringify(result));


    if (result) {
      setToastMessage(`The order barcode successfully received`);
      setToastType("#19c22d");
      setToastHeader("Success");
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
        setIsLoading(false);
        setScanned(false);
        setScanNow(false);
        setScanNow(false);
        setText("");
        setDetailsContainerVisible(false);
      }, 1000);
    } else {

      setToastHeader("Error1");
      setToastType("#c21927");
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
        setIsLoading(false);
        setScanned(false);
        setScanNow(false);
        setScanNow(false);
        setText("");
        setDetailsContainerVisible(false);
      }, 2000);
    }
  };

  const callIsNotReceived = async (barcode) => {
    var methodname = "ESP_HS_IsDespatchReceived";
    var isReceived = JSON.parse(await ApiGet(methodname, barcode));
    var message = await JSON.stringify(isReceived);
    var objMsg = JSON.parse(message);
    // console.log("msg is Received:" + message);

    return message === "false";
  };
  const callReceivedApi1 = async (barcode, name) => {
    try {
      
      var result = await ApiGet("ESP_HS_ReceiveDelivery", `${barcode},${name}`);
      var message = await JSON.stringify(result);
      if (message!='true')
      {
        setToastMessage(`Failed to submit data:  ${message}`);
        return false;  
      }
      // console.log(`Result: ${message}`);
      return true;
    } catch (ex) {
      setToastMessage(`Failed to submit data:  ${ex.message}`);
      return false;
    }
  };
  const callReceivedApi = async (barcode, name) => {
    try {
      var result = await ApiGetNew("ESP_HS_ReceiveDelivery", `${barcode},${name}`);
      var message = JSON.parse(result); // Parse the JSON string
  
      if (!message.success) {
        
        if(result.toLowerCase().includes('true')){
          return true;
        }
        setToastMessage(`Failed to submit data: ${JSON.stringify(message)}`);
        return false;
      }
  
      return true;
    } catch (ex) {
      if (ex.message.toLowerCase().includes('true')) {
        return true;
      }
      setToastMessage(`Failed to submit data: ${ex.message}`);
      return false;
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
   const getData = async () => {
     const dbUser = await getUser();
        setUser(dbUser.user);
        setCompany(dbUser.company);
      
    };
    getData();
    // setUser("Test");
    // setCompany("Test");

    askForPermission();
    props.navigation.setOptions({
      headerShown: false,
    });
    if (scanned) {
      getDetailsApi();
    }
  }, [isFocused, scanned]);
  const handleBarCodeScanned = ({ type, data }) => {
    setIsLoading(true);
    setIsLoading(true);
    setText(data);
    console.log("DATA: "+data);
    setScanned(true);
    setScanNow(false);
    setScanNow(false);
  };
  if (showToastMessage) {
    return (
      <View style={styles.center}>
        <View style={{ textAlign: "center", width: "90%", borderColor: "#000",  borderColor: "black",
              borderWidth: StyleSheet.hairlineWidth, borderRadius: 10 }}>
          <Text style={{textAlign: 'center',color:`${toastType}`,fontWeight:'600',fontSize:18 }}>{toastHeader}</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={{textAlign: 'center',alignItems: "center",fontWeight:'600',fontSize:14 }}>{toastMessage}</Text>
        </View>
      </View>
    );
  }
  if (hasPermission === null)
    return (
      <View style={styles.center}>
        <Text>Request for camera permission</Text>
      </View>
    );
  if (hasPermission === false)
    return (
      <>
       <View style={styles.scanContainer}>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            marginBottom: -40,
            flexDirection: "row",
          }}
        >
          {/* <Text>User:</Text> */}
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={Colors.accentColor}
          />
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {company} - {user}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              width: "60%",
              marginLeft: 80,
              
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter manually"
              keyboardType="default"
              onBlur={()=>setIsTyping(false)}
              onFocus={()=>setIsTyping(true)}
              onChangeText={setText}
              onEndEditing={() => {
                setIsTyping(false);
                getDetailsApi();
                setScanned(true);
              }}
              value={text}
            />
          </View>
         
          
          <View style={{ justifyContent: "flex-start", width: "25%" }}>
            <TouchableOpacity
              color={Colors.accentColor}
              onPress={() => {
                setScanned(false);
                setScanNow(false);
                setScanNow(false);
                setText(null);
                setDetailsContainerVisible(false);
              }}
              style={[styles.submit, styles.againStyle]}
            >
              <View style={{ width: 30, height: 40 }}>
                <MaterialCommunityIcons
                  name="refresh-circle"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[  styles.detailContainer,  { display: detail !== null && detail.length > 0 ? 'flex' : 'none' }]}>
        {isLoading && (
          <Image
            source={require("../../assets/loading.gif")}
            style={{ width: 300, height: 300 }}
          />
        )}
        {
          detailsModalVisible && (
            <DetailsModal
              detailsModalVisible={detailsModalVisible}
              setDetailsModalVisible={setDetailsContainerVisible}
              detail={detail}
              callReceived={callReceived}
              key={1}
            ></DetailsModal>
          )

          // <Grid listData={detail} callReceived={callReceived} detailsModalVisible={detailsModalVisible}/>
        }
      </View>
      </>
    );
  return (
    <View style={styles.top}>
      {!scanned && (
        <View   style={{
          ...styles.barCodeBox,
          width:  "90%",
          height:  "70%",
        }}>
        <BarCodeScanner
         
          onBarCodeScanned={(type,data)=>{scanNow ?  handleBarCodeScanned(type,data):undefined}}
          style={{ marginLeft: 0, paddingLeft: 0  }}       
          BarCodeBounds="square"
           width={ isTyping ? "40%" : "99%"}
          height={ isTyping ? "40%" : "90%"}
          
        />
                   <TouchableOpacity
                   disabled={scanNow}
                  //  style={{width:200,height:40}}
            color={!scanNow? Colors.accentColor: Colors.primary}
            onPress={() => {
              setScanNow(true);
              
            }}
            //style={[styles.submit, styles.againStyle]}
          >
            <View style={{ width:260, height: 30 ,backgroundColor:Colors.accentColor,alignContent:"center",alignItems:'center',marginTop:5,paddingTop:5,borderRadius:10,elevation:5}}>
              <Text>Scan it</Text>
            </View>
          </TouchableOpacity>
      </View>
      )}
      <View style={styles.scanContainer}>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              width: 270,
              marginLeft: 70,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter manually"
              keyboardType="default"
              onBlur={()=>setIsTyping(false)}
              onFocus={()=>setIsTyping(true)}
              onChangeText={setText}
              onEndEditing={() => {
                setIsTyping(false);
                getDetailsApi();
                setScanned(true);
              }}
              value={text}
            />
          </View>
          <View style={{ justifyContent: "flex-start", width: "25%" }}>
            <TouchableOpacity
              color={Colors.accentColor}
              onPress={() => {
                setScanned(false);
                setScanNow(false);
                setText(null);
                setDetails([]);
                setDetailsContainerVisible(false);
              }}
              style={[styles.submit, styles.againStyle]}
            >
              <View style={{ width: 30, height: 40 }}>
                <MaterialCommunityIcons
                  name="refresh-circle"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
          
          </View>
          
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 5,
            marginBottom: -20,
            flexDirection: "row",
          }}
        >
          {/* <Text>User:</Text> */}
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={Colors.accentColor}
          />
          <Text style={{  }}>
            {" "}
            {company} - {user}
          </Text>
        </View>
      </View>
            <View style={[  styles.detailContainer,  { display: detail !== null && detail.length > 0 ? 'flex' : 'none' }]}>
        {isLoading && (
          <Image
            source={require("../../assets/loading.gif")}
            style={{ width: 300, height: 300 }}
          />
        )}
        {
          detailsModalVisible && (
            <DetailsModal
              detailsModalVisible={detailsModalVisible}
              setDetailsModalVisible={setDetailsContainerVisible}
              detail={detail}
              callReceived={callReceived}
              key={1}
            ></DetailsModal>
          )

          // <Grid listData={detail} callReceived={callReceived} detailsModalVisible={detailsModalVisible}/>
        }
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {scanned && (
          <View
            style={{
              flex: 1,

              flexDirection: "row",
              justifyContent: "space-around",
              height: "100%",
              // marginRight: 40,
              alignItems: "flex-end",
              backgroundColor: "#e9e9e9",
              borderRadius: 5,
              paddingBottom: 20,
            }}
          ></View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    backgroundColor: Colors.primary,
  },
  againStyle: {
    height: 20,
    marginTop: 20,
    marginEnd: -20,
    marginStart: 20,
    width: 20,
    marginStart: 20,
    width: 20,
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius:10,
    width:270,
    backgroundColor: "#fff",
    borderRadius:10,
    width:270,
    

  },
  scanContainer: {
    flexDirection: "column",
    height: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    width: "99%",
    width: "99%",
    backgroundColor: "#e9e9e9",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginTop: 5,
  },
  detailContainer: {
    flexDirection: "column",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    width: "97%",
    backgroundColor: "#red",
    borderRadius:30
    // borderBottomColor: "black",
    // borderBottomWidth: 2,
    // marginTop: 5,
  },
  top: {
    flex: 1,
    margin: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: Colors.primary,
    backgroundColor: "#e9e9e9",

    borderWidth: 1,
    borderRadius:10
  },
  barcode: { height: "100%", width: 80 },
  barCodeBox: {
    paddingLeft: 5,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "flex-start",


    overflow: "hidden",
    borderRadius: 30,
    // backgroundColor: Colors.accentColor,
  },
  mainText: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 10,
  },
});

export default Scanning;
