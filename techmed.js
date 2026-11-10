/* ===================== AUTO DIAGNÓSTICO ===================== */

// Perfis de sintomas de cada doença (usa o texto do atributo placeholder dos checkboxes)
const PERFIS_DOENCAS = {
    "Hipertensão":  ["Dor de Cabeça", "Tontura", "Falta de ar", "Fadiga", "Nausea"],
    "Diabetes":     ["Fadiga", "Perda de peso repentina", "Fraqueza", "Tontura", "Perda apetite"],
    "Obesidade":    ["Fadiga", "Falta de ar", "Inchaco", "Humor", "Insonia", "Dor"],
    "Depressão":    ["Fadiga", "Insonia", "Perda apetite", "Humor", "Perda de peso repentina", "Fraqueza"],
    "Demência":     ["Confusão", "Alucinacao", "Humor", "Insonia", "Fraqueza"],
    "Asma":         ["Falta de ar", "Tosse", "Fadiga"],
    "Dengue":       ["Dor de Cabeça", "Dor", "Nausea", "Vomitos", "Fraqueza", "Fadiga", "Perda apetite"],
    "Influenza A":  ["Tosse", "Dor de Cabeça", "Dor", "Fadiga", "Fraqueza", "Perda apetite"],
    "Esteatose":    ["Fadiga", "Nausea", "Dor", "Inchaco", "Perda apetite", "Fraqueza"]
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
    "dramin": "Antiemético, usado para náuseas, vômitos e enjoo de movimento."
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