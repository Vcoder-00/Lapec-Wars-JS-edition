const { Worker: WorkerThread, isMainThread, parentPort, workerData } = require('worker_threads');

// --- CLASSE DO PROFESSOR (Define os atributos) ---
class Professor {

    constructor(nome, materia, hp, ataqueBase, golpeEspecial) {
        this.nome = nome;
        this.materia = materia;
        this.hp = hp;
        this.ataqueBase = ataqueBase;
        this.golpeEspecial = golpeEspecial;
    }
}

// --- CÓDIGO DA THREAD PRINCIPAL (A ARENA) ---
if (isMainThread) {
    // 1. Criando os Lutadores (Atributos)
    const p1 = new Professor("Prof. Maykol", "Sistemas Operacionais", 100, 15, "Deadlock Mortal");
    const p2 = new Professor("Prof. Jeferson", "Analise e desenvolvimento software", 100, 15, "Falta ;!");
    const p3 = new Professor("Prof. Iallen", "POO", 100, 15, "Guitarra eletrizante");
    const p4 = new Professor("Prof. Mayllon", "Engenharia de software", 100, 15, "Ataque duplo com clone: VerasMayllon");
    const p5 = new Professor("Prof. Jivago", "Estrutura de dados", 100, 15, "Ponteiro selvagem");
    const p6 = new Professor("Prof. Sekeff", "Arquitetura de computadores", 100, 15, "Buffer Overflow");

    const listaDeGuerreiros = [p1, p2, p3, p4, p5, p6];

    // Seleciona dois professores aleatórios para a batalha
    do {
        var guerreiro1 = listaDeGuerreiros[Math.floor(Math.random() * listaDeGuerreiros.length)];
        var guerreiro2 = listaDeGuerreiros[Math.floor(Math.random() * listaDeGuerreiros.length)];
    } while (guerreiro1 === guerreiro2);

    console.log("==========================================");
    console.log(`🥊 BATALHA INICIADA: ${guerreiro1.nome} VS ${guerreiro2.nome} 🥊`);
    console.log("==========================================\n");

    // Função auxiliar para criar uma Thread de luta
    function realizarAtaque(professor) {
        return new Promise((resolve, reject) => {
            const worker = new WorkerThread(__filename, {
                workerData: professor
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker parou com código ${code}`));
            });
        });
    }

    // 2. Execução Paralela (Multithreading)
    // Os dois professores "pensam" e "atacam" ao mesmo tempo.
    // O Node não espera o P1 terminar para começar o P2.
    (async () => {
        try {
            console.log(">> Os professores estão carregando seus golpes (Threads em paralelo)...\n");

            // Promise.all espera todas as threads terminarem seus cálculos
            const resultados = await Promise.all([
                realizarAtaque(guerreiro1),
                realizarAtaque(guerreiro2)
            ]);

            // Devolve os resultados dos ataques que vieram do parentPort.postMessage(danoTotal);
            // console.log(resultados);

            // Determina os vetores
            const danoP1 = resultados[0];
            const danoP2 = resultados[1];

            // 3. Resolução da Batalha (Sincronização)
            console.log("--- RESULTADO DO TURNO ---");
            console.log(`⚔️  ${guerreiro1.nome} usou "${guerreiro1.golpeEspecial}" e causou ${danoP1} de dano!`);
            console.log(`⚔️  ${guerreiro2.nome} usou "${guerreiro2.golpeEspecial}" e causou ${danoP2} de dano!`);

            // Atualiza Vidas
            guerreiro2.hp -= danoP1;
            guerreiro1.hp -= danoP2;
            console.log("\n--- PLACAR FINAL ---");
            console.log(`${guerreiro1.nome} HP: ${guerreiro1.hp > 0 ? guerreiro1.hp : 0}`);
            console.log(`${guerreiro2.nome} HP: ${guerreiro2.hp > 0 ? guerreiro2.hp : 0}`);

            if (danoP1 > danoP2) {
                console.log(`\n🏆 VENCEDOR DO ROUND: ${guerreiro1.nome}!`);
            } else if (danoP2 > danoP1) {
                console.log(`\n🏆 VENCEDOR DO ROUND: ${guerreiro2.nome}!`);
            } else {
                console.log("\n🤝 EMPATE TÉCNICO!");
            }

        } catch (err) {
            console.error(err);
        }
    })();

} 

// --- CÓDIGO DO WORKER (A MENTE DO LUTADOR) ---
else {
    // Recebe os dados do professor passados pela main thread
    const professor = workerData;

    // Simula um processamento pesado (Cálculo de Dano Crítico)

    // Um loop gigante apenas para gastar CPU e justificar o uso de thread
    let bonusDeSorte = 0;
    for (let i = 0; i < 50000000; i++) {
        // Simulação de cálculo complexo
        bonusDeSorte += Math.random(); 
    }

    // Lógica do Dano: Ataque Base + Fator Aleatório (Sorte)
    const fatorAleatorio = Math.floor(Math.random() * 20); // 0 a 20
    const danoTotal = professor.ataqueBase + fatorAleatorio;

    // Devolve o resultado para a Thread Principal
    parentPort.postMessage(danoTotal);
}