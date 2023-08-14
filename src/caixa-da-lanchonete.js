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
        
        //Armazena todos os pedidos como objetos
        const todosOsPedidos = []

        //Fazendo a conversão de string em objetos e verificando se o pedido existe
        for(let item of itens){
                const novoItem = item.split(',')
                //separando produto da quantidade e passando para objeto
                const pedido = {
                    item: novoItem[0].toLowerCase(),
                    quantidade: parseInt(novoItem[1])
                }
                //Verificando existência do item e quantidade válida
                if(comidaEstaNoCardapio(cardapio,pedido.item) == true){
                    if(quantidadeOk(pedido.quantidade) == true){ 
                        todosOsPedidos.push(pedido)
                    }                 
                    else{ return "Quantidade inválida!" }
                }else{
                    return "Item inválido!"
                }
        }
        //Total de todos os pedidos
        let total = 0
        //Verificando os pedidos extras
        for(let pedido of todosOsPedidos){
            if(pedido.item == 'chantily' || pedido.item == 'queijo'){
                //Verificando se os respectivos itens principais dos extras foram pedidos
                if(principalDoExtraExiste(todosOsPedidos, pedido.item) == false){
                    return "Item extra não pode ser pedido sem o principal"
                }

            }
            //Armazenando valor dos pedidos no total            
            total += precoDoPedido(pedido.item) * pedido.quantidade 
        }
        //Aplicando desconto ou taxa
        total = totalComDescontoOuTaxa(metodoDePagamento,total)
        //Valor final como string formatada
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
//Quantidade solicitada é válida?
function quantidadeOk(quantidade){
    return quantidade > 0
}
//Verificando se dentro dos pedidos existe o principal do extra
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
//Calculando o desconto ou taxa e aplicando no total
function totalComDescontoOuTaxa(metodoDePagamento,total){
    if(metodoDePagamento == 'credito'){
        return total + (total * 0.03)
    }else if(metodoDePagamento == 'dinheiro'){
        return total - (total * 0.05)
    }else{
        return total
    }
}
//Retorna o valor do item com base em seu codigo
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
//Passando o resultado Float em uma String com formato "R$ 00,00"
function formatarTotal(total){
    const totalFormatado = `${total.toFixed(2)}`.replace('.',',')

    return `R$ ${totalFormatado}`
}

//TESTE PESSOAL.
const result = new CaixaDaLanchonete()
    console.log(result.calcularValorDaCompra('dinheiro',['cafe,10','chantily,20']))

//EXPORT
export { CaixaDaLanchonete };
