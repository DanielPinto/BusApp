import React, {useState, useEffect} from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Text , FlatList, Button, Image, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';



export default function HomeScreen (){

  const [servicos, setServicos] = useState([]);
  const [linhas, setLinhas] = useState([]);
  const [servico_selected, setSelectedServico] = useState('');
  const [linha_selected, setSelectedLinha] = useState('');

  const navigation = useNavigation();



  useEffect(()=>{

    async function fatchData(){
        const response = await fetch('https://ngs.inf.br/viamao/horarios/getServico.php');
        const textData = await response.text();
        const jsonData = await JSON.parse(textData.trim());

        setServicos(jsonData);
    }

    fatchData();

  },[]);


  useEffect(()=>{

    async function fatchData(){

      const response = await fetch(`https://ngs.inf.br/viamao/horarios/getLinhasSrv.php?SERVICO=${servico_selected}`);
      const textData = await response.text();
        const jsonData = await JSON.parse(textData.trim());

      setLinhas(jsonData);
    }

    if(servico_selected !== '')
      fatchData();
   

  },[servico_selected]);


  useEffect(()=>{

    //
      //

      async function fatchData(){
        const response = await fetch(`https://ngs.inf.br/viamao/horarios/getLinhasCompletas.php?NOME=${linha_selected}`);
        const textData = await response.text();
        const jsonData = await JSON.parse(textData.trim());
        //console.log(jsonData);
        //console.log("impressão final");
        navigation.navigate("horas", 
          {linhas_completa:jsonData[0],
           name:jsonData[0].NOME_GRUPO});
        
    }
    if(linha_selected !== '')
      fatchData()
    
  },[linha_selected]);


  
    console.log("final");
  
    
    
    function teste(){
        navigation.navigate("teste");
    }

    
    return (
          <View style={styles.container}>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10 }}
              >
              
                <View style={{alignItems: "center"}}>
                  <TouchableOpacity
                    onPress={()=>setSelectedServico("Executivo")}
                    style={styles.item}
                  >
                    <Icon name="bus" color="red" size={32} />
                  
                  </TouchableOpacity>
              
                  <Text>Executivo</Text>
              
                </View>


                <View style={{marginHorizontal:22,alignItems: "center"}}> 
                  
                  <TouchableOpacity
                    onPress={()=>setSelectedServico("Metropolitano")}
                    style={styles.item}
                  >
                  
                    <Icon name="bus" color="blue" size={32} />
                  </TouchableOpacity>
              
                  <Text>Metropolitano</Text>
                </View>


                <View style={{alignItems: "center"}}>
                  <TouchableOpacity
                    onPress={()=>setSelectedServico("Municipal")}
                    style={styles.item}
                  >    
                    <Icon name="bus" color="orange" size={32} />
                  
                  </TouchableOpacity>
                  
                  <Text>Municipal</Text>
                
                </View>



                <View style={{marginHorizontal:22,alignItems: "center" }}>
                  
                  <TouchableOpacity
                    onPress={()=>setSelectedServico("Seletivo")}
                    style={styles.item}
                  >
                    <Icon name="bus" color="gray" size={32} />
                  </TouchableOpacity>
              
                  <Text>Seletivo</Text>
                
                </View>
            
              </ScrollView>
          
            </View>

            <ScrollView>
              <FlatList
                data={linhas} 
                renderItem={({item})=>(
                  <View style={styles.linhas_item}>
                    <Text style={styles.linha_text} onPress={()=>setSelectedLinha(item.NOME_GRUPO)} >{item.NOME_GRUPO}</Text>
                  </View> 
                )}  />
          
            </ScrollView>
          </View> 
    );

}



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#eee',
      height: "100%",
      width: "100%"
    },
    item: {
      alignItems: "center",
      justifyContent: "center",
      height: 66,
      width: 66,
      borderRadius: 50,
      backgroundColor: "#dfdfdf",
      borderColor: "#555555"
    },
    linhas_item: {
      backgroundColor: "#fff",
      marginBottom: 3,
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