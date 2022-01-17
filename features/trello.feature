
Feature: GET 1/members/me

    Como um usuário Trello API
    Realizar autenticação
    Para que tenha acesso as funcionalidades de usuário da API

    Scenario: Autenticação válida
        Given usuário possui dados de autenticação
        When os dados são informados
        Then retorna códico de status 200
        And a propriedade "<id>" é encontrada no "<body>"

    Scenario: Autenticação inválida
        Given usuário não possui dados de autenticação
        When os dados informados são inválidos ou inexistente
        Then retorna códico de status 401
        And retorna a mensagem "invalid key"


Feature: POST 1/cards

    Como um usuário com acesso ao Trello API
    Realizar criação de um novo card

    Scenario: Criar novo card em uma lista
        Given já possui o id da lista
        When atribui "NewCard" na propriedade "name"
        Then retorna códico de status 200
        And a propriedade "name" recebeu "NewCard"

    Scenario: Não criar card sem informar a lista
        Given usuário não possui o "id" da lista
        When tenta atribuir valor a propriedade "name"
        Then retorna códico de status 400
        And retorna a mensagem "invalid value for idList"



Feature: PUT 1/cards/

    Como um usuário com acesso ao Trello API
    Realizar edição de um card existente
    Para alterar valores de suas propriedades

    Scenario: Editar um card existente
        Given já possui "id" do card
        When atribui "EditCard" na propriedade "name"
        Then retorna códico de status 200
        And a propriedade "name" foi alterada para "EditCard"

    Scenario: Não é possível editar card sem informar o id
        Given usuário não possui o id do card
        When tenta alterar valor da propriedade "name"
        Then retorna códico de status 404
        And retorna a mensagem "invalid value for idList"


Feature: DELETE 1/cards/

    Como um usuário com acesso ao Trello API
    Realizar a exclusão de um card existente
    Para eliminar informações

    Scenario: Deletar um card existente
        Given já possui "id" do card
        When efetuar o delete do card
        Then retorna códico de status 200
        And verifica se o card ainda existe