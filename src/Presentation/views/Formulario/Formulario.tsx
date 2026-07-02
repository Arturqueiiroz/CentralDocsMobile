import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomInput } from "../../components/CustomTextInput";
import { CustomButton } from "../../components/CustomButton";

export default function FormularioScreen() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    // Estados do Gênero
    const [genero, setGenero] = useState("Masculino");
    const [dropdownAberto, setDropdownAberto] = useState(false);

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const opcoesGenero = ["Masculino", "Feminino", "Outros"];

    const handleBuscarCep = async (cepParaBuscar) => {
        const cepTermo = cepParaBuscar || cep;
        const cepLimpo = cepTermo.replace(/\D/g, "");

        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setLogradouro(data.logradouro || "");
                setBairro(data.bairro || "");
                setCidade(data.localidade || "");
                setEstado(data.uf || "");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const handleSalvar = () => {
        console.log("Salvando dados...", {
            nome, cpf, dataNascimento, genero,
            cep, logradouro, numero, complemento, bairro, cidade, estado,
            telefone, email
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerSimulado}>
                <Text style={styles.headerTitle}>Perfil</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Dados Pessoais</Text>
                <Text style={styles.subtitle}>Mantenha suas informações atualizadas para uma melhor experiência.</Text>

                {/* ==========================
                    INFORMAÇÕES BÁSICAS
                ========================== */}
                {/* ADICIONADO: zIndex dinâmico aqui no card para sobrepor o conteúdo de baixo */}
                <View style={[styles.card, dropdownAberto && styles.cardComDropdown]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="person-outline" size={18} color="#0A5BC4" />
                        <Text style={styles.cardTitle}>INFORMAÇÕES BÁSICAS</Text>
                    </View>

                    <CustomInput
                        label="Nome Completo"
                        placeholder="Ex: Mini Nick"
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

                    <CustomInput
                        label="Data de Nascimento"
                        placeholder="mm/dd/yyyy"
                        value={dataNascimento}
                        property="data"
                        onChangeText={(p, v) => setDataNascimento(v)}
                    />

                    <Text style={styles.label}>Gênero</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                dropdownAberto && styles.genderButtonAberto
                            ]}
                            onPress={() => setDropdownAberto(!dropdownAberto)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.genderText}>{genero}</Text>
                            <Ionicons
                                name={dropdownAberto ? "chevron-up" : "chevron-down"}
                                size={18}
                                color="#666"
                            />
                        </TouchableOpacity>

                        {dropdownAberto && (
                            <View style={styles.dropdownLista}>
                                {opcoesGenero.map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setGenero(opcao);
                                            setDropdownAberto(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.dropdownItemText,
                                            genero === opcao && styles.dropdownItemAtivoText
                                        ]}>
                                            {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {/* ==========================
                    ENDEREÇO RESIDENCIAL
                ========================== */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location-outline" size={18} color="#0A5BC4" />
                        <Text style={styles.cardTitle}>ENDEREÇO RESIDENCIAL</Text>
                    </View>

                    <Text style={styles.label}>CEP</Text>
                    <View style={styles.cepContainer}>
                        <View style={styles.cepInputWrapper}>
                            <CustomInput
                                placeholder="00000-000"
                                value={cep}
                                property="cep"
                                keyboardType="numeric"
                                maxLength={9}
                                onChangeText={(p, v) => {
                                    setCep(v);
                                    const apenasNumeros = v.replace(/\D/g, "");
                                    if (apenasNumeros.length === 8) {
                                        handleBuscarCep(apenasNumeros);
                                    }
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.buscarButton} onPress={() => handleBuscarCep()}>
                            <Text style={styles.buscarButtonText}>BUSCAR</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomInput
                        label="Logradouro"
                        placeholder="Rua, Avenida, etc"
                        value={logradouro}
                        property="logradouro"
                        onChangeText={(p, v) => setLogradouro(v)}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <CustomInput
                                label="Número"
                                placeholder="123"
                                value={numero}
                                property="numero"
                                onChangeText={(p, v) => setNumero(v)}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <CustomInput
                                label="Complemento"
                                placeholder="Apto, Bloco..."
                                value={complemento}
                                property="complemento"
                                onChangeText={(p, v) => setComplemento(v)}
                            />
                        </View>
                    </View>

                    <CustomInput
                        label="Bairro"
                        placeholder="Seu bairro"
                        value={bairro}
                        property="bairro"
                        onChangeText={(p, v) => setBairro(v)}
                    />

                    <View style={styles.row}>
                        <View style={{ width: "68%" }}>
                            <CustomInput
                                label="Cidade"
                                placeholder="Sua cidade"
                                value={cidade}
                                property="cidade"
                                onChangeText={(p, v) => setCidade(v)}
                            />
                        </View>
                        <View style={{ width: "28%" }}>
                            <CustomInput
                                label="Estado"
                                placeholder="UF"
                                value={estado}
                                property="estado"
                                onChangeText={(p, v) => setEstado(v)}
                            />
                        </View>
                    </View>
                </View>

                {/* ==========================
                    CONTATO
                ========================== */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="mail-outline" size={18} color="#0A5BC4" />
                        <Text style={styles.cardTitle}>CONTATO</Text>
                    </View>

                    <CustomInput
                        label="Telefone Celular"
                        placeholder="(00) 00000-0000"
                        value={telefone}
                        property="telefone"
                        onChangeText={(p, v) => setTelefone(v)}
                    />

                    <CustomInput
                        label="E-mail Alternativo"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        property="email"
                        onChangeText={(p, v) => setEmail(v)}
                    />
                </View>

                <CustomButton
                    title="Salvar Informações"
                    onPress={handleSalvar}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    headerSimulado: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#FFF",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#0A5BC4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardComDropdown: {
        zIndex: 10,
        overflow: "visible",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0A5BC4",
        marginLeft: 8,
        textTransform: "uppercase",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    halfInput: {
        width: "48%",
    },
    // CORRIGIDO: Aumentado para corresponder ao tamanho padrão das labels do seu CustomInput
    label: {
        fontSize: 16,
        color: "#1E293B",
        marginBottom: 8,
        fontWeight: "500",
    },
    dropdownContainer: {
        position: "relative",
        width: "100%",
        marginBottom: 12,
    },
    // CORRIGIDO: Padding e ajustes para mimetizar perfeitamente a altura e robustez do CustomInput
    genderButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 8,
        paddingHorizontal: 16, // Aumentado o recuo interno lateral
        backgroundColor: "#FFF",
        height: 54, // Aumentado levemente para casar com a altura padrão de inputs modernos
    },
    genderButtonAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0,
    },
    // CORRIGIDO: Tamanho de fonte aumentado de 15 para 16 para ficar igual ao "Ex: Mini Nick"
    genderText: {
        fontSize: 16,
        color: "#1E293B",
    },
    dropdownLista: {
        position: "absolute",
        top: 54, // Ajustado para a nova altura do botão
        left: 0,
        right: 0,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 5000,
        elevation: 5,
    },
    dropdownItem: {
        padding: 14, // Mais área de toque para o usuário clicar
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    dropdownItemText: {
        fontSize: 16, // Itens da lista também acompanham o tamanho correto agora
        color: "#475569",
    },
    dropdownItemAtivoText: {
        color: "#0A5BC4",
        fontWeight: "600",
    },
    cepContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 15,
        width: "100%",
    },
    cepInputWrapper: {
        flex: 1,
        marginRight: 12,
    },
    buscarButton: {
        backgroundColor: "#D0E1FD",
        paddingHorizontal: 20,
        height: 54, // Ajustado para alinhar perfeitamente com a nova altura padrão
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buscarButtonText: {
        color: "#0A5BC4",
        fontSize: 12,
        fontWeight: "700",
    },
});