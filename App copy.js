import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {

  const [servicos, setServicos] = useState([]);
  const [linhas, setLinhas] = useState([]);
  const [servico_selected, setSelectedServico] = useState('');
  const [linha_selected, setSelectedLinha] = useState('');


  useEffect(()=>{

    async function fatchData(){

      const response = await fetch('https://ngs.inf.br/viamao/horarios/getServico.php');
      const jsonData = await response.json();

      setServicos(jsonData);
    }

    fatchData();

  },[]);


  useEffect(()=>{

    async function fatchData(){

      const response = await fetch(`https://ngs.inf.br/viamao/horarios/getLinhasSrv.php?SERVICO=${servico_selected}`);
      const jsonData = await response.json();

      setLinhas(jsonData);
    }

    fatchData();
    alert(servico_selected);

  },[servico_selected]);


  return (

    <NavigationContainer>
      <View style={styles.container}>
        <FlatList
        data={servicos} 
        renderItem={({item})=>(<Text onPress={()=>setSelectedServico(item.SERVICO)} >{item.SERVICO}</Text>)}  />

        <FlatList
          data={linhas} 
          renderItem={({item})=>(<Text onPress={()=>setSelectedLinha(item.NOME_GRUPO)} >{item.NOME_GRUPO}</Text>)}  />
      </View>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


<View style={styles.container}>

<FlatList
      data={servicos} 
      renderItem={({item})=>(
        <View >
          <Text onPress={()=>setSelectedServico(item.SERVICO)} >{item.SERVICO}</Text>
        </View>
      )}  />

  <FlatList
      data={linhas} 
      renderItem={({item})=>(<Text onPress={()=>setSelectedLinha(item.NOME_GRUPO)} >{item.NOME_GRUPO}</Text>)}  />

</View>