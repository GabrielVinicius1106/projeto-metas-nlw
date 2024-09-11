// Cria uma Importação de Objeto da pasta node_modules, e pega o "campo" SELECT (seleção)
const  { select } = require('@inquirer/prompts') // Devolve um objeto

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
                console.log("Vamos cadastrar!");
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