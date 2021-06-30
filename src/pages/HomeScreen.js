import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, BackHandler, Alert} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loggingOut } from '../methods/firebaseMethods';
import AdMob from '../components/AdMob.js';




export default function HomeScreen() {


  const [linhas, setLinhas] = useState([]);
  const [servico_selected, setSelectedServico] = useState('');
  const [linha_selected, setSelectedLinha] = useState('');
  const [statusLoadLinhas, setStatusLoadLinhas] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    setSelectedServico("Metropolitano");
    const backAction = () => {
      Alert.alert("Você deseja encerrar este aplicativo?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { 
          text: "YES",
          onPress: () => BackHandler.exitApp() 
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  /*
  useEffect(() => {
  
    async function fatchData(){
        const response = await fetch('https://ngs.inf.br/viamao/horarios/getServico.php');
        const textData = await response.text();
        const jsonData = await JSON.parse(textData.trim());
      
        setServicos(jsonData);
    }
 

    setSelectedServico("Metropolitano");

  }, []);
 */

  useEffect(() => {

    async function fatchData() {

      const response = await fetch(`https://ngs.inf.br/viamao/horarios/getLinhasSrv.php?SERVICO=${servico_selected}`);
      const textData = await response.text();
      const jsonData = await JSON.parse(textData.trim());

      setLinhas(jsonData);
    }

    if (servico_selected !== '')
      fatchData();


  }, [servico_selected]);


  useEffect(() => {

    async function fatchData() {
      setStatusLoadLinhas(true);
      const response = await fetch(`https://ngs.inf.br/viamao/horarios/getLinhasCompletas.php?NOME=${linha_selected}`);
      const textData = await response.text();
      const jsonData = await JSON.parse(textData.trim());

      setStatusLoadLinhas(false);

      navigation.navigate("horas",
        {
          linhas_completa: jsonData[0],
          name: jsonData[0].NOME_GRUPO
        });

      setSelectedLinha('');
    }
    if (linha_selected !== '')
      fatchData()

  }, [linha_selected !== '']);


  const handlePress = () => {
    loggingOut();
    navigation.replace('Loading');
  };


  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => handlePress()}>
        <Text> SAIR </Text>
      </TouchableOpacity>

      <View style={styles.menu}>


        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setSelectedServico("Executivo")}
            style={styles.item}
          >
            <MaterialCommunityIcons name="bus" color="#ea5455" size={32} />

          </TouchableOpacity>

          <Text>Executivo</Text>

        </View>

        <View style={{ marginHorizontal: 22, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setSelectedServico("Metropolitano")}
            style={styles.item}
          >
            <MaterialCommunityIcons name="bus" color="#3490de" size={32} />
          </TouchableOpacity>

          <Text> Metropolitano</Text>
        </View>


        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setSelectedServico("Municipal")}
            style={styles.item}
          >
            <MaterialCommunityIcons name="bus" color="#ffc93c" size={32} />

          </TouchableOpacity>

          <Text>Municipal</Text>

        </View>



        <View style={{ marginHorizontal: 22, alignItems: "center" }}>

          <TouchableOpacity
            onPress={() => setSelectedServico("Seletivo")}
            style={styles.item}
          >
            <MaterialCommunityIcons name="bus" color="#8c7676" size={32} />
          </TouchableOpacity>

          <Text>Seletivo</Text>

        </View>


      </View>
      {
        statusLoadLinhas
          ?
          <ActivityIndicator size="large" color="#000" style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }} />
          :

          <ScrollView vertical>
            <FlatList
              data={linhas}
              renderItem={({ item }) => (

                item.NOME_GRUPO != null ?
                  <TouchableOpacity onPress={() => setSelectedLinha(item.NOME_GRUPO)}>
                    <View style={styles.linhas_item}>
                      <Text style={styles.linha_text} >{item.NOME_GRUPO}</Text>
                      <MaterialCommunityIcons style={styles.linha_icon} name="chevron-right" color="#666" size={32} />
                    </View>
                  </TouchableOpacity>

                  : null

              )} />

          </ScrollView>
      }

      <AdMob />

    </SafeAreaView>
  );

}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
    width: "100%"
  },
  menu: {
    padding: 10,
    paddingBottom: 30,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#555555",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 5,
    shadowRadius: 1.00,
    elevation: 5,
  },
  linhas_item: {
    backgroundColor: "#fff",
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linha_text: {
    fontSize: 20,
    marginLeft: 15,
    color: "#48466d",
  },
  linha_icon: {
    marginEnd: 0
  }
});