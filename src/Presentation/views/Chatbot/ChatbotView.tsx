import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doc';
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  'Organizar Recibos',
  'Ajuda com Biometria',
  'Mover Arquivos',
];

// Configuração dinâmica da URL da API C#
const PORT = '5000'; // Altere aqui se a sua API C# estiver em outra porta (ex: 5051, 7055)

const getApiUrl = () => {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    // Emulador Android Studio
    return `http://10.0.2.2:${PORT}/api/chatbot`;
  }
  
  // Dispositivo Físico / Expo Go (Pega o IP da máquina na rede local)
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:${PORT}/api/chatbot`;
  }

  // Fallback
  return `http://10.0.2.2:${PORT}/api/chatbot`;
};

const API_URL = getApiUrl();

export default function ChatbotView({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o Doc! Como posso te ajudar hoje?',
      sender: 'doc',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensagem: text }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      const docMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.resposta || 'Não consegui obter uma resposta.',
        sender: 'doc',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, docMsg]);
    } catch (error) {
      console.error('Erro na requisição:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Ops! Tive um problema ao me conectar com o servidor. Verifique se a API C# está rodando.',
        sender: 'doc',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isDoc = item.sender === 'doc';
    return (
      <View style={[styles.messageRow, isDoc ? styles.rowLeft : styles.rowRight]}>
        {isDoc && (
          <Image 
            source={require('../../../../assets/img/doc-robot.png')} 
            style={styles.avatarSmall} 
          />
        )}
        <View style={[styles.bubble, isDoc ? styles.docBubble : styles.userBubble]}>
          <Text style={[styles.messageText, isDoc ? styles.docText : styles.userText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1E6091" />
          </TouchableOpacity>
          <Image source={require('../../../../assets/img/doc-robot.png')} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerTitle}>CentralDocs</Text>
            <Text style={styles.headerSubtitle}>Assistente AI</Text>
          </View>
        </View>

        {/* Lista de Mensagens */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            <View style={styles.welcomeContainer}>
              <Image source={require('../../../../assets/img/doc-robot.png')} style={styles.docMainImage} />
              <Text style={styles.welcomeTitle}>Olá, sou o Doc!</Text>
              <Text style={styles.welcomeSubtitle}>Como posso te ajudar hoje?</Text>
            </View>
          }
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#1E88E5" />
                <Text style={styles.loadingText}>Doc está digitando...</Text>
              </View>
            ) : null
          }
        />

        {/* Campo de Entrada */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua mensagem..."
            placeholderTextColor="#8E8E93"
            value={inputText}
            onChangeText={setInputText}
            editable={!loading}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={() => handleSend()}
            disabled={loading}
          >
            <Ionicons name="send" size={18} color={loading ? '#B0BEC5' : '#1E88E5'} />
          </TouchableOpacity>
        </View>

        {/* Sugestões Rápidas */}
        <View style={styles.suggestionsContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={QUICK_SUGGESTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionChip}
                onPress={() => handleSend(item)}
                disabled={loading}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#CBE5FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D1B2A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#415A77',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  docMainImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B263B',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#415A77',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  docBubble: {
    backgroundColor: '#EAEFF5',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#90CAF9',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  docText: {
    color: '#1C2541',
  },
  userText: {
    color: '#0D1B2A',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingText: {
    fontSize: 12,
    color: '#415A77',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C2541',
  },
  sendButton: {
    padding: 4,
  },
  suggestionsContainer: {
    marginVertical: 10,
    paddingLeft: 16,
  },
  suggestionChip: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  suggestionText: {
    fontSize: 12,
    color: '#1565C0',
    fontWeight: '500',
  },
});