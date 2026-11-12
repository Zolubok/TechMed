/* ===================== AUTO DIAGNÓSTICO ===================== */

// Perfis de sintomas de cada doença (usa o texto do atributo placeholder dos checkboxes)
const PERFIS_DOENCAS = {
    "Hipertensão":  ["Dor de Cabeça", "Tontura", "Falta de ar", "Fadiga", "Nausea", "Visao embacada", "Palpitacoes", "Dor no peito"],
    "Diabetes":     ["Fadiga", "Perda de peso repentina", "Fraqueza", "Tontura", "Perda apetite", "Sede excessiva", "Urinar com frequencia", "Visao embacada", "Formigamento"],
    "Obesidade":    ["Fadiga", "Falta de ar", "Inchaco", "Humor", "Insonia", "Dor", "Suor excessivo"],
    "Depressão":    ["Fadiga", "Insonia", "Perda apetite", "Humor", "Perda de peso repentina", "Fraqueza"],
    "Demência":     ["Confusão", "Alucinacao", "Humor", "Insonia", "Fraqueza"],
    "Asma":         ["Falta de ar", "Tosse", "Fadiga", "Dor no peito"],
    "Dengue":       ["Dor de Cabeça", "Dor", "Nausea", "Vomitos", "Fraqueza", "Fadiga", "Perda apetite", "Febre", "Dor muscular", "Dor nas articulacoes", "Manchas na pele", "Coceira"],
    "Influenza A":  ["Tosse", "Dor de Cabeça", "Dor", "Fadiga", "Fraqueza", "Perda apetite", "Febre", "Calafrios", "Dor muscular", "Dor de garganta", "Coriza"],
    "Esteatose":    ["Fadiga", "Nausea", "Dor", "Inchaco", "Perda apetite", "Fraqueza", "Dor abdominal"],

    // Novas doenças, ligadas aos sintomas adicionados
    "Resfriado":              ["Coriza", "Congestao nasal", "Espirros", "Dor de garganta", "Tosse", "Dor de Cabeça"],
    "Rinite alérgica":        ["Espirros", "Coriza", "Congestao nasal", "Coceira", "Dor de Cabeça"],
    "Faringite":              ["Dor de garganta", "Febre", "Dor de Cabeça", "Dor de ouvido", "Fadiga"],
    "Gastroenterite":         ["Diarreia", "Vomitos", "Nausea", "Dor abdominal", "Febre", "Fraqueza"],
    "Refluxo gastroesofágico":["Azia", "Dor no peito", "Nausea", "Tosse", "Dor abdominal"],
    "Constipação intestinal": ["Constipacao", "Dor abdominal", "Inchaco", "Nausea"],
    "Infecção urinária":      ["Urinar com frequencia", "Dor abdominal", "Febre", "Calafrios", "Fadiga"],
    "Ansiedade":              ["Ansiedade", "Palpitacoes", "Suor excessivo", "Insonia", "Tontura", "Formigamento", "Falta de ar"],
    "Otite":                  ["Dor de ouvido", "Febre", "Dor de Cabeça", "Tontura"],
    "Anemia":                 ["Fadiga", "Fraqueza", "Tontura", "Dor de Cabeça", "Falta de ar", "Palpitacoes"]
};

// Coleta os sintomas marcados nas caixas de seleção
function coletarSintomas() {
    const marcados = document.querySelectorAll(".sintomas .caixa-selecao:checked");
    return Array.from(marcados).map(caixa => caixa.getAttribute("placeholder"));
}

// Retorna a doença mais provável com base nos sintomas marcados
function diagnosticar() {
    const sintomas = coletarSintomas();

    if (sintomas.length === 0) {
        return "Selecione pelo menos um sintoma.";
    }

    let melhorDoenca = null;
    let melhorPontuacao = 0;

    for (const [doenca, perfil] of Object.entries(PERFIS_DOENCAS)) {
        const acertos = sintomas.filter(s => perfil.includes(s)).length;
        // Normaliza pelo tamanho do perfil para não favorecer doenças com muitos sintomas
        const pontuacao = acertos / perfil.length;

        if (pontuacao > melhorPontuacao) {
            melhorPontuacao = pontuacao;
            melhorDoenca = doenca;
        }
    }

    return melhorDoenca || "Não foi possível identificar uma doença com esses sintomas.";
}

/* ========================= REMÉDIOS ========================= */

// Breves descrições de medicamentos (apenas para fins educacionais)
const REMEDIOS = {
    "dipirona": "Analgésico e antitérmico, usado para aliviar dor e baixar febre.",
    "paracetamol": "Analgésico e antitérmico, usado para dores leves a moderadas e febre.",
    "ibuprofeno": "Anti-inflamatório não esteroide, usado para dor, inflamação e febre.",
    "aspirina": "Analgésico, antitérmico e anti-inflamatório que também age como antiagregante plaquetário.",
    "amoxicilina": "Antibiótico da família das penicilinas, usado em infecções bacterianas.",
    "azitromicina": "Antibiótico macrolídeo, usado em infecções bacterianas, como as respiratórias.",
    "omeprazol": "Reduz a produção de ácido no estômago, usado em gastrite, refluxo e úlceras.",
    "losartana": "Anti-hipertensivo, usado para controlar a pressão alta.",
    "enalapril": "Anti-hipertensivo, usado para pressão alta e problemas cardíacos.",
    "atenolol": "Betabloqueador, usado para pressão alta e arritmias.",
    "metformina": "Antidiabético oral, usado para controlar a glicose no diabetes tipo 2.",
    "insulina": "Hormônio usado para controlar a glicose no sangue no diabetes.",
    "sinvastatina": "Reduz o colesterol no sangue.",
    "fluoxetina": "Antidepressivo, usado no tratamento de depressão e transtornos de ansiedade.",
    "sertralina": "Antidepressivo, usado em depressão, ansiedade e outros transtornos.",
    "donepezila": "Usado para retardar sintomas da demência na doença de Alzheimer.",
    "salbutamol": "Broncodilatador de ação rápida, usado para aliviar crises de asma.",
    "budesonida": "Corticoide inalatório, usado na prevenção de crises de asma.",
    "oseltamivir": "Antiviral usado no tratamento da gripe causada pelo vírus influenza.",
    "loratadina": "Anti-histamínico, usado em alergias como rinite e urticária.",
    "dexclorfeniramina": "Anti-histamínico, usado em alergias e coceira.",
    "buscopan": "Antiespasmódico, usado para cólicas e dores abdominais.",
    "dramin": "Antiemético, usado para náuseas, vômitos e enjoo de movimento.",
    "tramadol": "Analgésico opioide, usado para aliviar dores moderadas a intensas.",
    "codeina": "Analgésico opioide, usado no tratamento de dores e, em algumas formulações, da tosse.",
    "naproxeno": "Anti-inflamatório não esteroide, usado para aliviar dores e inflamações.",
    "nimesulida": "Anti-inflamatório não esteroide, usado para tratar dores e inflamações.",
    "cetoprofeno": "Anti-inflamatório não esteroide, usado para aliviar dores e inflamações.",
    "diclofenaco": "Anti-inflamatório não esteroide, usado para dores musculares, articulares e inflamações.",
    "meloxicam": "Anti-inflamatório não esteroide, usado principalmente em dores e inflamações articulares.",
    "ciclobenzaprina": "Relaxante muscular, usado para aliviar espasmos e dores musculares.",

    // Antibióticos
    "cefalexina": "Antibiótico da família das cefalosporinas, usado em diversas infecções bacterianas.",
    "ciprofloxacino": "Antibiótico da família das quinolonas, usado em determinadas infecções bacterianas.",
    "levofloxacino": "Antibiótico da família das quinolonas, usado em algumas infecções respiratórias e urinárias.",
    "sulfametoxazol": "Antibiótico associado à trimetoprima, usado em determinadas infecções bacterianas.",
    "clavulin": "Antibiótico que combina amoxicilina e ácido clavulânico, usado em infecções bacterianas.",
    "metronidazol": "Antibiótico e antiparasitário, usado contra determinadas bactérias e protozoários.",

    // Problemas gástricos e digestivos
    "pantoprazol": "Reduz a produção de ácido no estômago, usado em refluxo, gastrite e úlceras.",
    "esomeprazol": "Reduz a acidez do estômago, usado no tratamento de refluxo e úlceras.",
    "domperidona": "Medicamento usado para aliviar náuseas, vômitos e desconfortos relacionados ao esvaziamento gástrico.",
    "metoclopramida": "Antiemético usado para tratar náuseas e vômitos.",
    "ondansetrona": "Antiemético usado para prevenir e tratar náuseas e vômitos.",
    "simeticona": "Usada para aliviar gases intestinais e desconforto abdominal.",
    "lactulose": "Laxante usado para tratar prisão de ventre.",
    "bisacodil": "Laxante estimulante usado para aliviar a constipação intestinal.",
    "hidroxido de aluminio": "Antiácido usado para aliviar azia e acidez estomacal.",

    // Anti-hipertensivos e cardiovasculares
    "anlodipino": "Anti-hipertensivo bloqueador dos canais de cálcio, usado para controlar a pressão alta.",
    "valsartana": "Anti-hipertensivo usado no tratamento da pressão alta e de algumas doenças cardíacas.",
    "captopril": "Anti-hipertensivo usado para controlar a pressão alta e tratar problemas cardíacos.",
    "hidroclorotiazida": "Diurético usado para controlar a pressão alta e reduzir a retenção de líquidos.",
    "furosemida": "Diurético usado para eliminar o excesso de líquidos do organismo.",
    "propranolol": "Betabloqueador usado para tratar pressão alta, tremores, arritmias e enxaqueca.",
    "carvedilol": "Betabloqueador usado no tratamento da hipertensão e insuficiência cardíaca.",
    "espironolactona": "Diurético poupador de potássio, usado em hipertensão e retenção de líquidos.",
    "rosuvastatina": "Medicamento usado para reduzir o colesterol e prevenir doenças cardiovasculares.",
    "atorvastatina": "Reduz os níveis de colesterol e triglicerídeos no sangue.",

    // Diabetes
    "glibenclamida": "Antidiabético oral usado para ajudar a controlar a glicose no diabetes tipo 2.",
    "gliclazida": "Antidiabético oral que estimula a produção de insulina no diabetes tipo 2.",
    "dapagliflozina": "Antidiabético que ajuda a eliminar glicose pela urina e também pode beneficiar o coração e os rins.",
    "empagliflozina": "Medicamento usado no diabetes tipo 2, com benefícios cardiovasculares e renais.",
    "liraglutida": "Medicamento injetável usado no controle do diabetes tipo 2 e, em formulações específicas, do peso.",

    // Antialérgicos
    "cetirizina": "Anti-histamínico usado para aliviar sintomas de alergias, rinite e urticária.",
    "desloratadina": "Anti-histamínico usado para tratar rinite alérgica e urticária.",
    "fexofenadina": "Anti-histamínico usado para aliviar espirros, coceira e outros sintomas alérgicos.",
    "hidroxizina": "Anti-histamínico usado para tratar coceiras e algumas reações alérgicas.",

    // Corticoides
    "prednisona": "Corticoide usado para reduzir inflamações e tratar doenças alérgicas e autoimunes.",
    "prednisolona": "Corticoide usado no tratamento de inflamações e reações alérgicas.",
    "dexametasona": "Corticoide com ação anti-inflamatória e antialérgica.",
    "betametasona": "Corticoide usado para tratar inflamações e determinadas doenças de pele.",
    "hidrocortisona": "Corticoide usado para tratar inflamações e reações alérgicas.",

    // Saúde respiratória
    "formoterol": "Broncodilatador de longa duração, usado no controle de doenças respiratórias.",
    "beclometasona": "Corticoide inalatório usado para prevenir e controlar sintomas da asma.",
    "montelucaste": "Medicamento usado para prevenir sintomas de asma e aliviar rinite alérgica.",
    "acetilcisteina": "Mucolítico usado para fluidificar o muco e facilitar sua eliminação.",
    "ambroxol": "Expectorante usado para facilitar a eliminação de secreções respiratórias.",
    "bromexina": "Mucolítico usado para ajudar a eliminar o catarro.",

    // Saúde mental e neurologia
    "escitalopram": "Antidepressivo usado no tratamento da depressão e de transtornos de ansiedade.",
    "citalopram": "Antidepressivo usado para tratar depressão e alguns transtornos de ansiedade.",
    "venlafaxina": "Antidepressivo usado no tratamento da depressão e de transtornos de ansiedade.",
    "duloxetina": "Antidepressivo usado para depressão, ansiedade e determinados tipos de dor crônica.",
    "amitriptilina": "Antidepressivo também utilizado no tratamento de dores crônicas e prevenção de enxaquecas.",
    "clonazepam": "Benzodiazepínico usado no tratamento de determinados transtornos convulsivos e de ansiedade.",
    "diazepam": "Benzodiazepínico usado para tratar ansiedade, espasmos musculares e convulsões.",
    "alprazolam": "Benzodiazepínico usado no tratamento de transtornos de ansiedade e pânico.",
    "quetiapina": "Antipsicótico usado no tratamento de esquizofrenia e transtorno bipolar.",
    "risperidona": "Antipsicótico usado no tratamento de esquizofrenia e outros transtornos psiquiátricos.",
    "carbonato de litio": "Estabilizador de humor utilizado principalmente no tratamento do transtorno bipolar.",

    // Saúde feminina e hormonal
    "levotiroxina": "Hormônio tireoidiano sintético usado no tratamento do hipotireoidismo.",
    "estradiol": "Hormônio estrogênio utilizado em tratamentos de reposição hormonal.",
    "progesterona": "Hormônio utilizado em tratamentos hormonais e em determinadas condições ginecológicas.",
    "etinilestradiol": "Hormônio estrogênio presente em diversas formulações de anticoncepcionais.",
    "levonorgestrel": "Progestagênio utilizado em anticoncepcionais e na contracepção de emergência.",

    // Antiparasitários e antifúngicos
    "ivermectina": "Antiparasitário usado no tratamento de determinadas infecções por parasitas.",
    "albendazol": "Antiparasitário usado no tratamento de verminoses.",
    "mebendazol": "Antiparasitário utilizado contra diferentes tipos de vermes intestinais.",
    "fluconazol": "Antifúngico usado no tratamento de infecções causadas por fungos.",
    "cetoconazol": "Antifúngico usado para tratar determinadas infecções fúngicas.",
    "nistatina": "Antifúngico usado principalmente no tratamento de candidíase.",

    // Vitaminas e suplementos
    "vitamina d": "Vitamina importante para a absorção de cálcio e manutenção da saúde óssea.",
    "vitamina b12": "Vitamina essencial para a formação das células sanguíneas e o funcionamento do sistema nervoso.",
    "acido folico": "Vitamina B9 importante para a formação das células e o desenvolvimento fetal.",
    "sulfato ferroso": "Suplemento de ferro usado para prevenir e tratar anemia por deficiência de ferro.",
    "carbonato de calcio": "Suplemento de cálcio utilizado para complementar a ingestão desse mineral.",
    "polivitaminico": "Suplemento que reúne diferentes vitaminas e minerais.",
};

// Remove acentos, espaços extras e deixa tudo em minúsculas
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Lê o remédio digitado na caixa de texto e retorna uma breve descrição
function consultarRemedio() {
    const campo = document.getElementById("meuInput");
    const nome = normalizar(campo.value);

    if (nome === "") {
        return "Digite o nome de um remédio.";
    }

    if (REMEDIOS[nome]) {
        return REMEDIOS[nome] + " Consulte sempre um médico ou farmacêutico antes de usar.";
    }

    return "Remédio não encontrado em nossa base. Consulte um médico ou farmacêutico.";
}