import API_BASE_URL from './api';

export const login = async (credenciais: { email: string; senha: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: credenciais.email,
                senha: credenciais.senha,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Falha ao realizar o login. Verifique suas credenciais.');
        }

        return data;

    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw error;
    }
};

export const register = async (usuario: {
    nome: string;
    nomeUsuario: string;
    email: string;
    telefone: string | null;
    senha: string;
    imagemUrl: string | null;
}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Usuarios/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Não foi possível realizar o cadastro.');
        }

        return data;

    } catch (error) {
        console.error('Erro na requisição de cadastro:', error);
        throw error;
    }
};
