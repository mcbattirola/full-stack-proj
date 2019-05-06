# Full stack project - Ekki

Para rodar o projeto, é necessário:
mongodb instalado e rodando em localhost:27017 (ou modifique o arquivo config/development.json para a sua porta) e NPM.


Então:
> npm install
> node app.js

Após isso, você já pode entrar no localhost:3000 pelo browser

### Estado atual da aplicação
Servidor:
- O backend está desenvolvido, salvando dados, criptografando senhas, com todos os endpoints que a aplicação necessida. 
- Algumas regras de negócio e integração entre objetos ainda não são garantidas pelo servidor.

Front end

- Apenas o login e a página inicial foram implementadas até o momento.

Para mais informações,  ver TODO LIST. 



# Importante: Registrar usuários

Ainda não foi implementado registro de usuários pela tela.
Por hora, é necessário mandar um POST para http://localhost:3000/api/users/ com o seguinte body:

		"email":"tony@gmail.com",
		"kt":"46578798",
		"name":"tony stark",
		"password": "1234"
**kt?** Ekki é um banco islandês, não iria usar CPF!
A senha fica criptografada no servidor.

Em caso de sucesso, a API vai retornar o objeto inserido, com algumas informações a mais, geradas pelo servidor.

**Com esse usuário, já é possível se logar na aplicação web e acessar a página principal do Ekki.**

## Autenticação
Agora que o usuário foi criado, é possível se autenticar.
Você deve enviar um POST para http://localhost:3000/api/auth/ contendo um JSON com email e password no body:

	"email":"mcbattirola@gmail.com",
	"password": "1234"

Caso os dados estejam corretos, a API retorna um jason web token no corpo da resposta.



# API endpoints

Os endpoints mencionados acima são acessáveis sem um token. 
Todos os listados abaixo necessitam que o token seja mandado no **cabeçalho** da requisição, com a chave **x-auth-token**.

**Self se refere ao usuário cujo token está sendo enviado no cabeçalho da requisição.**
User:
- GET /api/users
Retorna os usuários cadastrados no Ekki, sem informações sensíveis.

-  GET /api/users/self
Retorna dados do usuário. Traz mais informações, como o saldo atual.

- PUT /api/users/self
Recebe no corpo dados do usuário, não atualiza saldo.

- DELETE /api/users/self
Deleta o usuário.

Contatos
- GET /api/users/self/contacts
Retorna a lista de contatos salvos do usuário.

- GET /api/users/self/contacts/id_contato
Retorna informação mais detalhada do contato do usuário.

- POST /api/users/self/contacts/
Cria um contato do usuário. Exemplo de body:

	"email": "exemplo@gmail.com",
	"kt": "2242232",
	"name": "Bruce Wayne",
	"account": 445

Transferências
- GET /api/users/self/transfers
Retorna a lista de transações do usuário.

- GET /api/users/self/transfers/id_transferencia
Retorna a transferência com mais detalhes.

- POST/api/users/self/transfers
Inclui uma transferência. Exemplo de body:

	"email": "amigo@gmail.com",
	"kt": "111222333",
	"name": "Clark Kent",
	"account": 445,
	"amount": -500
**Obs:** Ainda não está fazendo verificações nem atualizando os valores como saldo das contas afetadas. Um montante negativo significa que foi enviado, positivo significa que o usuário recebeu a transação.

Cartão de crédito
- GET /api/users/self/creditCards
Retorna a lista de cartões de crédito do usuário.

- GET /api/users/self/creditCards/cc_id
Retorna informações mais detalhadas sobre o cartão do usuário.

- POST/api/users/self/creditCards
Cria um cartão de crédito. Exemplo de body:

	"number": "12345678"



# Aplicação Web

A aplicação web está apenas parcialmente implementada.
É possível fazer login com o usuário e ver o saldo atual.

# TODO LIST

● Menu de opções para todas as features.

● CRUD de cartão de crédito.

● CRUD de contatos/favorecidos.

● Transferência de dinheiro entre usuários.

● Histórico de transferências.

● Recuperação de senha.

●Garantir certas regras de negócio no servidor.

● Não expor o token de acesso do usuário na URL.
