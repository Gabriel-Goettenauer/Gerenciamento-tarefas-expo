# Gerenciamento-tarefas-expo

# ToDoApp - Gerenciador de Tarefas Diárias

## Sobre o app

Este aplicativo móvel, chamado **ToDoApp**, foi desenvolvido para as plataformas Android e iOS usando o **Expo** e a linguagem de programação JavaScript (com React Native). O objetivo é ajudar usuários a organizar e gerenciar suas tarefas diárias de forma simples e eficaz. O app oferece uma interface limpa e intuitiva para que o foco seja na produtividade.

### Funcionalidades Prioritárias (Módulo 1)

As seguintes funcionalidades são consideradas essenciais e serão implementadas como prioridade neste projeto:

- [ ] Criação de novas tarefas (título e descrição).
- [ ] Visualização da lista de tarefas.
- [ ] Marcar tarefas como concluídas.
- [ ] Excluir tarefas da lista.
- [ ] Persistência de dados localmente no dispositivo.

### Trabalhos Futuros (Adicionais)

- [ ] Adicionar datas de vencimento para cada tarefa.
- [ ] Implementar a categorização de tarefas (trabalho, pessoal, estudos).
- [ ] Configurar notificações para tarefas importantes.
- [ ] Sincronizar dados com um banco de dados remoto (Firebase, por exemplo) para acesso em múltiplos dispositivos.

---

## Protótipos de tela

Os protótipos de tela foram criados no Figma para demonstrar o fluxo de navegação e o design da interface. Você pode interagir com as telas e visualizar o protótipo clicando no link abaixo.

[Protótipo do ToDoApp no Figma](<insira_aqui_o_link_público_do_seu_Figma>)

---

## Modelagem do banco de dados

Para a persistência de dados local, utilizaremos uma abordagem NoSQL. As informações das tarefas serão armazenadas como uma lista de objetos, onde cada objeto representa uma tarefa. A modelagem a seguir descreve o *schema* dos dados que será salvo no dispositivo.

**Schema de uma Tarefa:**

```json
[
  {
    "id": "uuid-gerado-automaticamente",
    "titulo": "Título da Tarefa",
    "descricao": "Uma breve descrição da tarefa.",
    "concluida": false,
    "dataCriacao": "2025-08-27T10:00:00Z"
  }
]
