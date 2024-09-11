// Cria uma Importação de Objeto da pasta node_modules, e pega o "campo" SELECT (seleção)
const  { select, input } = require('@inquirer/prompts') // Devolve um objeto

 let meta = {
    value: 'Beber 3L de Água',
    checked: false

}

let metas = [ meta ]

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
                    name: "Sair",
                    value: "sair"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                }

            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas);
                break
            case "listar":
                console.log("Vamos listar!");
                break
            case "sair":
                console.log("Até a Próxima!");
                // Encerra o loop
                return
        }
    }
}

start()