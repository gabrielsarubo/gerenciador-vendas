// oficina2-spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// use npx cypress open para executar a suite de testes


describe('CT002 - Cadastrar uma loja', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/cadastrar');
    });
    //1->2->1
    it('email vazio', () => {
        cy.get(':nth-child(2) > .form-control')
            .type('password');

        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('createUserWithEmailAndPassword')

            return false
        })
        cy.get('.btn')
            .click()
        cy.get('span')
            .contains('Você não preencheu todos os campos')
            .should('be.visible');
    }),
        //1->2->3->1
        it('email já existe', () => {
            cy.get(':nth-child(1) > .form-control')
                .type('ladegis629@jobbrett.com')
                .get(':nth-child(2) > .form-control')
                .type('password')
                .get('.btn')
                .click()
                .get('span')
                .contains('Essa conta já existe')
                .should('be.visible');
        }),
        //1->2->3->4->1
        it('senha menor que 6 caracteres', () => {
            cy.get(':nth-child(1) > .form-control')
                .type('ladegis629@jobbrett.com')
                .get(':nth-child(2) > .form-control')
                .type('pass')
                .get('.btn')
                .click()
                .get('span')
                .contains('A senha deve ter pelo menos 6 caracteres')
                .should('be.visible');
        }),
        //1->2->3->4->5
        it('cadastro realizado com sucesso', () => {
            cy.get(':nth-child(1) > .form-control')
                .type('foobar3@mail.com') //mudar endereço a cada teste
                .get(':nth-child(2) > .form-control')
                .type('password')
                .get('.btn')
                .click()
                .get('span')
                .contains('Cadastro realizado com sucesso')
                .should('be.visible');
        })

}),

    describe('CT003 - Cadastrar um produto', () => {  //adicionar  uma nova classe de testes com o comando describe
        beforeEach(() => {
            cy.visit('localhost:3000/produto');        // navega para uma página antes de cada teste
        });
        //1->2->1
        it('nome de produto vazio', () => {           //adicionar teste com o comando it
            cy.get('.row > :nth-child(1) > .form-control') //captura o campo de preço(usando selector playground na interface do cypress)
                .type('{backspace}10.0')                   //preenche o campo Preço
                .get(':nth-child(2) > .form-control')    //captura o campo de estoque(disponivel por selector playground)
                .type('{backspace}5')                     //preenchendo o campo de estoque, apagando o primeiro zero na interface
                .get(':nth-child(3) > .form-control')      //captura o campo Descrição
                .type('teste1')                            //preenche o campo descrição
                .get('.btn')                               //capturando o botão de adicionar
                .click()                                   //clicando no botão
                .get('input:invalid')                      //procurando por mensagens de validação de campos(ex:"preencha este campo")
                .should('have.length', 1)                  //teste passa se encontrar um campo inválido (nome do produto nesse caso)
        }),

            //1->2->3->1
            it('valor inválido de preço', () => {
                cy.get('.w-50 > :nth-child(1) > .form-control')
                    .type('produto teste 2')
                    .get('.row > :nth-child(1) > .form-control')
                    .type('{backspace}-10.0')
                    .get(':nth-child(2) > .form-control')
                    .type('{backspace}5')
                    .get(':nth-child(3) > .form-control')
                    .type('teste2')
                    .get('.btn')
                    .click()
                    .get('input:invalid')
                    .should('have.length', 1)
            }),

            //1->2->3->4->1
            it('valor de estoque inválido', () => {
                cy.get('.w-50 > :nth-child(1) > .form-control')
                    .type('produto teste 3')
                    .get('.row > :nth-child(1) > .form-control')
                    .type('{backspace}10.0')
                    .get(':nth-child(2) > .form-control')
                    .type('{backspace}0.8')
                    .get(':nth-child(3) > .form-control')
                    .type('teste3')
                    .get('.btn')
                    .click()
                    .get('input:invalid')
                    .should('have.length', 1)
            }),
            //1->2->3->4->5
            it('produto cadastrado', () => {
                cy.get('.w-50 > :nth-child(1) > .form-control')
                    .type('produto teste 4')
                    .get('.row > :nth-child(1) > .form-control')
                    .type('{backspace}10.0')
                    .get(':nth-child(2) > .form-control')
                    .type('{backspace}5')
                    .get(':nth-child(3) > .form-control')
                    .type('teste4')
                    .get('.btn')
                    .click()
                    .get('span')
                    .should('be.visible')
            })
    })

//cy.get(':nth-child(1) > :nth-child(5) > .me-2 > .bi')
describe('CT004 - Atualizar um produto', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/home');
        cy.get(':nth-child(1) > :nth-child(5) > .me-2 > .bi')
            .click()
    });
    //1->2->1
    it('nome de produto vazio', () => {
        cy.get('.w-50 > :nth-child(1) > .form-control')
            .should('have.value', 'produto teste 4') //verifica se o campo nome possui valor, importante para esperar formulario carregar informações
            .clear() //limpa o campo
            .should('be.empty')
            .get('.row > :nth-child(1) > .form-control')
            .type('{selectall}{backspace}')
            .type('{backspace}10.0')
            .get(':nth-child(2) > .form-control')
            .type('{selectall}{backspace}')
            .type('{backspace}5')
            .get(':nth-child(3) > .form-control')
            .type('{selectall}{backspace}')
            .type('teste1')
            .get('.btn')
            .click()
            .get('input:invalid')
            .should('have.length', 1)
    }),

        //1->2->3->1
        it('valor inválido de preço', () => {
            cy.get('.w-50 > :nth-child(1) > .form-control')
                .should('have.value', 'produto teste 4')
                .type('{selectall}{backspace}')
                .type('produto teste 2')
                .get('.row > :nth-child(1) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}-10.0')
                .get(':nth-child(2) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}5')
                .get(':nth-child(3) > .form-control')
                .type('{selectall}{backspace}')
                .type('teste2')
                .get('.btn')
                .click()
                .get('input:invalid')
                .should('have.length', 1)
        }),

        //1->2->3->4->1
        it('valor de estoque inválido', () => {
            cy.get('.w-50 > :nth-child(1) > .form-control')
                .should('have.value', 'produto teste 4')
                .type('{selectall}{backspace}')
                .type('produto teste 3')
                .get('.row > :nth-child(1) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}10.0')
                .get(':nth-child(2) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}0.8')
                .get(':nth-child(3) > .form-control')
                .type('{selectall}{backspace}')
                .type('teste3')
                .get('.btn')
                .click()
                .get('input:invalid')
                .should('have.length', 1)
        }),
        //1->2->3->4->5
        it('produto cadastrado', () => {
            cy.get('.w-50 > :nth-child(1) > .form-control')
                .should('have.value', 'produto teste 4')
                .type('{selectall}{backspace}')
                .type('produto teste 4')
                .get('.row > :nth-child(1) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}10.0')
                .get(':nth-child(2) > .form-control')
                .type('{selectall}{backspace}')
                .type('{backspace}5')
                .get(':nth-child(3) > .form-control')
                .type('{selectall}{backspace}')
                .type('teste4')
                .get('.btn')
                .click()
                .get('span')
                .should('be.visible')
        })
}),

    //executar essa classe usando .only na frente deste describe e no describe do CT003 (só funciona se a lista estiver vazia após exclusão de item)
    describe('CT005 - excluir um produto', () => {
        //não há id para colocar para exclusão, logo a rota 1->2->1 e 1->2->3->1 não podem ser testadas
        //1->2->3->4
        it('excluir um produto', () => {
            cy.visit('localhost:3000/home')
                .get(':nth-child(1) > :nth-child(5) > span.text-secondary > .bi')
                .click();

            cy.contains('Ainda nada por aqui.')
                .should('be.visible')
        })

    }),

    //executar essa classe com a lista possuindo algum item de nome não repetido pelos outros testes
    describe('CT006 - Cadastrar uma venda', () => {
        beforeEach(() => {
            cy.visit('localhost:3000/home')
        })
        //1->2->1
        it('Valor maior que o estoque', () => {
            cy.get('select')
                .select('farinha')
                .get('#inputQuantity')
                .type('100')
                .get('.btn')
                .contains('Adicionar')
                .click()
                .get('input:invalid')
                .should('have.length', 1)
        })

        //1->2->3
        it('venda cadastrada', () => {
            cy.get('select')
                .select('farinha')
                .get('#inputQuantity')
                .type('{selectAll}1')
                .get('.btn')
                .contains('Adicionar')
                .click()
                .get('.btn')
                .contains('Finalizar Compra')
                .click()
            cy.contains('nada no carrinho')
                .should('be.visible')
        })

    })


describe.only('CT007 - Excluir uma venda', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/relatorio').get('tbody > :nth-child(1)')
            .click()
    })
    // Apenas esse caminho é possível
    //1->2->3->4->5->6
    it('Deleção correta', () => {
        cy
            .get('.btn-outline-danger')
            .click()

        cy.contains('Operação realizada com sucesso.')
            .should('be.visible')

    })


})




//executar essa classe com a lista possuindo algum item de nome não repetido pelos outros testes
describe('CT009 - Pesquisar Produto', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/home')
    })

    //não é possível digitar o nome do produto por tanto apenas a rota 1->2->3->4 pode ser testada
    //1->2->3->4
    it('Pesquisar produto', () => {
        cy.get('select')
            .select('farinha')
            .get('#inputEstoque')
            .should('have.value', '15')
            .get('#inputPrice')
            .should('have.value', '6')
    })

})