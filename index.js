// Cria uma Importação de Objeto da pasta node_modules, e pega o "campo" SELECT (seleção)
const  { select, input, checkbox } = require('@inquirer/prompts') // Devolve um objeto

let meta = {
    value: '',
    checked: false 

}

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a Meta: " })

    if (meta.length == 0){
        console.log("A meta não pode ser vazia");
        return
    }

    metas.push(
        {
        value: meta, checked: false
    }
    )

}

const listarMetas = async () => {
    if (metas.length == 0){
        console.log("Não há metas! \n");
    } else {
        const respostas = await checkbox({
            message: "Use as setas para mudar de meta, espaço para marcar ou desmarcar e enter para finalizar etapa",
            choices: [...metas],
            instructions: false
        })
    
        metas.forEach((m) => {
            m.checked = false
        })
    
        if (respostas.length == 0){
            console.log("Nenhuma meta selecionada!");
            return
        }
    
        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })
            meta.checked = true 
        }) 
    }

    console.log("Meta(s) marcada(s) como concluída(s)!");
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        console.log("Não existem metas realizadas :(");
        return
    }

    await select({
        message: "Metas Realizadas:",
        choices: [...realizadas]
    })
    //console.log(realizadas)
} 
 
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        console.log("Não há metas abertas! :)");
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {
    
    while(true){

        // await -> aguardar
        const opcao = await select({
            // Estes atributos já são definidos
            message: "Menu: \n",
            choices: [
                {
                    name: "Cadastrar Metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }

            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas);
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log("Até a Próxima!");
                // Encerra o loop
                return
        }
    }
}

start()