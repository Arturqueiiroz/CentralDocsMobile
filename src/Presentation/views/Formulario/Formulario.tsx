import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// 1. Importando o hook de navegação
import { useNavigation } from "@react-navigation/native";

import { CustomInput } from "../../components/CustomTextInput";
import { CustomButton } from "../../components/CustomButton";
import { useTheme } from "../../context/ThemeContext";
import { HeaderScreen } from "../../components/Header";
import styles from '../../theme/FormularioCss'

export default function FormularioScreen() {
    // 2. Iniciando a navegação
    const navigation = useNavigation<any>();
    const { theme, isDarkMode } = useTheme();

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

    const handleBuscarCep = async (cepParaBuscar?: string) => {
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>

            <HeaderScreen/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* 3. BOTÃO DE VOLTAR ADICIONADO AQUI */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                </TouchableOpacity>

                <Text style={[styles.title, { color: theme.textPrimary }]}>Dados Pessoais</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Mantenha suas informações atualizadas para uma melhor experiência.</Text>

                {/* ==========================
                    INFORMAÇÕES BÁSICAS
                ========================== */}
                <View style={[styles.card, { backgroundColor: theme.card }, dropdownAberto && styles.cardComDropdown]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="person-outline" size={18} color={theme.accentColor} />
                        <Text style={[styles.cardTitle, { color: theme.accentColor }]}>INFORMAÇÕES BÁSICAS</Text>
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

                    <Text style={[styles.label, { color: theme.textPrimary }]}>Gênero</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                { backgroundColor: theme.card, borderColor: theme.borderColor },
                                dropdownAberto && styles.genderButtonAberto
                            ]}
                            onPress={() => setDropdownAberto(!dropdownAberto)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.genderText, { color: theme.textPrimary }]}>{genero}</Text>
                            <Ionicons
                                name={dropdownAberto ? "chevron-up" : "chevron-down"}
                                size={18}
                                color={theme.textSecondary}
                            />
                        </TouchableOpacity>

                        {dropdownAberto && (
                            <View style={[styles.dropdownLista, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                                {opcoesGenero.map((opcao) => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={[styles.dropdownItem, { borderTopColor: theme.borderColor }]}
                                        onPress={() => {
                                            setGenero(opcao);
                                            setDropdownAberto(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.dropdownItemText,
                                            { color: theme.textSecondary },
                                            genero === opcao && { color: theme.accentColor, fontWeight: "600" }
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
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location-outline" size={18} color={theme.accentColor} />
                        <Text style={[styles.cardTitle, { color: theme.accentColor }]}>ENDEREÇO RESIDENCIAL</Text>
                    </View>

                    <Text style={[styles.label, { color: theme.textPrimary }]}>CEP</Text>
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
                        <TouchableOpacity style={[styles.buscarButton, { backgroundColor: isDarkMode ? theme.borderColor : '#D0E1FD' }]} onPress={() => handleBuscarCep()}>
                            <Text style={[styles.buscarButtonText, { color: theme.accentColor }]}>BUSCAR</Text>
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
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="mail-outline" size={18} color={theme.accentColor} />
                        <Text style={[styles.cardTitle, { color: theme.accentColor }]}>CONTATO</Text>
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
