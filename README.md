**ToDoApp - Gerenciador de Tarefas Diárias**

Sobre o app

Este aplicativo móvel, chamado ToDoApp, foi desenvolvido para as plataformas Android e iOS usando o Expo e a linguagem de programação JavaScript (com React Native). O objetivo principal é ajudar usuários a organizar e gerenciar suas tarefas diárias de forma simples e eficaz, oferecendo uma interface limpa e intuitiva para focar na produtividade.
Funcionalidades Prioritárias

As seguintes funcionalidades são consideradas essenciais e serão implementadas como prioridade neste projeto:

    Criar novas tarefas: Adicionar novas tarefas com título, descrição e data de criação.

    Visualizar lista de tarefas: Exibir todas as tarefas cadastradas na tela principal.

    Marcar como concluída: Permitir que o usuário marque tarefas como feitas.

    Excluir tarefas: Oferecer a opção de remover tarefas da lista.

    Persistência local: Salvar os dados das tarefas no dispositivo para que não sejam perdidos ao fechar o app.

Trabalhos Futuros (Funcionalidades Adicionais)

    Adicionar datas de vencimento para cada tarefa.

    Implementar a categorização de tarefas (trabalho, pessoal, estudos).

    Configurar notificações para tarefas importantes.

    Sincronizar dados com um banco de dados remoto (como o Firebase) para acesso em múltiplos dispositivos.

    Implementar um sistema de login e cadastro.

Protótipos de tela

Os protótipos de tela foram criados no Figma para demonstrar o fluxo de navegação e o design da interface. O design foi aprimorado para incluir o fluxo de edição e exclusão de tarefas, além de uma tela de configurações, conforme o feedback.

Protótipo do ToDoApp no Figma
https://www.figma.com/design/XZQFp2gj0cUmtXzecB2hyq/Untitled?node-id=0-1&t=WcLTV2oDFQ423U9V-1


**Planejamento de sprints**

O desenvolvimento do ToDoApp será dividido em sprints de duas semanas para garantir um progresso contínuo e organizado.
Sprint 1: Configuração e Interface (22/09 a 30/09) - CONCLUÍDA

    [x] Configuração: Instalação do Expo e bibliotecas essenciais (AsyncStorage).

    [x] Design da interface: Construção da estrutura das telas principal e de adição de tarefas.

    [x] Componentes: Criação dos componentes reutilizáveis, como o item da lista de tarefas e o botão flutuante.

    [x] Navegação: Implementação da navegação entre a tela principal e a de adicionar tarefa.

Sprint 2: Funcionalidades Essenciais (30/09 a 20/10)

    [ ] CRUD Básico: Implementação da lógica para criar, visualizar, marcar como concluída e excluir tarefas.

    [ ] Persistência: Integração com o AsyncStorage para salvar os dados no dispositivo.

    [ ] Feedback visual: Adicionar animações ou mudanças de estado na interface (ex: riscar o texto de uma tarefa concluída).

Sprint 3: Melhorias e Funcionalidades Adicionais (20/10 a 10/11)

    [ ] Funcionalidades avançadas: Implementação da prioridade e da categoria nas tarefas.

    [ ] Melhorias na UX/UI: Adição de funcionalidades de edição de tarefas e aprimoramento dos estilos.

    [ ] Testes: Realização de testes de usabilidade e depuração do aplicativo.

Modelagem do banco de dados

Para a persistência de dados local, utilizaremos o AsyncStorage, uma biblioteca simples e eficaz para armazenamento local assíncrono, ideal para a abordagem NoSQL deste projeto.

A modelagem foi aprimorada para contemplar incrementos futuros. As informações das tarefas serão armazenadas como uma lista de objetos, onde cada objeto representa uma tarefa com o seguinte esquema (schema):
Schema de uma Tarefa

[
  {
    "id": "uuid-gerado-automaticamente",
    "titulo": "Título da Tarefa",
    "descricao": "Uma breve descrição da tarefa.",
    "concluida": false,
    "prioridade": "média",
    "categoria": "pessoal", 
    "dataCriacao": "2025-09-08T14:30:00Z",
    "dataConclusao": null 
  }
]

**Atualizações desde o último Checkpoint**

Este Checkpoint 2 focou em implementar o roteamento, a estilização e a composição da aplicação, transformando o protótipo do Figma em uma versão funcional e navegável.
I. Recursos e Módulos Aplicados

Recurso
	

Módulo / Biblioteca
	

Onde Foi Aplicado

Roteamento de Telas
	

expo-router
	

Configuração do app/_layout.jsx para gerenciar as rotas / (Principal), /add e /settings.

Estilização
	

StyleSheet (React Native)
	

Estilização das 3 telas e aplicação da paleta de cores consistente (Verde e Cinza).

Estado Dinâmico
	

useState (React Hooks)
	

Na tela principal (app/index.jsx), usado para armazenar a lista de tarefas e simular a interação dinâmica (marcar/desmarcar e excluir).
II. Conceitos de Componentes Reutilizáveis

Os conceitos de Boas Práticas para Componentes Reutilizáveis foram aplicados em dois componentes customizados, criados na pasta components/:

Componente
	

Conceito Aplicado
	

Explicação

<TaskCard />
	

Separação de Preocupações
	

Responsável apenas por renderizar o layout de uma tarefa individual, recebendo dados e funções de manipulação (onToggle, onDelete) via props.

<CustomButton />
	

Passagem de Dados via Props
	

Componente de botão primário, que recebe o texto (title) e a função de clique (onPress), sendo facilmente reutilizado (ex: tela /add).

Link para o Vídeo de Demonstração (Até 1 minuto)
