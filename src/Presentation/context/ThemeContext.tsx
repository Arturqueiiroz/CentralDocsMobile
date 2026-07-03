import React, { createContext, useState, useContext } from 'react';

// 1. Aqui mapeamos as cores que o app vai usar nos dois modos.
// Importante: use sempre os mesmos nomes de propriedades nos dois objetos!
export const lightTheme = {
    background: '#F8FAFC',
    card: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    accentColor: '#1D68E4', // Seu azul original do projeto
    borderColor: '#EDF2F7',
};

export const darkTheme = {
    background: '#0F172A',
    card: '#1E293B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    accentColor: '#3B82F6', // Um azul levemente mais claro para destacar no escuro
    borderColor: '#334155',
};

// 2. Definimos para o TypeScript o formato que o nosso "gerenciador de tema" terá
type ThemeContextType = {
    isDarkMode: boolean;        // true se for escuro, false se for claro
    toggleTheme: () => void;    // Função que ativa/desativa o modo escuro
    theme: typeof lightTheme;   // O objeto de cores atualizado
};

// 3. Criamos a caixinha do Contexto (por enquanto vazia)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 4. O Provedor (Provider): É o componente "mãe" que vai vigiar o estado do tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Esse estado guarda se o modo escuro está ligado (true ou false)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Essa função inverte o valor do estado (se está true vira false, e vice-versa)
    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    // Se isDarkMode for true, a variável 'theme' vira o darkTheme, se não, lightTheme
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        // Distribuímos as informações para o resto do app
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 5. O Gancho (Hook): Atalho para você usar as cores em qualquer tela de forma simples
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado obrigatoriamente dentro de um ThemeProvider');
    }
    return context;
};