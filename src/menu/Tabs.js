<Text>Olá Mundo</Text>
import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';


export default function Tabs (){

    const [activeUteis, setActiveUteis] = useState(true);
    const [activeSab, setActiveSab] = useState(false);
    const [activeDom, setActiveDom] = useState(true);
    
    const Tabs = ({children}) => (
        <View style={{
            height:50, 
            borderBottomColor: "#ccc",
            borderBottomWidth:1,
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
            height:50,
            justifyContent: "center",
            alignItems: "center",
            },
            active ? {
                borderBottomWidth: 2,
                borderBottomColor:"#000",
            }
            : 
            {},
            ]}>
            <Text onPress={()=>setDias({title})} >{title}</Text>
        </View>
    );


    const setDias = (title) =>{
        
        setActiveUteis(false);
        setActiveSab(false);
        setActiveDom(false);

        switch (title.title) {
            case "UTEIS":
                setActiveUteis(true);
                break;
            
            case "SÁBADOS":
                setActiveSab(true);
                break;
        
            case "DOMINGOS/FERIADOS":
                setActiveDom(true);
                break;    
           
                default:
                break;
        }

       
    }

    return (
        <Tabs>
            <Tab title="UTEIS" active={activeUteis} />
            <Tab title="SÁBADOS" active={activeSab}/>
            <Tab title="DOMINGOS/FERIADOS" active={activeDom}/> 
        </Tabs>
    );
}