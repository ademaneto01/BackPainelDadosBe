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

DROP TABLE if exists contratos;

CREATE TABLE contratos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome_simplificado TEXT,
    razao_social TEXT,
    cnpj TEXT,
    cep TEXT,
    endereco TEXT,
    cidade TEXT,
    uf TEXT,
    bairro TEXT,
    situacao TEXT,
    complemento TEXT,
    QtdEscolas INTEGER
);

DROP TABLE if exists EntidadesEscolares;

CREATE TABLE EntidadesEscolares (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    condicao TEXT,
    codigo_be TEXT,
    nome_contratual TEXT,
    tipo_rede TEXT, 
    nome_operacional TEXT,
    cnpj_escola TEXT,
    cep TEXT,
    endereco TEXT, 
    cidade TEXT, 
    uf TEXT,
    bairro TEXT,
    complemento TEXT,
    situacao TEXT,
    id_contrato UUID REFERENCES contratos(id)
);

DROP TABLE if exists AuxiliarUserEscolas;

CREATE TABLE AuxiliarUserEscolas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_usuario UUID REFERENCES usuarios(id),
    id_escola UUID REFERENCES EntidadesEscolares(id)
 );

DROP TABLE if exists AuxiliarDocContratos;

CREATE TABLE AuxiliarDocContratos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_contrato UUID REFERENCES contratos(id),
    doc TEXT
 );

DROP TABLE if exists AuxiliarDocEscolas;

CREATE TABLE AuxiliarDocEscolas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_escola UUID REFERENCES EntidadesEscolares(id),
    doc TEXT
 );





