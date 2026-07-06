import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Props {
    label?: string;
    placeholder: string;
    value: string;
    property: string;
    secureTextEntry?: boolean;
    onChangeText: (property: string, value: string) => void;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}

export const CustomInput = ({
    label,
    placeholder,
    value,
    property,
    secureTextEntry = false,
    onChangeText,
    keyboardType,
    maxLength,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {label && (
                <Text style={[styles.label, { color: theme.textPrimary }]}>
                    {label}
                </Text>
            )}

            <View style={[styles.inputContainer, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                <TextInput
                    style={[styles.input, { color: theme.textPrimary }]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.textSecondary}
                    value={value}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onChangeText={(text) => onChangeText(property, text)}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color={theme.textSecondary}
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
    },

    input: {
        flex: 1,
        height: 50,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
});