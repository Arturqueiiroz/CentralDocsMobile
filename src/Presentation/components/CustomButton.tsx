import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
    title: string;
    onPress: () => void;
}

export const CustomButton = ({ title, onPress }: Props) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.accentColor }]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});