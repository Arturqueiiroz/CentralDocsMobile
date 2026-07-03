import React, { createContext, useState, useContext } from 'react';

// 1. Aqui mapeamos as cores que o app vai usar nos dois modos.
// Importante: use sempre os mesmos nomes de propriedades nos dois objetos!
export const lightTheme = {
    background: '#F8FAFC',        // Fundo da tela
    card: '#FFFFFF',            // Fundo dos cards brancos
    textPrimary: '#1E293B',     // Cor dos títulos principais
    textSecondary: '#64748B',   // Cor dos textos menores/subtítulos
    borderColor: '#EDF2F7',     // Cor das bordas
};

export const darkTheme = {
    background: '#0F172A',        // Fundo escuro (Slate 900)
    card: '#1E293B',            // Cards um pouco mais claros (Slate 800)
    textPrimary: '#F8FAFC',     // Títulos em branco/gelo
    textSecondary: '#94A3B8',   // Subtítulos em cinza claro
    borderColor: '#334155',     // Bordas escuras
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