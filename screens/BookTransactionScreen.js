import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Alert
} from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";


export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }

    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            /*status=="granted" is true when user has granted permission
            status=="granted" is false when used denies permission*/
            hasCameraPermissions: status==="granted",
            buttonState:"clicked",
            scanned:false

        })
    }

    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData:data,
            buttonState:"normal"
        })
    }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState

        if (buttonState=="clicked" && hasCameraPermissions){
            return (
                <BarCodeScanner
                onBarCodeScanned={scanned ? underfined: this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }

        else if (buttonState=="normal"){
            return(
                <View styles={styles.container}>
                    <Text style={styles.displayText}>{hasCameraPermissions==true ? this.state.scannedData:"request camera permissions"}</Text>
                    <TouchableOpacity style={[styles.scanButton,{marginTop:50}]} onPress={this.getCameraPermissions} >
                        <Text style={styles.buttonText}>Scan Qr Code</Text>
                    </TouchableOpacity>
                </View>
            )

            
        }


        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center", 
      alignItems:"center",
      backgroundColor:"#283952"
    },
    displayText: {
       fontSize:15,
       color:"#D59382",
       textDecorationLine:"underline",
  
       marginTop:50,
       marginLeft:10
      

    },
    scanButton: {
      backgroundColor:'#213953',
      padding: 10,

      marginLeft:10,
      width:"40%",
      height:55,
      justifyContent:"center",
      
      backgroundColor:"#589238",
      borderRadius:30
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color:"#092385",
    },
  
    
  });
  
