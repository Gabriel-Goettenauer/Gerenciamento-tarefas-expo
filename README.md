# ToDoApp - Gerenciador de Tarefas Diárias

## Sobre o App

Este **aplicativo móvel**, chamado **ToDoApp**, foi desenvolvido para as plataformas **Android** e **iOS** usando o **Expo** e a linguagem de programação **JavaScript (com React Native)**. O objetivo principal é ajudar usuários a organizar e gerenciar suas tarefas diárias de forma simples e eficaz, oferecendo uma interface limpa e intuitiva para focar na produtividade.

---

## Funcionalidades Implementadas

As seguintes funcionalidades foram implementadas neste projeto e serão demonstradas:

* **Criar novas tarefas:** Adicionar novas tarefas com título e descrição.
* **Visualizar lista de tarefas:** Exibir todas as tarefas cadastradas na tela principal.
* **Marcar/Desmarcar como concluída:** Permitir que o usuário altere o status da tarefa.
* **Editar tarefas:** Permitir a edição do título e da descrição de uma tarefa existente.
* **Excluir tarefas:** Oferecer a opção de remover tarefas da lista.
* **Persistência local:** Salvar os dados das tarefas no dispositivo usando AsyncStorage.
* **Tema Dinâmico (Dark Mode):** Opção de alternar entre tema claro e escuro, com persistência da preferência.

## Trabalhos Futuros (*Funcionalidades Adicionais*)

* Adicionar **datas de vencimento** para cada tarefa.
* Implementar a **categorização** de tarefas (*trabalho, pessoal, estudos*).
* Configurar **notificações** para tarefas importantes.
* Sincronizar dados com um **banco de dados remoto** (como o Firebase) para acesso em múltiplos dispositivos.
* Implementar um sistema de **login e cadastro**.

---

## Protótipos de Tela

Os protótipos de tela foram criados no **Figma** para demonstrar o fluxo de navegação e o design da interface.

> [Protótipo do ToDoApp no Figma](https://www.figma.com/design/XZQFp2gj0cUmtXzecB2hyq/Untitled?node-id=0-1&t=KhjqaeZucFzSup4O-1)

---

## Planejamento de Sprints

O desenvolvimento do **ToDoApp** foi dividido em sprints para garantir um progresso contínuo e organizado.

### Sprint 1: Configuração e Interface (22/09 a 30/09) - **CONCLUÍDA**

* \[x\] **Configuração:** Instalação do Expo e bibliotecas essenciais (*AsyncStorage*).
* \[x\] **Design da interface:** Construção da estrutura das telas principal e de adição de tarefas.
* \[x\] **Componentes:** Criação dos componentes reutilizáveis, como o item da lista de tarefas e o botão flutuante.
* \[x\] **Navegação:** Implementação da navegação entre a tela principal e a de adicionar tarefa.

### Sprint 2: Funcionalidades Essenciais (30/09 a 20/10) - **CONCLUÍDA**

* \[x\] **CRUD Básico:** Implementação completa da lógica para **Criar**, **Visualizar**, **Marcar/Desmarcar** e **Excluir** tarefas.
* \[x\] **Persistência:** Integração com o *AsyncStorage* para salvar os dados no dispositivo.
* \[x\] **Funcionalidade de Edição (Adição não prevista):** Implementação da edição de título e descrição de tarefas existentes.
* \[x\] **Feedback visual:** Adicionar animações ou mudanças de estado na interface (*ex: riscar o texto de uma tarefa concluída*).

### Sprint 3: Melhorias e Finalização (20/10 a 10/11) - **EM ANDAMENTO**

* \[x\] **Tema Dinâmico (Dark Mode - Nova Tarefa):** Implementação da tela de **Configurações** (`/settings`) e da lógica para alternar entre os temas Claro e Escuro, com persistência da preferência.
* \[ \] **Validações:** Adicionar validações de formulário (ex: título obrigatório) e feedback de erro. (*Falta Implementar*)
* \[ \] **Finalização/Prevenção de Erros:** Ajuste fino da UX, correções de bugs de layout e tratamento de erros do sistema.

---

## Modelagem do Banco de Dados

Para a persistência de dados local, utilizamos o **AsyncStorage**. As informações das tarefas são armazenadas como uma lista de objetos, onde cada objeto representa uma tarefa com o seguinte esquema.

> **Justificativa de Alteração:** A modelagem inicial foi simplificada na implementação, removendo campos de *Prioridade*, *Categoria* e *Data*, que foram movidos para a seção de Trabalhos Futuros, focando no essencial para o CRUD básico (ID, Título, Descrição e Concluída).

### Schema de uma Tarefa (Executado)

```javascript
[
  {
    "id": "string-uuid-unico",
    "titulo": "Título da Tarefa",
    "descricao": "Uma breve descrição da tarefa (opcional).",
    "concluida": true | false
  }
]
## 🚀 Atualizações desde o último Checkpoint

Este Checkpoint 2 focou em implementar o **roteamento, a estilização e a composição** da aplicação, transformando o protótipo do Figma em uma versão funcional e navegável.

### I. Recursos e Módulos Aplicados

| Recurso | Módulo / Biblioteca | Onde Foi Aplicado | 
 | ----- | ----- | ----- | 
| **Roteamento de Telas** | `expo-router` | Configuração do `app/_layout.jsx` para gerenciar as rotas **`/`** (*Principal*), **`/add`** e **`/settings`**. | 
| **Estilização** | `StyleSheet` (*React Native*) | Estilização das 3 telas e aplicação da paleta de cores consistente (*Verde e Cinza*). | 
| **Estado Dinâmico** | `useState` (*React Hooks*) | Na tela principal (`app/index.jsx`), usado para armazenar a lista de tarefas e simular a **interação dinâmica** (*marcar/desmarcar e excluir*). | 

### II. Conceitos de Componentes Reutilizáveis

Os conceitos de **Boas Práticas para Componentes Reutilizáveis** foram aplicados em dois componentes customizados, criados na pasta `components/`:

| Componente | Conceito Aplicado | Explicação | 
 | ----- | ----- | ----- | 
| **`<TaskCard />`** | **Separação de Preocupações** | Responsável *apenas* por renderizar o layout de uma tarefa individual, recebendo dados e funções de manipulação (**`onToggle`**, **`onDelete`**) via *props*. | 
| **`<CustomButton />`** | **Passagem de Dados via Props** | Componente de botão primário, que recebe o texto (**`title`**) e a função de clique (**`onPress`**), sendo facilmente reutilizado (*ex: tela `/add`*). | 

[**Link para o Vídeo de Demonstração (Até 1 minuto)**] https://youtube.com/shorts/L238wVDC6OA?feature=share
```
Atualizações desde o último Checkpoint

I. Recursos e Módulos Aplicados

Recurso	Módulo / Biblioteca	Onde Foi Aplicado
Persistência de Dados	@react-native-async-storage/async-storage	Funções de CRUD (Create, Read, Update, Delete) em utils/TaskStorage.js.
Roteamento de Telas	expo-router	Navegação completa entre index, add (Criar/Editar) e settings.
Tema Dinâmico	React Context API e useColorScheme	Implementação do ThemeContext para gerenciar o estado global do tema.

II. Conceitos de Desenvolvimento

Conceito	Explicação
CRUD Completo	Todas as operações de Create, Read, Update e Delete foram implementadas, incluindo a função de edição e a atualização de status (marcar/desmarcar).
Separação de Preocupações	A lógica de persistência e manipulação de dados está isolada em utils/TaskStorage.js, e a lógica de tema está em app/ThemeContext.jsx.
Modelagem de Dados	Utilização de um array de objetos no AsyncStorage para armazenar as tarefas, indexadas por um uuid único.
