import React, { useState } from 'react';
import { SafeAreaView, Button, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default LoginScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);


    const onLogin = () => {
        Alert.alert(
            "Login",
            "Name: " + username + "\n" +
            "Password" + password,

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

    const accountScreen = () => navigation.navigate("Signup");


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTitle}>Login</Text>
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder={'email'}
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
                    title={'Login'}
                    style={styles.input}
                    onPress={() => onLogin()}
                />



                <Text
                    style={styles.textAccountCreate}
                    onPress={() => accountScreen()}
                >
                    criar conta
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