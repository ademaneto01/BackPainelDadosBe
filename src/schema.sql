CREATE DATABASE DBPainelDadosBe;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE if exists usuarios;

CREATE TABLE usuarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    escola VARCHAR(100) NOT NULL,
    perfil VARCHAR(100) NOT NULL
);

DROP TABLE if exists painel_dados;

CREATE TABLE painel_dados (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url_dados TEXT,
    time_stamp TEXT,
    id_usuario UUID REFERENCES usuarios(id)
);





