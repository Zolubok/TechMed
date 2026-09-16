//let doencas = [hipertencao, diabetes, obesidade, depressao, demencia, asma, dengue, influenza_a, esteatose]
function coletar_respostas(n) {

    let campo = document.getElementById('meuInput');
    let resposta = campo.value;
    if (n==1) {
        let sintomas = resposta.split(";") ;  
        console.log(sintomas)
        for (i in sintomas) {
            if (i in hipertensao) {
                let hipertencao = hipertensao+1
            }
            if (i in pneumonia) {
                let gripe = gripe+1
            }
            if (i in cancer) {
                let gripe = gripe+1
            }
            if (i in AIDS) {
                let gripe = gripe+1
            }
            if (i in conjutivite) {
                let gripe = gripe+1
            }
            
            
        }
    }
    else if (n==2) {
        alert("seu remédio é: "+ resposta) ;
    }

}
