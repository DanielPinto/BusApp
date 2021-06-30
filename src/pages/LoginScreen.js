import React, { useState } from 'react';
import { SafeAreaView, Button, Text, StyleSheet, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '../methods/firebaseMethods';


export default LoginScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false);

   

    const handlePress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        }

        if (!password) {
            Alert.alert('Password field is required.');
        }

        setLoad(true);

        signIn(email, password).then((value) => {
            setLoad(false);
        })
        setEmail('');
        setPassword('');
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                load
                    ?
                    <ActivityIndicator size='large' color="blue" />
                    :
                    <View>
                        <Text style={styles.textTitle}>Login</Text>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
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
                            onPress={handlePress}
                        />


                        <Text
                            style={styles.textAccountCreate}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            criar conta
                        </Text>

                    </View>
            }


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