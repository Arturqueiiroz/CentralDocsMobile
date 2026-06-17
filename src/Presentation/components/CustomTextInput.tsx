import { Text, TextInput, View, StyleSheet } from 'react-native';

interface Props {
    label: string;
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
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={(text) => onChangeText(property, text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },
});