import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface Props {
    label?: string;
    placeholder: string;
    value: string;
    property: string;
    secureTextEntry?: boolean;
    onChangeText: (property: string, value: string) => void;
}

export const CustomInput = ({
    label,
    placeholder,
    value,
    property,
    secureTextEntry = false,
    onChangeText,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onChangeText={(text) => onChangeText(property, text)}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },

    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },

    input: {
        flex: 1,
        height: 50,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },
});