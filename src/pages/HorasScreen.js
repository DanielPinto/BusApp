import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet,SafeAreaView, TouchableOpacity, TouchableHighlight,Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default function HorasScreen (){
    
    const route = useRoute();
    const navigation = useNavigation();

    const route_linha = route.params.linhas_completa;

    const [linhas_completa, setLinhaCompleta] = useState([]);
    const [horas_BC, setHorasBC] = useState(linhas_completa.UTEIS_BC);
    const [horas_CB, setHorasCB] = useState(linhas_completa.UTEIS_CB);
    
    const [itinerarios, setItinerarios] = useState(linhas_completa.ITIN);
    const [linha, setLinha] = useState('');
    
    const [itin_completo, setItinCompleto] = useState([]);

    const [activeSentido, setActiveSentido] = useState(null);
    const [activeDias, setActiveDias] = useState(null);




    
    useEffect(()=>{
        setLinhaCompleta(route_linha);
        setHorasBC(linhas_completa.UTEIS_BC);
        setHorasCB(linhas_completa.UTEIS_CB);
        setItinerarios(linhas_completa.ITIN);
        setActiveSentido(1);
        setActiveDias(1);

    },[]);

    useEffect(()=>{

        setItinerarios(linhas_completa.ITIN);

        if(activeDias===1) {
            setHorasBC(linhas_completa.UTEIS_BC);
            setHorasCB(linhas_completa.UTEIS_CB);
        }else if(activeDias===2){
            setHorasBC(linhas_completa.SAB_BC);
            setHorasCB(linhas_completa.SAB_CB);
        }else{
            setHorasBC(linhas_completa.DOM_BC);
            setHorasCB(linhas_completa.DOM_CB);
        }       

    },[activeDias]);

    const getLinhas = (ordem)=>{
        const it = itinerarios.find(item => item.ORDEM == ordem);
        return it.NOME_RUA;
    }
    
    useEffect(()=>{

        async function fatchData(){
            //setStatusLoadLinhas(true);
            const response = await fetch(`https://ngs.inf.br/viamao/horarios/getItinerarios.php?LINHA=${linha}`);
            const textData = await response.text();
            const jsonData = await JSON.parse(textData.trim());
         
            //setStatusLoadLinhas(false); 
  
            //setItinCompleto(jsonData);

            return jsonData;
        }
      
        if (linha!==''){
            fatchData().then((data)=>{
                setItinCompleto(data);
            }); 
        }

    },[linha]);

    useEffect(()=>{

        if (linha!==''){
            console.log(itin_completo[0]);
            navigation.navigate("itins", {
                itins_completo:itin_completo[0],
                name:"ITINERARIO COMPLETO"
            });
                
            setLinha(''); 
        }
        
    },[itin_completo])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top_sw}>
                
                <TouchableOpacity style={[styles.top_sw_item, activeSentido === 1 ? styles.top_sw_item_selected : {}]}  onPress={()=>setActiveSentido(1)}>                
                    <Text style={{textAlign:"center"}, activeSentido === 1 ? {color:"#000"} : {color:"#999"}}>IDA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.top_sw_item, activeSentido === 2 ? styles.top_sw_item_selected : {}]} onPress={()=>setActiveSentido(2)}>
                    <Text style={{textAlign:"center"}, activeSentido === 2 ? {color:"#000"} : {color:"#999"}}>VOLTA</Text>    
                </TouchableOpacity>
                
            </View>

            <ScrollView vertical>
                <View>
                    <FlatList
                        data={activeSentido === 1 ?  horas_BC : horas_CB} 
                        keyExtractor={item => item.HR_IV}
                        renderItem={({item})=>(
                            
                             item.HR_IV != "" ?
                                <TouchableOpacity style={styles.linhas_item} onPress={()=>setLinha(item.LINHA)}>
                                    <View style={styles.linhas_item_hora}>

                                        <Text style={styles.hora_text}>{item.HR_IV}</Text>
                                
                                        {
                                            item.APDVGM == "SIM" ?
                                                <Icon name="accessible" size={25} color="#ea5455"  />
                                            : null
                                        }
                                
                                    </View>
                                
                            
                                    <View style={styles.linhas_item_etinerario}>
                                
                                        <Text style={styles.linha_text}>{getLinhas(item.ORDEM)}</Text>
                                
                                    </View>
                                
                                </TouchableOpacity>
                        
                            :null
                            
                        )}  
                    />
                </View>
            </ScrollView>

            <View style={styles.botton_sw}>
                <TouchableOpacity style={[styles.botton_sw_item, activeDias === 1 ? styles.botton_sw_item_selected : {}]}  onPress={()=>setActiveDias(1)}>
                
                    <Text style={{textAlign:"center"}, activeDias === 1 ? {color:"#000"} : {color:"#999"}}>Segunda a Sexta</Text>
                
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botton_sw_item, activeDias === 2 ? styles.botton_sw_item_selected : {}]} onPress={()=>setActiveDias(2)}>
                
                    <Text style={{textAlign:"center"}, activeDias === 2 ? {color:"#000"} : {color:"#999"}}>Sábados</Text>
                
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botton_sw_item, activeDias === 3 ? styles.botton_sw_item_selected : {}]} onPress={()=>setActiveDias(3)}>
                
                    <Text style={{textAlign:"center"}, activeDias === 3 ? {color:"#000"} : {color:"#999"}}>Domingos e Feriados</Text>
                
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
}

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