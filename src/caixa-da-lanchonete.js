class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if ((itens.length == 0) || (itens == false))
            return "Não há itens no carrinho de compra!"

        let preco = 0; //Preço inicial da compra é zero

        const cardapio = {    //Tabela de codigos e precos
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
            };

        let cafePrincipal = false;  //Não tem café, sanduiche, chantily ou queijo inicialmente
        let sanduichePrincipal = false;
        let chantilyExtra = false;
        let queijoExtra = false;

        for (let item of itens){
            const codQuantia = item.split(",");
            let codigo = codQuantia[0];
            let quantia = codQuantia[1];

            if (!cardapio[codigo])
                return "Item inválido!";
            if (quantia <= 0)
                return "Quantidade inválida!"

            if (codigo == "cafe")
                cafePrincipal = true;
            if (codigo == "sanduiche")
                sanduichePrincipal = true;
            if (codigo == "chantily")
                chantilyExtra = true;
            if (codigo == "queijo")
                queijoExtra = true;

            preco = preco + cardapio[codigo] * quantia;
        }

        if (chantilyExtra && !cafePrincipal)
            return "Item extra não pode ser pedido sem o principal";
        if (queijoExtra && !sanduichePrincipal)
            return "Item extra não pode ser pedido sem o principal";

        if (metodoDePagamento == "dinheiro")
            preco = preco * 0.95;
        else if (metodoDePagamento == "credito")
            preco = preco * 1.03;
        else if (metodoDePagamento != "debito")
            return "Forma de pagamento inválida!";

        let precoFinal = "R$ " + preco.toFixed(2);  //Funcao nem sempre arredonda corretamente (?)
                                                    //Nesse codigo 7.725 virou 7.73
                                                    //Em outro codigo virou 7.72
        precoFinal = precoFinal.replace('.', ',');
        return precoFinal;
    }

}

export { CaixaDaLanchonete };
