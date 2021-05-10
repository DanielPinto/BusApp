import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { set, ceil } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

//import Tab from '../menu/Tabs';



export default function HorasScreen (){
    
    const route = useRoute();

    const route_linha = route.params.linhas_completa;


    //const [linha, setLinha] = useState('');
    const [linhas_completa, setLinhaCompleta] = useState([]);
    const [horas_BC, setHorasBC] = useState([]);
    const [horas_CB, setHorasCB] = useState([]);
    //const [dias, setDias] = useState('uteis');

    
    
    useEffect(()=>{
        setLinhaCompleta(route_linha);
        setHorasBC(linhas_completa.UTEIS_BC);
        setHorasCB(linhas_completa.UTEIS_CB);
    },[]);

    function setLista(key){
        switch (key) {
            case "UTEIS":
                setHorasBC(linhas_completa.UTEIS_BC);
                setHorasCB(linhas_completa.UTEIS_CB);
                break;
            
            case "SAB":
                setHorasBC(linhas_completa.SAB_BC);
                setHorasCB(linhas_completa.SAB_CB);
                break;
                    
            case "DOM":
                setHorasBC(linhas_completa.DOM_BC);
                setHorasCB(linhas_completa.DOM_CB);
                break;
        }
        
    }




    const [activeUteis, setActiveUteis] = useState(true);
    const [activeSab, setActiveSab] = useState(false);
    const [activeDom, setActiveDom] = useState(false);
    
    const Tabs = ({children}) => (
        <View style={{
            height:60, 
            marginTop: 2,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            }}>
            {children}
        </View>
    );

    const Tab = ({title, active=false}) => (
        

        
        <View style={[{
            flex: 1,
            height:60,
            justifyContent: "center",
            alignItems: "center",
            },
            active ? {
                borderTopWidth: 2,
                borderTopColor:"#000"
            }
            : 
            {
                borderTopColor: "#ccc",
                borderTopWidth:1,},
            ]}>
            <Text
                style={ active ? {color:"#000"}: {color:"#888"} }
                onPress={()=>setDias({title})} >{title}</Text>
        </View>
    );


    const setDias = (title) =>{
        
        setActiveUteis(false);
        setActiveSab(false);
        setActiveDom(false);

        switch (title.title) {
            case "UTEIS":
                setActiveUteis(true);
                setLista("UTEIS");
                break;
            
            case "SÁBADOS":
                setActiveSab(true);
                setLista("SAB")
                break;
        
            case "DOMINGOS/FERIADOS":
                setActiveDom(true);
                setLista("DOM")
                break;    
           
                default:
                break;
        }

       
    }
    
    return (
        <View style={styles.container}>

           

                <ScrollView>
                    <View>
                    <FlatList
                        data={horas_BC} 
                        keyExtractor={item => item.HR_IV}
                        renderItem={({item})=>(
                        <View style={styles.linhas_item}>
                            <Text style={styles.linha_text}>{item.HR_IV}</Text>
                        </View>
                        )}  />

                    </View>
                </ScrollView>

                <Tabs>
                <Tab title="UTEIS" active={activeUteis} />
                <Tab title="SÁBADOS" active={activeSab}/>
                <Tab title="DOMINGOS/FERIADOS" active={activeDom}/> 
            </Tabs>    
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: '#eee',
      height: "100%",
      width: "100%"
    },
    button_mar: {
        margin: 5,
        flexDirection: 'row'
    },
    red: {
      color: 'red',
    },
    linhas_item: {
        backgroundColor: "#fff",
        marginBottom: 1,
        marginLeft: 3,
        marginRight: 10,
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: "flex-start"
    
      },
      linha_text: {
        marginLeft: 15,
      }
});

