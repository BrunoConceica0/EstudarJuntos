import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const BookIconSource = require('@/assets/image/livro_transparente.png');

// --- COMPONENTE DE AÇÃO RÁPIDA (Não visível na imagem, mas mantido para estrutura)
const QuickActionButton = ({ title, iconName }) => {
    return (
        <TouchableOpacity style={styles.quickActionCard}>
            <MaterialIcons
                name={iconName}
                size={30}
                color="#007AFF"
                style={{ marginBottom: 5 }}
            />
            <Text style={styles.quickActionText}>{title}</Text>
        </TouchableOpacity>
    );
};

//TELA PRINCIPAL (HOME SCREEN)
//  Adicionar { navigation } para receber a ferramenta de navegação do Stack
const HomeScreen = ({ navigation }) => { 
    
    const userName = "Maria"; // Nome de exemplo do usuário
    
    // Função que será chamada para navegar para a tela 'Explore' (estado_padrao.js)
    const handleFabPress = () => {
        // Usar navigation.navigate para ir para a rota 'Explore'
        // 'Explore' é o nome da rota que definimos no App.js
        navigation.navigate('Explore');
    };

    return (
        <View style={styles.androidSafeArea}>
            <ScrollView style={styles.container}>

                {/* CARD DE BOAS-VINDAS (Topo azul) */}
                <View style={styles.topWelcomeCard}>
                    <Text style={styles.topWelcomeTitle}>Seja bem-vindo(a), {userName}! 🎉</Text>
                    <Text style={styles.topWelcomeSubtitle}>
                        A Ponte do Saber conecta você ao seu futuro. Explore doações ou compartilhe seus livros para começar.
                    </Text>
                </View>

                {/* Seção "Nenhum livro próximo ainda" com imagem e texto */}
                <View style={styles.noBooksContainer}>
                    
                    <Image
                        source={BookIconSource}
                        style={styles.bookIcon}
                    />
                    <Text style={styles.noBooksTitle}>Nenhum livro próximo ainda</Text>
                    <Text style={styles.noBooksSubtitle}>
                        Os livros que aparecerem perto de você serão listados aqui
                    </Text>
                </View>
                
            </ScrollView>

            {/* FAB (Floating Action Button) - Botão Flutuante */}
            {/* Chamar a função de navegação (handleFabPress) no onPress */}
            <TouchableOpacity style={styles.fabButton} onPress={handleFabPress}> 
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

        </View>
    );
};

// --- ESTILOS ---

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Fundo cinza claro
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    
    container: {
        flex: 1, // Permite que o container se expanda
        padding: 0, // Removido padding para o card azul ir até as bordas
    },
    
    // ESTILO: Topo azul com mensagem de boas-vindas
    topWelcomeCard: {
        backgroundColor: '#007AFF',
        padding: 20,
        paddingTop: 40, // Mais padding no topo para o texto não ficar colado
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 30, // Espaço entre o card azul e o conteúdo abaixo
        // Sombra leve para dar profundidade
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    topWelcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF', // Texto branco
        marginBottom: 8,
    },
    topWelcomeSubtitle: {
        fontSize: 16,
        color: '#FFFFFF', // Texto branco
        lineHeight: 22, // Melhor espaçamento entre linhas
    },

    // ESTILOS PARA "NENHUM LIVRO PRÓXIMO AINDA"
    noBooksContainer: {
        flex: 1, // Para ocupar o espaço restante e centralizar verticalmente
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 200,
    },
    bookIcon: {
        width: 80,
        height: 80,
        marginBottom: 20,
        opacity: 0.9,
    },
    noBooksTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    noBooksSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },

    // --- ESTILOS DE QUICK ACTION BUTTON
    quickActionText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },
    quickActionCard: {
        // Pode completar os estilos do quickActionCard aqui, se precisar.
    },
    // ---------------------------------------------------------------------------------

    // Estilos para o FAB (Floating Action Button)
    fabButton: {
      position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        left: '50%', // Começa no centro horizontal
        marginLeft: -30, // Move para a esquerda metade da largura (60/2)
        // Mantém a posição vertical na parte inferior
        bottom: 50,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        fontSize: 35, // Um pouco maior
        color: 'white',
        lineHeight: 35, // Ajuste para centralizar
    },
});

export default HomeScreen;