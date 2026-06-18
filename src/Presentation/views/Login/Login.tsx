import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';

export const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/img/LogoCentralDocsNova.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.subtitle}>
                        Gerenciamento de documentos
                    </Text>
                </View>

            <CustomInput
                label="Email"
                placeholder="Digite seu email"
                value={email}
                property="email"
                onChangeText={(property, value) => setEmail(value)}
            />

            <View style={styles.passwordHeader}>
                <Text style={styles.label}>Senha</Text>


            </View>

            <CustomInput
                placeholder="Digite sua senha"
                value={password}
                property="password"
                secureTextEntry
                onChangeText={(property, value) => setPassword(value)}

                
            />
            
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>
                <CustomButton
                    title="Entrar"
                    onPress={() => {}}
                />

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Não tem conta?
                    </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.registerLink}>
                        Criar conta
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.google}>
                   <Text>Ou entre com</Text> 
                </View>
                <TouchableOpacity style={styles.googleButton}>
                    <Image
                        source={require('../../../../assets/img/google-icon-1.png')}
                        style={styles.googleIcon}
                    />
                </TouchableOpacity>                  
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    logo: {
        width: 300,
        height: 80,
        resizeMode: 'contain',
    },

    subtitle: {
        marginTop: 10,
        color: '#1f1f1fff',
        fontSize: 17,
        fontWeight: 600
    },

    label: {
        fontSize: 18,
        color: '#333',
    },

    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 15,
    },
    forgotPassword: {
        color: '#0A5BC4',
        fontSize: 15,
        fontWeight: '500',
    },

    loginButton: {
        backgroundColor: '#0A5BC4',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    loginButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },

    registerText: {
        color: '#666',
        fontSize: 17
    },

    registerLink: {
        color: '#0A5BC4',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 17
    },
    google: {
        alignItems: 'center',
        marginTop: 20,
    },

    googleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },

    googleIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});