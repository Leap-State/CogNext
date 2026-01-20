import { Question } from '@/types';

export const testQuestions: Record<string, Question[]> = {
  iq: [
    { id: 1, text: 'Qual número vem a seguir: 2, 4, 8, 16, ?', options: ['24', '32', '28', '20'], correctIndex: 1 },
    { id: 2, text: 'Se CASA = 4, PORTA = 5, então JANELA = ?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 3, text: 'Complete a sequência: A, C, E, G, ?', options: ['H', 'I', 'J', 'K'], correctIndex: 1 },
    { id: 4, text: 'Qual figura completa o padrão? ○□△ ○□△ ○□?', options: ['○', '□', '△', '◇'], correctIndex: 2 },
    { id: 5, text: 'Se 3 + 5 = 16, 4 + 6 = 24, então 5 + 7 = ?', options: ['32', '35', '36', '40'], correctIndex: 2 },
    { id: 6, text: 'Quantos triângulos você pode contar em um triângulo dividido em 4 partes iguais?', options: ['4', '5', '6', '8'], correctIndex: 1 },
    { id: 7, text: 'Se ontem foi dois dias antes de sexta, que dia é amanhã?', options: ['Domingo', 'Segunda', 'Sábado', 'Sexta'], correctIndex: 0 },
    { id: 8, text: 'Qual é o próximo número na sequência de Fibonacci: 1, 1, 2, 3, 5, 8, ?', options: ['11', '12', '13', '15'], correctIndex: 2 },
    { id: 9, text: 'Se 2 pintores pintam 2 paredes em 2 horas, quantas horas levam 4 pintores para pintar 4 paredes?', options: ['1 hora', '2 horas', '4 horas', '8 horas'], correctIndex: 1 },
    { id: 10, text: 'Qual número substitui o ? → 8, 27, 64, 125, ?', options: ['150', '196', '216', '256'], correctIndex: 2 },
    { id: 11, text: 'Se ELEFANTE está para GRANDE, então FORMIGA está para:', options: ['Inseto', 'Pequeno', 'Colônia', 'Trabalhador'], correctIndex: 1 },
    { id: 12, text: 'Um relógio marca 3:15. Qual é o ângulo entre os ponteiros?', options: ['0°', '7.5°', '15°', '22.5°'], correctIndex: 1 },
    { id: 13, text: 'Se você reorganizar "ENIGMA", qual NÃO é possível formar?', options: ['ANEMIA', 'MAGINE', 'IMAGEM', 'ENIGMA'], correctIndex: 2 },
    { id: 14, text: 'Qual é o 7º número primo?', options: ['13', '15', '17', '19'], correctIndex: 2 },
    { id: 15, text: 'Se A=1, B=2... então MENTE = ?', options: ['48', '52', '56', '60'], correctIndex: 1 },
  ],
  eq: [
    { id: 1, text: 'Quando alguém te critica injustamente em público, você:', options: ['Fica muito irritado e responde na hora', 'Respira fundo e responde com calma depois', 'Ignora e guarda mágoa', 'Tenta entender o ponto de vista'], correctIndex: 1 },
    { id: 2, text: 'Seu melhor amigo cancela planos importantes de última hora. Você:', options: ['Fica furioso e deixa de falar', 'Expressa decepção mas tenta entender', 'Finge que não importa', 'Cancela amizade imediatamente'], correctIndex: 1 },
    { id: 3, text: 'Você percebe que um colega está passando por dificuldades. Você:', options: ['Espera que ele peça ajuda', 'Oferece apoio discretamente', 'Não é problema seu', 'Conta para outros colegas'], correctIndex: 1 },
    { id: 4, text: 'Quando você falha em algo importante, sua primeira reação é:', options: ['Culpar circunstâncias externas', 'Analisar o que pode melhorar', 'Desistir de tentar novamente', 'Sentir vergonha extrema'], correctIndex: 1 },
    { id: 5, text: 'Alguém próximo compartilha uma conquista. Você sente:', options: ['Inveja genuína', 'Alegria sincera por ela', 'Indiferença', 'Competitividade'], correctIndex: 1 },
    { id: 6, text: 'Quando está muito estressado, você consegue identificar a causa?', options: ['Sempre identifico e trabalho nisso', 'Geralmente sim', 'Às vezes me perco', 'Raramente entendo meu estresse'], correctIndex: 0 },
    { id: 7, text: 'Uma pessoa te trata mal sem razão aparente. Você pensa:', options: ['Ela é má pessoa', 'Talvez esteja passando por algo', 'Vou me vingar depois', 'Eu devo ter feito algo errado'], correctIndex: 1 },
    { id: 8, text: 'Você precisa dar feedback negativo a alguém. Como aborda?', options: ['Evita a conversa', 'É direto mas respeitoso', 'Manda mensagem de texto', 'É brutalmente honesto'], correctIndex: 1 },
    { id: 9, text: 'Quando sente raiva, você consegue controlar suas palavras?', options: ['Sempre mantenho compostura', 'Na maioria das vezes', 'Frequentemente me arrependo', 'Perco o controle facilmente'], correctIndex: 0 },
    { id: 10, text: 'Você está em um grupo onde todos concordam com algo que você discorda. Você:', options: ['Fica calado para evitar conflito', 'Expressa sua opinião com respeito', 'Concorda mesmo discordando', 'Critica a opinião dos outros'], correctIndex: 1 },
    { id: 11, text: 'Ao receber uma promoção que um colega também queria, você:', options: ['Evita o colega', 'Conversa com sensibilidade', 'Celebra ostensivamente', 'Sente culpa excessiva'], correctIndex: 1 },
    { id: 12, text: 'Você percebe que está procrastinando uma tarefa importante. Você:', options: ['Continua procrastinando', 'Identifica o bloqueio emocional', 'Se critica severamente', 'Pede para outro fazer'], correctIndex: 1 },
  ],
  personality: [
    { id: 1, text: 'Em uma festa com desconhecidos, você naturalmente:', options: ['Inicia conversas com várias pessoas', 'Encontra um canto tranquilo', 'Fica perto de quem conhece', 'Observa antes de interagir'], correctIndex: 0 },
    { id: 2, text: 'Ao planejar uma viagem, você prefere:', options: ['Roteiro detalhado hora a hora', 'Destino definido, resto espontâneo', 'Nenhum plano, total improviso', 'Lista de opções flexíveis'], correctIndex: 1 },
    { id: 3, text: 'Quando alguém te conta um problema, sua tendência é:', options: ['Oferecer soluções práticas', 'Escutar e validar sentimentos', 'Contar uma experiência similar sua', 'Tentar alegrar a pessoa'], correctIndex: 1 },
    { id: 4, text: 'Seu espaço de trabalho ideal é:', options: ['Escritório aberto e colaborativo', 'Sala privada e silenciosa', 'Café movimentado', 'Muda conforme o humor'], correctIndex: 3 },
    { id: 5, text: 'Diante de uma grande decisão, você:', options: ['Faz listas de prós e contras', 'Segue sua intuição', 'Consulta várias pessoas', 'Adia até ser inevitável'], correctIndex: 0 },
    { id: 6, text: 'Em um projeto de grupo, você naturalmente assume:', options: ['Papel de líder/organizador', 'Papel de executor/fazedor', 'Papel de mediador/harmonizador', 'Papel de crítico/revisor'], correctIndex: 0 },
    { id: 7, text: 'Seu fim de semana ideal inclui:', options: ['Encontros sociais diversos', 'Tempo sozinho em casa', 'Atividades ao ar livre', 'Mix de social e descanso'], correctIndex: 3 },
    { id: 8, text: 'Quando aprende algo novo, você prefere:', options: ['Ler e estudar teoria primeiro', 'Ir praticando e errando', 'Assistir alguém fazer', 'Discutir com outros'], correctIndex: 0 },
    { id: 9, text: 'Você se descreve mais como:', options: ['Sonhador e idealista', 'Prático e realista', 'Analítico e lógico', 'Empático e sensível'], correctIndex: 0 },
    { id: 10, text: 'Mudanças inesperadas te fazem sentir:', options: ['Ansioso e desconfortável', 'Animado e curioso', 'Indiferente', 'Depende da mudança'], correctIndex: 1 },
    { id: 11, text: 'Você prefere ambientes com:', options: ['Regras claras e estrutura', 'Liberdade e flexibilidade', 'Colaboração constante', 'Competição saudável'], correctIndex: 1 },
    { id: 12, text: 'Ao discordar de uma autoridade, você:', options: ['Expressa respeitosamente', 'Fica calado mas insatisfeito', 'Questiona abertamente', 'Segue mesmo discordando'], correctIndex: 0 },
  ],
  vocational: [
    { id: 1, text: 'Qual atividade te daria mais satisfação?', options: ['Programar um aplicativo inovador', 'Ajudar pessoas em crise', 'Criar uma obra de arte', 'Gerenciar uma equipe de vendas'], correctIndex: 0 },
    { id: 2, text: 'Você prefere trabalhar com:', options: ['Dados, sistemas e tecnologia', 'Pessoas e relacionamentos', 'Ideias e criatividade', 'Processos e organização'], correctIndex: 0 },
    { id: 3, text: 'Se pudesse resolver um problema global, seria:', options: ['Mudanças climáticas via tecnologia', 'Desigualdade social', 'Expressão cultural e arte', 'Eficiência econômica'], correctIndex: 0 },
    { id: 4, text: 'Qual destes você mais valoriza em um trabalho?', options: ['Inovação e desafios técnicos', 'Impacto na vida das pessoas', 'Liberdade criativa', 'Crescimento e estabilidade'], correctIndex: 0 },
    { id: 5, text: 'Seu ambiente de trabalho ideal seria:', options: ['Startup de tecnologia', 'Hospital ou escola', 'Estúdio ou agência criativa', 'Corporação estabelecida'], correctIndex: 0 },
    { id: 6, text: 'Como você prefere resolver problemas?', options: ['Analisando dados e padrões', 'Conversando com as partes', 'Brainstorming criativo', 'Seguindo procedimentos'], correctIndex: 0 },
    { id: 7, text: 'O que te deixa mais realizado?', options: ['Criar algo funcional', 'Ver alguém melhorar', 'Expressar uma visão única', 'Alcançar metas ambiciosas'], correctIndex: 0 },
    { id: 8, text: 'Você aprende melhor:', options: ['Experimentando e construindo', 'Interagindo com outros', 'Observando e imaginando', 'Estudando e planejando'], correctIndex: 0 },
    { id: 9, text: 'Qual descrição mais combina com você?', options: ['Curioso e analítico', 'Empático e atencioso', 'Imaginativo e expressivo', 'Ambicioso e organizado'], correctIndex: 0 },
    { id: 10, text: 'Em 10 anos, você se vê:', options: ['Liderando inovações tecnológicas', 'Fazendo diferença na comunidade', 'Reconhecido por trabalho criativo', 'No topo de uma grande empresa'], correctIndex: 0 },
    { id: 11, text: 'Qual habilidade você mais gostaria de dominar?', options: ['Programação/IA', 'Comunicação/Liderança', 'Design/Produção artística', 'Gestão/Estratégia'], correctIndex: 0 },
    { id: 12, text: 'O que mais te incomoda em um trabalho?', options: ['Falta de desafios técnicos', 'Não ajudar as pessoas', 'Falta de criatividade', 'Falta de crescimento'], correctIndex: 0 },
  ],
  neuro: [
    { id: 1, text: 'Memorize: CASA-AZUL-MESA-LUA. Qual era a terceira palavra?', options: ['CASA', 'AZUL', 'MESA', 'LUA'], correctIndex: 2 },
    { id: 2, text: 'Qual NÃO pertence: Guitarra, Piano, Bateria, Microfone?', options: ['Guitarra', 'Piano', 'Bateria', 'Microfone'], correctIndex: 3 },
    { id: 3, text: 'Água : Sede :: Comida : ?', options: ['Fome', 'Prato', 'Cozinha', 'Energia'], correctIndex: 0 },
    { id: 4, text: 'Calcule rapidamente: 47 + 38 = ?', options: ['75', '85', '95', '105'], correctIndex: 1 },
    { id: 5, text: 'ROMA escrito ao contrário é:', options: ['AMOR', 'MORA', 'RAMO', 'ARMO'], correctIndex: 0 },
    { id: 6, text: 'Complete: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctIndex: 1 },
    { id: 7, text: 'Médico : Hospital :: Professor : ?', options: ['Livro', 'Escola', 'Aluno', 'Aula'], correctIndex: 1 },
    { id: 8, text: 'Quantos minutos há em 3 horas e 45 minutos?', options: ['195', '215', '225', '245'], correctIndex: 2 },
    { id: 9, text: 'Se "▲" = 3 e "●" = 5, então ▲ + ● + ▲ = ?', options: ['11', '13', '15', '16'], correctIndex: 0 },
    { id: 10, text: 'Lembre: Os números eram 7, 3, 9, 1. Qual era o primeiro?', options: ['1', '3', '7', '9'], correctIndex: 2 },
    { id: 11, text: 'Encontre o intruso: Vermelho, Azul, Triângulo, Verde', options: ['Vermelho', 'Azul', 'Triângulo', 'Verde'], correctIndex: 2 },
    { id: 12, text: 'Se 5 máquinas fazem 5 widgets em 5 minutos, quanto tempo 100 máquinas levam para fazer 100 widgets?', options: ['1 minuto', '5 minutos', '20 minutos', '100 minutos'], correctIndex: 1 },
    { id: 13, text: 'Qual vem a seguir: J, F, M, A, M, J, ?', options: ['J', 'A', 'S', 'O'], correctIndex: 0 },
    { id: 14, text: 'Se CÓDIGO = 46, quanto é DADO?', options: ['18', '20', '22', '24'], correctIndex: 1 },
    { id: 15, text: 'Quantos quadrados há em um tabuleiro 3x3?', options: ['9', '10', '13', '14'], correctIndex: 3 },
  ],
  psych: [
    { id: 1, text: 'Nas últimas duas semanas, com que frequência você se sentiu animado(a)?', options: ['Quase todos os dias', 'Mais da metade dos dias', 'Alguns dias', 'Quase nunca'], correctIndex: 0 },
    { id: 2, text: 'Como está a qualidade do seu sono recentemente?', options: ['Durmo bem e acordo descansado', 'Razoável, às vezes acordo cansado', 'Irregular e insatisfatório', 'Muito ruim, insônia frequente'], correctIndex: 0 },
    { id: 3, text: 'Você consegue se concentrar em tarefas por longos períodos?', options: ['Sim, facilmente', 'Geralmente sim', 'Tenho alguma dificuldade', 'É muito difícil me concentrar'], correctIndex: 0 },
    { id: 4, text: 'Como está seu nível de energia diário?', options: ['Alto e constante', 'Bom na maioria dos dias', 'Oscila bastante', 'Frequentemente baixo'], correctIndex: 0 },
    { id: 5, text: 'Com que frequência você se sente sobrecarregado(a)?', options: ['Raramente', 'Às vezes', 'Frequentemente', 'Quase sempre'], correctIndex: 0 },
    { id: 6, text: 'Você consegue relaxar e desligar a mente?', options: ['Sim, facilmente', 'Com algum esforço', 'Com muita dificuldade', 'Quase nunca consigo'], correctIndex: 0 },
    { id: 7, text: 'Como está sua motivação para atividades que você gostava?', options: ['Ainda me motivam muito', 'Ainda me interessam', 'Menos interesse que antes', 'Perdi o interesse'], correctIndex: 0 },
    { id: 8, text: 'Você tem pensamentos negativos recorrentes?', options: ['Raramente ou nunca', 'Às vezes', 'Com frequência', 'Constantemente'], correctIndex: 0 },
    { id: 9, text: 'Como está seu apetite ultimamente?', options: ['Normal e saudável', 'Levemente alterado', 'Significativamente alterado', 'Muito diferente do normal'], correctIndex: 0 },
    { id: 10, text: 'Você se sente conectado(a) às pessoas ao seu redor?', options: ['Muito conectado', 'Razoavelmente', 'Às vezes isolado', 'Frequentemente solitário'], correctIndex: 0 },
    { id: 11, text: 'Com que frequência você sente ansiedade ou preocupação excessiva?', options: ['Raramente', 'Ocasionalmente', 'Frequentemente', 'Diariamente'], correctIndex: 0 },
    { id: 12, text: 'Como está sua autoconfiança atualmente?', options: ['Muito boa', 'Boa', 'Oscilante', 'Baixa'], correctIndex: 0 },
    { id: 13, text: 'Você consegue lidar com imprevistos sem grande estresse?', options: ['Sim, facilmente', 'Geralmente sim', 'Com dificuldade', 'Fico muito estressado'], correctIndex: 0 },
    { id: 14, text: 'Você sente que tem controle sobre sua vida?', options: ['Sim, totalmente', 'Na maior parte', 'Parcialmente', 'Pouco ou nenhum'], correctIndex: 0 },
  ],
};

export const testInfo: Record<string, { title: string; gradient: string; description: string }> = {
  iq: { 
    title: 'Teste de QI', 
    gradient: 'gradient-primary',
    description: 'Avalia raciocínio lógico, padrões e resolução de problemas'
  },
  eq: { 
    title: 'Inteligência Emocional', 
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
    description: 'Mede sua capacidade de entender e gerenciar emoções'
  },
  personality: { 
    title: 'Personalidade', 
    gradient: 'bg-gradient-to-br from-purple-500 to-violet-500',
    description: 'Descobre seus traços de personalidade dominantes'
  },
  vocational: { 
    title: 'Teste Vocacional', 
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    description: 'Identifica áreas profissionais alinhadas com você'
  },
  neuro: { 
    title: 'Neuroavaliação', 
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
    description: 'Testa memória, atenção e velocidade de processamento'
  },
  psych: { 
    title: 'Avaliação Psicológica', 
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    description: 'Avalia seu bem-estar mental e emocional atual'
  },
};
