import React, { useState } from 'react';
import { SafeAreaView, Button, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


export default SignupScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const createAccount = () => {
        Alert.alert(
            "Sign Up",
            "Foi enviado um email de Verificação para: \n\n" +
            email + "\n\n" +
            "Valide seu Email para Logar",

            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )

    };

    const getLoginScreen = () =>  navigation.navigate("Login");;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTitle}>Sign Up</Text>
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder={'E-mail'}
                    style={styles.input}
                />

                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />



                <Button
                    title={'Enviar'}
                    style={styles.input}
                    onPress={() => createAccount()}
                />



                <Text
                    style={styles.textAccountCreate}
                    onPress={() => getLoginScreen()}
                >
                    Login
                    </Text>
            </View>

        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    wrip: {
        backgroundColor: "#eee",

        flex: 1,
        marginTop: 100,
        margin: 50,
        borderRadius: 10,
        padding: 10
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#b9b9b9',
        marginBottom: 10,
    },
    textAccountCreate: {
        color: "blue",
        fontSize: 18,
        marginTop: 7
    },


});