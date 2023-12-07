CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists entidades_contratuais;
create table entidades_contratuais (
    id UUID default uuid_generate_v4() primary key,
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
    criado_em timestamp default current_timestamp,
    deleted boolean default false
);

drop table if exists entidades_escolares;
create table entidades_escolares (
    id UUID default uuid_generate_v4() primary key,
    uuid_ec UUID references entidades_contratuais(id),
    nome_operacional varchar(100),
    cnpj_escola varchar(18),
    cep varchar(10),
    endereco varchar(200),
    cidade varchar(100),
    uf varchar(2),
    bairro varchar(100),
    complemento varchar(200),
    instagram varchar(50),
    facebook varchar(50),
    ativo boolean default true,
    deleted boolean default false
);

drop table if exists usuarios;
create table usuarios (
    id UUID default uuid_generate_v4() primary key,
    nome VARCHAR(100) not null,
    email VARCHAR(100) not null unique,
    senha VARCHAR(100) not null,
	id_ee UUID references entidades_escolares(id),
    perfil VARCHAR(100) not null
);

drop table if exists usuarios_pdg;
create table usuarios_pdg (
    id UUID default uuid_generate_v4() primary key,
    id_usuario UUID references usuarios(id),
    id_ee UUID references entidades_escolares(id)
);

drop table if exists painel_dados;
create table painel_dados (
    id UUID default uuid_generate_v4() primary key,
    id_ee UUID references entidades_escolares(id),
    url_dados text,
    criado_em timestamp default current_timestamp
);

drop table if exists infos_contrato;
create table infos_contrato (
	id UUID default uuid_generate_v4() primary key,
	uuid_ec UUID references entidades_contratuais(id),
	ano_assinatura varchar(10),
	ano_operacao varchar(10),
	ano_termino varchar(10),
	ativo boolean default true,
	resp_frete varchar(100),
	pedido_min int,
	reajuste_igpm_ipca boolean
);

drop table if exists docs_contrato;
create table docs_contrato (
	id UUID default uuid_generate_v4() primary key,
	uuid_ec UUID references entidades_contratuais(id),
	nome_doc varchar(200),
    url_doc varchar(200),
    criado_em timestamp default current_timestamp
);

drop table if exists docs_entidades_escolares;
create table docs_entidades_escolares (
	id UUID default uuid_generate_v4() primary key,
	id_ee UUID references entidades_escolares(id),
	nome_doc varchar(200),
    url_doc varchar(200),
    criado_em timestamp default current_timestamp
);

drop table if exists agentes_externos;
create table agentes_externos(
    uuid_agente UUID default uuid_generate_v4() primary key,
    nome varchar(100),
    cargo varchar(50),
    data_nascimento varchar(10),
    instagram varchar(50),
    linkedin varchar(50),
    interlocutor boolean default false,
    nu_telefone varchar(50),
    bo_ativo boolean default true,
    no_email_primario varchar(100),
    no_email_secundario varchar(100),
    criado_em timestamp default current_timestamp
 );

drop table if exists vinculos_agentes_externos;
create table vinculos_agentes_externos(
    id UUID default uuid_generate_v4() primary key,
    id_prof UUID references agentes_externos(uuid_agente),
	id_escola UUID references entidades_escolares(id),
    especialista boolean default false,
    bo_3EI boolean default false,
    bo_4EI boolean default false,
    bo_5EI boolean default false,
    bo_1AI boolean default false,
    bo_2AI boolean default false,
    bo_3AI boolean default false,
    bo_4AI boolean default false,
    bo_5AI boolean default false,
    bo_6Af boolean default false,
    bo_7AF boolean default false,
    bo_8AF boolean default false,
    bo_9AF boolean default false
);


create table turmas_alunados(
    id UUID default uuid_generate_v4() primary key,
	id_ee UUID references entidades_escolares(id),
    ano_ref varchar(10),
    "3EI" int,
    "4EI" int,
    "5EI" int,
    "1EF" int,
    "2EF" int,
    "3EF" int,
    "4EF" int,
    "5EF" int,
    "6EF" int,
    "7EF" int,
    "8EF" int,
    "9EF" int,
    "1EM" int,
    "2EM" int,
    "3EM" int
);

create table alunados(
    id UUID default uuid_generate_v4() primary key,
	id_ee UUID references entidades_escolares(id),
    ano_ref varchar(10),
    "3EI" int,
    "4EI" int,
    "5EI" int,
    "1EF" int,
    "2EF" int,
    "3EF" int,
    "4EF" int,
    "5EF" int,
    "6EF" int,
    "7EF" int,
    "8EF" int,
    "9EF" int,
    "1EM" int,
    "2EM" int,
    "3EM" int
);

create table acompanhamento_pdg(
  id UUID default uuid_generate_v4() primary key,
  id_ee UUID references entidades_escolares(id),
  id_prof UUID references agentes_externos(uuid_agente),
  id_user UUID references usuarios(id),
  dataofobservation varchar(10),
  grade varchar(5),
  ofstudents text,
  tema varchar(20),
  lessonplanbe text,
  cycle varchar(20),
  digitalprojector varchar(20),
  board varchar(20),
  englishcorner varchar(20),
  noiselevel varchar(20),
  resourceaudioqlty varchar(20),
  nglbematerials varchar(20),
  lp1lessonplan varchar(20),
  lp2proposedgoals varchar(20),
  lp3resourcesused varchar(20),
  lp4changes varchar(20),
  finalcoments text,
  finalized boolean,
  finalizedtimestamp timestamp,
  criado_em timestamp default current_timestamp
);

