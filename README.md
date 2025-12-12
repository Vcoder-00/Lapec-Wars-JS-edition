
# 🥊 Batalha de Threads (Node.js + TypeScript)

Este projeto é uma simulação de **processamento paralelo** desenvolvida para a disciplina de **Sistemas Operacionais** do curso de Análise e Desenvolvimento de Sistemas (IFPI).

O objetivo é demonstrar na prática o uso de **Worker Threads** no Node.js para realizar tarefas pesadas (CPU-bound) sem bloquear o *Event Loop* principal.

## 💻 Sobre o Projeto

O sistema simula uma batalha entre professores do curso.
- **Thread Principal (Main):** Gerencia a arena, sorteia os lutadores e exibe o placar.
- **Worker Threads:** Cada professor roda em uma thread separada. O cálculo do dano (simulado por um loop pesado) acontece paralelamente, demonstrando que o sistema consegue processar múltiplos "ataques" ao mesmo tempo.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **TypeScript**: Linguagem (com tipagem estrita).
- **Worker Threads**: Módulo nativo do Node para multithreading.

## 🚀 Como Rodar

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

### 1. Instalar dependências
Como o projeto usa TypeScript, precisamos instalar o compilador e os tipos do Node:

```bash
npm install -D typescript @types/node
````

### 2\. Compilar o Código

O Node.js não roda TypeScript diretamente. Use o comando abaixo para gerar o arquivo `.js` com base nas configurações do `tsconfig.json`:

```bash
npx tsc
```

### 3\. Executar

Rode o arquivo JavaScript gerado:

```bash
node batalhaThreads.js
```

## 🧠 Conceitos Abordados

  - **Multithreading vs Single-thread**: Diferença entre o modelo padrão do Node e o uso de Workers.
  - **Comunicação entre Threads**: Uso de `parentPort` e `workerData` para troca de mensagens.
  - **Sincronização**: Uso de `Promise.all` para aguardar o término de tarefas paralelas.

-----

Desenvolvido por **Vitor, Francisco Mailson e Mateus Araújo** 🎓

```
```
