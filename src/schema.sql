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

//////////////////////////////////////////////////////////////////////////////////////////////////////

-- Sugestão para cadastro de professores
drop table if exists pedagogico.professores;
create table pedagogico.professores (
    id UUID default uuid_generate_v4() primary key,
    id_ee UUID references EntidadesEscolares(id),
    nome varchar(100),
    ativo boolean default true,
    especialista boolean default false,
    email_primario varchar(100),
    email_secundario varchar(100)
    criado_em timestamp default current_timestamp
 );

drop table if exists vinculo_profs;
create table vinculo_profs(
    id UUID default uuid_generate_v4() primary key,
    id_prof UUID references pedagogico.professores(id),
	id_escola UUID references EntidadesEscolares(id),
    /*Booleano para cada série escolar*/
)

drop table if exists usuarios;

create table usuarios (
    id UUID default uuid_generate_v4() primary key,
    nome VARCHAR(100) not null,
    email VARCHAR(100) not null unique,
    senha VARCHAR(100) not null,
-- que tal já criar essa vinculação aqui e permitir NULO (ou usar BE) para usuários escola?
	id_ee UUID references entidade_escolar(id),
    perfil VARCHAR(100) not null
);

drop table if exists usuarios_pdg;

create table usuarios_pdg (
    id UUID default uuid_generate_v4() primary key,
    id_usuario UUID references usuarios(id),
    id_ee UUID references entidades_escolares(id),
);

drop table if exists painel_dados;

create table painel_dados (
    id UUID default uuid_generate_v4() primary key,
    -- vincular o painel à escola
    id_ee UUID references entidade_escolar(id),
    url_dados text,
    time_stamp text,
);


-- Simboliza atual **contratos**
drop table if exists public.entidades_contratuais;
create table public.entidades_contratuais (
    id UUID default uuid_generate_v4() primary key,
    id_ec int,
    nome_simplificado varchar(100),
    razao_social varchar(100),
    cnpj_cont varchar(18),
    cep varchar(10),
    endereco varchar(200),
    cidade varchar(100),
    uf varchar(2),
    bairro varchar(100),
    complemento varchar(200) default null,
    ativo boolean default true,
    bo_rede boolean default false,
    QtdEscolas int,
    criado_em timestamp default current_timestamp
);

-- EntidadesEscolares
drop table if exists public.entidades_escolares;
create table public.entidades_escolares (
    id UUID default uuid_generate_v4() primary key,
    uuid_ec UUID references public.entidades_contratuais(id)
    id_ec int,
    nome_operacional varchar(100),
    cnpj_escola varchar(18),
    cep varchar(10),
    endereco varchar(200),
    cidade varchar(100),
    uf varchar(2),
    bairro varchar(100),
    complemento varchar(200),
    id_usuario_pdg references public.usuarios(id)
    ativo boolean default true,
)

-- Não existe atualmente, armazena informação global do contrato com a ent. contratual e se ele está ativo
drop table if exists relacionamento.infos_contrato;
create table relacionamento.infos_contrato (
	id UUID default uuid_generate_v4() primary key,
	uuid_ec UUID references public.entidades_contratuais(id),
	ano_assinatura int,
	ano_operacao int,
	ano_termino int,
	ativo boolean default true,
	resp_frete varchar(100),
	pedido_min int,
	reajuste_igpm_ipca boolean
);


-- AuxiliarDocContratos : Armazena documentos referentes ao contrato com a escola (apenas usuário ADM)
drop table if exists relacionamento.docs_contrato;
create table relacionamento.docs_contrato (
    id UUID default uuid_generate_v4() primary key,
	id_contrato UUID references infos_contratos(id),
    doc text
)

-- sem mudanças
DROP TABLE if exists AuxiliarDocEscolas;
CREATE TABLE AuxiliarDocEscolas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_escola UUID REFERENCES EntidadesEscolares(id),
    doc TEXT
 );


