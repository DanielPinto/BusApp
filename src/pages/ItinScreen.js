import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet,SafeAreaView, TouchableOpacity, TouchableHighlight,Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AdMob from '../components/AdMob.js';

Icon.loadFont();

export default function ItinScreen (){
    
    const route = useRoute();

    const route_itin = route.params.itins_completo;

    const [itins, setItinCompleta] = useState(route_itin);
    const [itin_BC, setItinBC] = useState(itins.ITIN_BC);
    const [itin_CB, setItinCB] = useState(itins.ITIN_CB);
    
    
    useEffect(()=>{
        setItinCompleta(route_itin);
        setItinBC(itins.ITIN_BC);
        setItinCB(itins.ITIN_CB);
        console.log(itin_BC);
    },[]);

   

   const getLinhas = (ordem)=>{
        
       const it = itinerarios.find(item => item.ORDEM == ordem);
        return it.NOME_RUA;
    }
    
  
   

    
    return (
        <SafeAreaView style={styles.container}>

           
            <ScrollView vertical>
                <View style={{flexDirection:"row"}}>
                    <FlatList
                        style={{flex:1,borderRightWidth:1}}
                        data={itin_BC} 
                        keyExtractor={item => item.ENDERECO}
                        renderItem={({item})=>(
                        <Text style={{fontSize:10, margin: 5, }}>{item.ENDERECO}</Text>
                        
                        )}  />

                    <FlatList
                        style={{flex:1}}
                        data={itin_CB} 
                        keyExtractor={item => item.ENDERECO}
                        renderItem={({item})=>(
                        <Text style={{fontSize:10, margin: 5, }}>{item.ENDERECO}</Text>
                        
                        )}  />
                </View>
            </ScrollView>

            <AdMob/>

            
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
       flex:1,
        backgroundColor: '#fff',
       
    },
    botton_sw: {
        height: '10%',
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        flexDirection:"row",

    },
    botton_sw_item: {
        width: '33.33%',
        justifyContent: "center",
        alignItems: "center",
        
    },

    botton_sw_item_selected: {
        borderTopWidth: 2,
        borderTopColor: "#666"
    },

    top_sw: {
        height: '10%',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        flexDirection:"row",

    },
    top_sw_item: {
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        
    },

    top_sw_item_selected: {
        borderBottomWidth: 2,
        borderBottomColor: "#666"
    },


    linhas_item: {
        backgroundColor: "#fff",
        marginBottom: 3,
        marginTop: 3,
        marginLeft: 3,
        marginRight: 10,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        shadowColor: "#ccc",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 1.00,

                    elevation: 10,
    
      },
      linhas_item_etinerario: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
      },
      linhas_item_hora: {
        width: "20%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#ccc"


      },
      linha_text: {
        fontSize: 12,
        marginLeft: 15,
        color: "#48466d",
        paddingTop: 20,
        paddingBottom: 20,
      },
      hora_text: {
        fontSize: 16,
        fontFamily: "Roboto",
        marginLeft: 15,
        color: "#0000ff",
        paddingTop: 20,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },

});

