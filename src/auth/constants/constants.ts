export const jwtConstants = { //armazena a chave de assinatura do Token JWT
    secret: '37eb3d74e44561d2b9ec3e40da179f9e91571b7f350aee31cfee06b481f146fe', //chave encriptada aleatória - algoritmo de Criptografia AES.
};

// secret ->  utilizar na Classe JwtStrategy -> validar o Token enviado no Cabeçalho das Requisições enviadas para os endpoints protegidos da aplicação e -> assinar os Tokens JWT gerados pelo Método sign() da Classe JwtService, que será injetada na Classe AuthService, para criar o Token JWT após a autenticação (login) do usuário. 