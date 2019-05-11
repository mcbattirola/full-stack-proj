# Full stack project - Ekki

Para rodar o projeto, é necessário:
mongodb instalado e rodando em localhost:27017 (ou modifique o arquivo config/development.json para a sua porta) e NPM.
Também é necessário a porta 5000 liberada para o servidor e a 3000 para o server do client (via webpack).

Então:
> npm install

> npm run dev

Após isso, você já pode entrar no localhost:3000 pelo browser


# Sobre as features

Servidor:
- O backend está desenvolvido, salvando dados, criptografando senhas, com todos os endpoints que a aplicação necessida. 

- Algumas regras de negócio e integração entre objetos ainda não são garantidas pelo servidor.

Front end:

- Login e cadastro de usuário funcionando. Crud de transferência entre contas, criação de cartão de crédito e de usuário implementados.

- O número das contas são criados pelo servidor a partir do zero (para o primeiro usuário registrado).


# TODO LIST

● Recuperação de senha.

● Garantir certas regras de negócio no servidor.

● Caso o valor da transferência seja maior que o saldo atual da conta, sinalizar o
usuário que irá ser utilizado o cartão de crédito para completar a transação, caso
não tenha cartão cadastrado, dar a opção de cadastro de um novo.

● Transferências acima de $1000, usuário precisa colocar a senha (O servidor garante, mas a aplicação não pede para o usuário a senha ainda).

● Refazer o design do app?

# Importante: Registro de usuários

###O REGISTRO DE USUÁRIO PELA TELA DO APP FOI IMPLEMENTADO.

Caso necessário criar um usuário pela APi, é possível mandar um POST para http://localhost:3000/api/users/ com o seguinte body:
		"email":"tony@gmail.com",
		"kt":"46578798",
		"name":"tony stark",
		"password": "1234"
		
**kt?** Ekki é um banco islandês, não utiliza cpf

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
	

Cartão de crédito
- GET /api/users/self/creditCards
Retorna a lista de cartões de crédito do usuário.

- GET /api/users/self/creditCards/cc_id
Retorna informações mais detalhadas sobre o cartão do usuário.

- POST/api/users/self/creditCards
Cria um cartão de crédito. Exemplo de body:

	"number": "12345678"



