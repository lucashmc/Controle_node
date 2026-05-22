// Importa React e o hook useState para controle de estado
import React, { useState } from 'react';

// Importa os componentes nativos para construção da interface
import {
View, // Contêiner de layout
TextInput, // Campo de entrada de texto
Text, // Exibição de texto
TouchableOpacity, // Botão personalizável
FlatList, // Lista de rolagem eficiente
StyleSheet, // Estilização
Alert // Exibição de alertas
} from 'react-native';

// Componente principal da aplicação
export default function HomeScreen() {
// Estados para os campos do formulário
const [descricao, setDescricao] = useState(''); // Descrição do gasto
const [valor, setValor] = useState(''); // Valor do gasto
const [gastos, setGastos] = useState([]); // Lista de gastos
const [editandoId, setEditandoId] = useState(null); // ID do item sendo editado

// Função para adicionar um novo gasto ou atualizar um existente
const adicionarOuAtualizarGasto = () => {
// Validação: campos não podem estar vazios
if (!descricao || !valor) {
Alert.alert('Erro', 'Preencha todos os campos!');
return;
}

// Validação: o valor deve ser numérico
if (isNaN(parseFloat(valor))) {
Alert.alert('Erro', 'Digite um valor numérico!');
return;
}

if (editandoId) {
// Atualiza o gasto existente com base no ID
const gastosAtualizados = gastos.map(item =>
item.id === editandoId
? { ...item, descricao, valor: parseFloat(valor).toFixed(2) } // Atualiza valores
: item
);
setGastos(gastosAtualizados); // Atualiza o estado
setEditandoId(null); // Sai do modo de edição
} else {
// Cria um novo gasto
const novoGasto = {
id: Date.now().toString(), // Gera um ID único
descricao, // Usa a descrição digitada
valor: parseFloat(valor).toFixed(2) // Formata o valor
};
setGastos([...gastos, novoGasto]); // Adiciona à lista
}

// Limpa os campos do formulário
setDescricao('');
setValor('');
};

// Função para remover um gasto da lista
const removerGasto = (id) => {
setGastos(gastos.filter(item => item.id !== id)); // Remove o item pelo ID

// Se o item removido estava sendo editado, cancela a edição
if (editandoId === id) {
setEditandoId(null); // Sai do modo de edição
setDescricao('');
setValor('');
}
};

// Função para preencher o formulário com os dados do item que será editado
const editarGasto = (item) => {
setDescricao(item.descricao); // Preenche descrição
setValor(item.valor); // Preenche valor
setEditandoId(item.id); // Armazena o ID do item sendo editado
};

// Cálculo do valor total gasto
const totalGasto = gastos
.reduce((acc, item) => acc + parseFloat(item.valor), 0) // Soma os valores
.toFixed(2); // Formata com 2 casas decimais

// Retorna os elementos visuais da interface
return (
<View style={styles.container}>
<Text style={styles.title}>Controle de Gastos Diários</Text>

{/* Campo de entrada para descrição */}
<TextInput
style={styles.input}
placeholder="Descrição do gasto"
value={descricao}
onChangeText={setDescricao}
/>

{/* Campo de entrada para valor */}
<TextInput
style={styles.input}
placeholder="Valor (ex: 25.00)"
keyboardType="numeric"
value={valor}
onChangeText={setValor}
/>

{/* Botão para adicionar ou atualizar o gasto */}
<TouchableOpacity style={styles.button} onPress={adicionarOuAtualizarGasto}>
<Text style={styles.buttonText}>
{editandoId ? 'Atualizar Gasto' : 'Adicionar Gasto'}
</Text>
</TouchableOpacity>

{/* Lista de gastos exibida com FlatList */}
<FlatList
data={gastos} // Fonte de dados
keyExtractor={item => item.id} // Identificador único
renderItem={({ item }) => (
<View style={styles.itemContainer}>
{/* Exibe a descrição e valor */}
<Text style={styles.item}>
{item.descricao} - R$ {item.valor}
</Text>

{/* Ações de editar e remover */}
<View style={styles.actions}>
{/* Botão de edição */}
<TouchableOpacity onPress={() => editarGasto(item)} style={styles.editButton}>
<Text style={styles.actionText}>Editar</Text>
</TouchableOpacity>

   {/* Botão de remoção */}
   <TouchableOpacity onPress={() => removerGasto(item.id)} style={styles.deleteButton}>
   <Text style={styles.actionText}>Remover</Text>
   </TouchableOpacity>
     </View>
    </View>
      )}
     />

      {/* Exibição do total de gastos */}
       <Text style={styles.total}>Total: R$ {totalGasto}</Text>
       </View>
         );
         } 

     // Estilos aplicados à interface
     const styles = StyleSheet.create({
      container: {
      flex: 1,
padding: 20,
paddingTop: 60,
backgroundColor: '#f5f5f5',
},
title: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center',
},
input: {
backgroundColor: '#fff',
padding: 12,
borderRadius: 8,
marginBottom: 10,
borderWidth: 1,
borderColor: '#ccc',
},
button: {
backgroundColor: '#3b82f6',
padding: 12,
borderRadius: 8,
alignItems: 'center',
marginBottom: 20,
},
buttonText: {
color: '#fff',
fontWeight: 'bold',
},
itemContainer: {
backgroundColor: '#e0e7ff',
borderRadius: 8,
padding: 10,
marginBottom: 10,
},
item: {
fontSize: 16,
marginBottom: 5,
},
actions: {
flexDirection: 'row',
justifyContent: 'flex-end',
gap: 10, // Espaço entre os botões (em versões recentes do React Native)
},
editButton: {
marginRight: 10,
},
deleteButton: {},
actionText: {
color: '#2563eb',
fontWeight: 'bold',
},
total: {
marginTop: 20,
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
},
});