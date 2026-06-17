import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';

import { CustomInput } from '../../components/CustomTextInput';

export const PersonalDataScreen = () => {
    const [form, setForm] = useState({
        nome: '',
        cpf: '',
        nascimento: '',
        genero: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        email: '',
    });

    const handleChange = (property: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [property]: value,
        }));
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Dados Pessoais</Text>

                <Text style={styles.subtitle}>
                    Mantenha suas informações atualizadas para uma melhor experiência.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    INFORMAÇÕES BÁSICAS
                </Text>

                <CustomInput
                    label="Nome Completo"
                    placeholder="Ex: Mini Nick"
                    value={form.nome}
                    property="nome"
                    onChangeText={handleChange}
                />

                <CustomInput
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    property="cpf"
                    onChangeText={handleChange}
                />

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <CustomInput
                            label="Data de Nascimento"
                            placeholder="dd/mm/aaaa"
                            value={form.nascimento}
                            property="nascimento"
                            onChangeText={handleChange}
                        />
                    </View>

                    <View style={styles.halfInput}>
                        <CustomInput
                            label="Gênero"
                            placeholder="Masculino"
                            value={form.genero}
                            property="genero"
                            onChangeText={handleChange}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    ENDEREÇO RESIDENCIAL
                </Text>

                <CustomInput
                    label="CEP"
                    placeholder="00000-000"
                    value={form.cep}
                    property="cep"
                    onChangeText={handleChange}
                />

                <CustomInput
                    label="Logradouro"
                    placeholder="Rua, Avenida, etc"
                    value={form.logradouro}
                    property="logradouro"
                    onChangeText={handleChange}
                />

                <View style={styles.row}>
                    <View style={styles.smallInput}>
                        <CustomInput
                            label="Número"
                            placeholder="123"
                            value={form.numero}
                            property="numero"
                            onChangeText={handleChange}
                        />
                    </View>

                    <View style={styles.largeInput}>
                        <CustomInput
                            label="Complemento"
                            placeholder="Apto, Bloco..."
                            value={form.complemento}
                            property="complemento"
                            onChangeText={handleChange}
                        />
                    </View>
                </View>

                <CustomInput
                    label="Bairro"
                    placeholder="Seu bairro"
                    value={form.bairro}
                    property="bairro"
                    onChangeText={handleChange}
                />

                <View style={styles.row}>
                    <View style={styles.largeInput}>
                        <CustomInput
                            label="Cidade"
                            placeholder="Sua cidade"
                            value={form.cidade}
                            property="cidade"
                            onChangeText={handleChange}
                        />
                    </View>

                    <View style={styles.smallInput}>
                        <CustomInput
                            label="Estado"
                            placeholder="UF"
                            value={form.estado}
                            property="estado"
                            onChangeText={handleChange}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    CONTATO
                </Text>

                <CustomInput
                    label="Telefone Celular"
                    placeholder="(00) 00000-0000"
                    value={form.telefone}
                    property="telefone"
                    onChangeText={handleChange}
                />

                <CustomInput
                    label="E-mail Alternativo"
                    placeholder="seuemail@exemplo.com"
                    value={form.email}
                    property="email"
                    onChangeText={handleChange}
                />

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>
                        Salvar Informações
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7FC',
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
        marginBottom: 12,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },

    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        marginBottom: 20,
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1565D8',
        marginTop: 8,
        marginBottom: 15,
        textTransform: 'uppercase',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },

    halfInput: {
        flex: 1,
    },

    smallInput: {
        flex: 0.4,
    },

    largeInput: {
        flex: 1,
    },

    label: {
        fontSize: 12,
        color: '#475569',
        marginBottom: 6,
        marginTop: 10,
        fontWeight: '500',
    },

    input: {
        height: 48,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D8DEE8',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#1E293B',
    },

    saveButton: {
        height: 52,
        backgroundColor: '#1565D8',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        elevation: 3,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    cepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },

    cepInput: {
        flex: 1,
    },

    cepButton: {
        backgroundColor: '#DCEAFE',
        paddingHorizontal: 14,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },

    cepButtonText: {
        color: '#1565D8',
        fontSize: 12,
        fontWeight: '700',
    },
});