// Importa React e o hook useState para controle de estado
import React, { use, useState } from 'react';

// Importa os componentes nativos para construção de interface
import {
    View,               // Container de layout
    TextInput,          // Campo de entrada de texto
    Text,               // Exibição de texto
    TouchableOpacity,   // Botão personalizável
    FlatList,           // Lista de rolagem eficiente
    StyleSheet,         // Estilização
    Alert               // Exibição de alertas
} from 'react-native';

// Componente principal da aplicação
export default function HomeScreen(){
    // Estado para os campos do formulário
    const [descricao, setDescricao] = useState('');     // Descrição do gasto
    const [valor, setValor] = useState('');             // valor do gasto
    const [gastos, setGastos] = useState([]);           // Lista de gastos
    const [editandoId, setEditandoId] = useState(null); // Id do item sendo editado

    // Função para adicionar um novo gasto ou atualizar um existente
    const adicionarOuAtualizarGasto = () =>{
        // validação campos não podem estar vazios
        if(!descricao || !valor){
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
       
       //Validação para verificar valor numérico no campo valor

       if(isNaN(parseFloat(valor))){
        Alert.alert('Erro', 'Valor deve ser numérico!');
        return;
       }

       if(editandoId){
        const gastosAtualizados = gastos.map(item =>
            item.id === editandoId ? { ...item, descricao, valor: parseFloat(valor).toFixed(2) } : item); // atualiza valores 
        
              setGastos(gastosAtualizados); // atualiza estado com a lista atualizada
              setEditandoId(null); // sai do modo de edição
         } else {const novoGasto = {
            id: Date.now().toString(), // Gera um ID único baseado no timestamp
            descricao,
            valor: parseFloat(valor).toFixed(2) // Converte o valor para número com 2 casas decimais
        };
        setGastos([...gastos, novoGasto]); // Adiciona o novo gasto à lista
             }
        // Limpa os campos do formulário
        setDescricao('');
        setValor('');
            };
            // Função para remover um gasto da lista
            const removerGasto = (id) => {
                setGastos(gastos.filter(item => item.id !== id)); // Remove o item com o ID correspondente 
                //verifica se o item a ser removido esta sendo editado. se estiver, cancela a opereção de edição
                if(editandoId === id){
                    setEditandoId(null); // Sai do modo de edição
                    setDescricao(''); // Limpa o campo de descrição
                    setValor(''); // Limpa o campo de valor
                }
            };

         //Função para preencher os campos do formulário com os dados do item a ser editado

           const editarGasto = (item) => {
               setDescricao(item.descricao); //Preenche o campo de descrição com a descrição do item selecionado
               setValor(item.valor);     // Preenche o campo de valor com o valor do item selecionado
               setEditandoId(item.id);   // Define o ID do item que está sendo editado para controlar o modo de edição
           };
           
        }