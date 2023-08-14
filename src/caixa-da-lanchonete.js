class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        //Verificando se há itens no carrinho
        if(itens.length == 0){
            return "Não há itens no carrinho de compra!"
        }
        //Verificando se o método de pagamento confere
        if(metodoDePagamentoOk(metodoDePagamento) == false){
            return "Forma de pagamento inválida!"
        }
        //Cardápio
        const cardapio = ['cafe','chantily','suco','sanduiche','queijo','salgado','combo1','combo2']
        
        //Armazena todos os pedidos como objetos em um array
        const todosOsPedidos = []

        //Fazendo a conversão de string em objetos e verificando se o pedido existe
        for(let item of itens){
                const novoItem = item.split(',')

                const pedido = {
                    item: novoItem[0].toLowerCase(),
                    quantidade: parseInt(novoItem[1])
                }
                console.log(pedido)
                //Excutando funções de regra de negócio
                if(comidaEstaNoCardapio(cardapio,pedido.item) == true){
                    if(quantidadeOk(pedido.quantidade) == true){ 
                        todosOsPedidos.push(pedido)
                    }                 
                    else{ return "Quantidade inválida!" }
                }else{
                    return "Item inválido!"
                }
        }

        let total = 0

        //Verificando os pedidos extras
        for(let pedido of todosOsPedidos){
            if(pedido.item == 'chantily' || pedido.item == 'queijo'){
                if(principalDoExtraExiste(todosOsPedidos, pedido.item) == false){
                    return "Item extra não pode ser pedido sem o principal"
                }
            }
                       
            total += precoDoPedido(pedido.item) * pedido.quantidade 
        }

        total = totalComDescontoOuTaxa(metodoDePagamento,total)

        return formatarTotal(total)
    }

}

//FUNÇÕES DE VERIFICAÇÃO DE REGRAS DE NEGÓCIO
//Método de pagamento existe ?
function metodoDePagamentoOk(metodoDePagamento){
    if(metodoDePagamento != 'dinheiro' && metodoDePagamento != 'credito' && metodoDePagamento != 'debito'){
        return false
    }else{ return true }
}
//Pedido solicitado existe no cardápio do caixa?
function comidaEstaNoCardapio(cardapio,nomeDoPedido){
    return cardapio.includes(nomeDoPedido)
}
//A quantidade de pedidos é maior que 0 ?
function quantidadeOk(quantidade){
    return quantidade > 0
}

function principalDoExtraExiste(todosOsPedidos,extra){
    const nomeDosPedidos = []

    for(let pedido of todosOsPedidos){
        nomeDosPedidos.push(pedido.item)
    }

    if(extra == 'chantily'){
        return nomeDosPedidos.includes('cafe')            
    }else if(extra == 'queijo'){
        return nomeDosPedidos.includes('sanduiche')            
    }
}

function totalComDescontoOuTaxa(metodoDePagamento,total){
    if(metodoDePagamento == 'credito'){
        return total + (total * 0.03)
    }else if(metodoDePagamento == 'dinheiro'){
        return total - (total * 0.05)
    }else{
        return total
    }
}

function precoDoPedido(pedido){
    switch(pedido){
        case 'cafe': return 3.00
        case 'chantily': return 1.50
        case 'suco': return 6.20
        case 'sanduiche': return 6.50
        case 'queijo': return 2.00
        case 'salgado': return 7.25
        case 'combo1': return 9.50
        case 'combo2': return 7.50
    }
}

function formatarTotal(total){
    const totalFormatado = `${total.toFixed(2)}`.replace('.',',')

    return `R$ ${totalFormatado}`
}

//TESTE
const result = new CaixaDaLanchonete()
    console.log(result.calcularValorDaCompra('dinheiro',['cafe,1']))

//EXPORT
export { CaixaDaLanchonete };
