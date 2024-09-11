// Cria uma Importação de Objeto da pasta node_modules, e pega o "campo" SELECT (seleção)
const  { select, input, checkbox } = require('@inquirer/prompts') // Devolve um objeto

let mensagem = "Bem Vindo ao App de Metas!"

let meta = {
    value: '',
    checked: false 

}

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: "\nDigite a Meta: "})

    if (meta.length == 0){
        mensagem = "\nA meta não pode ser vazia\n"
        return
    }

    metas.push(
        {
        value: meta, checked: false
        }
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    if (metas.length == 0){
        mensagem = "\nNão há metas! \n"
    } else {
        const respostas = await checkbox({
            message: "\nSetas - Selecionar \nEspaço - Marcar/Desmarcar \nEnter - Confirmar \n\nMetas Existentes: " + metas.length + "\n",
            choices: [...metas],
            instructions: false
        })
    
        metas.forEach((m) => {
            m.checked = false
        })
    
        if (respostas.length == 0){
            mensagem = "\nNenhuma meta selecionada!\n"
            return
        }
    
        respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
                return m.value == resposta
            })
            meta.checked = true 
        }) 

        mensagem = "\nMeta(s) marcada(s) como concluída(s)!\n"
    }
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        mensagem = "\nNão existem metas realizadas :( \n"
        return
    }

    await select({
        message: "\nMetas Realizadas: " + realizadas.length + "\n",
        choices: [...realizadas],
        instructions: false
    })
} 
 
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        mensagem = "\nNão há metas abertas! :)\n"
        return
    }

    await select({
        message: "\nMetas abertas: " + abertas.length + "\n",
        choices: [...abertas],
        instructions: false
    })
}

const excluirMetas = async () => {
    if (metas.length == 0){
        mensagem = "\nNão há metas! \n"
    } else {
        const metasDesmarcadas = metas.map((meta) => {
            return { value: meta.value, checked: false }
        })
        
        const itensADeletar = await checkbox({
            message: "\nSelecione um item para excluir: \n",
            choices: [...metasDesmarcadas],
            instructions: false
        })
        
        if (itensADeletar.length == 0){
            mensagem = "\nNenhum item para excluir! \n"
            return
        }

        itensADeletar.forEach((item) => {
            metas = metas.filter((meta) => {
                return meta.value != item
            })
        })

        mensagem = "\nMeta(s) deletada(s) com sucesso!\n"
    }
}

const mostraMensagem = () => {
    
    console.clear()

    if (mensagem != ""){
        console.log(mensagem)
        mensagem = ""
    }
}

const start = async () => {
    
    while(true){
        mostraMensagem()
        // await -> aguardar
        const opcao = await select({
            // Estes atributos já são definidos
            message: "\nMenu: \n",
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
                    name: "Excluir Metas",
                    value: "excluir"
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
            case "excluir":
                await excluirMetas()
                break
            case "sair":
                console.log("\nAté a Próxima!\n");
                // Encerra o loop
                return
        }
    }
}

start()