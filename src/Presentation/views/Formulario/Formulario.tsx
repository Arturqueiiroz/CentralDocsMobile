import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Removido o import do Header do navigation se não for usar diretamente como componente
import { CustomInput } from "../../components/CustomTextInput";
import { CustomButton } from "../../components/CustomButton";

export default function FormularioScreen() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [genero, setGenero] = useState("Masculino");

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const handleSalvar = () => {
        // Lógica para salvar os dados
        console.log("Salvando dados...", { nome, cpf, dataNascimento });
    };

    return (
        <View style={styles.container}>
            {/* Header Simples (Substitua pelo seu se necessário) */}
            <View style={styles.headerSimulado}>
                <Text style={styles.headerTitle}>Perfil</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.title}>Dados Pessoais</Text>
                <Text style={styles.subtitle}>Mantenha suas informações atualizadas.</Text>

                {/* ==========================
            INFORMAÇÕES BÁSICAS
        ========================== */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="information-circle-outline"
                            size={18}
                            color="#0A5BC4"
                        />
                        <Text style={styles.cardTitle}>Informações Básicas</Text>
                    </View>

                    <CustomInput
                        label="Nome Completo"
                        placeholder="Ex.: Mini Nick"
                        value={nome}
                        property="nome"
                        onChangeText={(p, v) => setNome(v)}
                    />

                    <CustomInput
                        label="CPF"
                        placeholder="000.000.000-00"
                        value={cpf}
                        property="cpf"
                        onChangeText={(p, v) => setCpf(v)}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <CustomInput
                                label="Data de Nascimento"
                                placeholder="dd/mm/aaaa"
                                value={dataNascimento}
                                property="data"
                                onChangeText={(p, v) => setDataNascimento(v)}
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Gênero</Text>
                            <TouchableOpacity style={styles.genderButton}>
                                <Text style={styles.genderText}>{genero}</Text>
                                <Ionicons name="chevron-down" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Botão de Salvar utilizando o componente que você importou */}
                <CustomButton
                    title="Salvar Alterações"
                    onPress={handleSalvar}
                />
            </ScrollView>
        </View>
    );
}

// Estilos básicos para o código não quebrar
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    headerSimulado: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#FFF",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0A5BC4",
        marginLeft: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInput: {
        width: "48%",
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
        fontWeight: "500",
    },
    genderButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#FFF",
        height: 50, // Ajuste para alinhar com a altura do CustomInput se necessário
    },
    genderText: {
        fontSize: 16,
        color: "#333",
    },
});