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


-- Cleanup
drop table if exists relacionamento.contratos;
drop table if exists public.entidades_escolares;
drop table if exists public.entidades_contratuais;


-- Startup
create extension if not exists "uuid-ossp";

create schema if not exists relacionamento;
create schema if not exists pedagogico;
create schema if not exists comercial;
create schema if not exists financeiro;
create schema if not exists inovacao;

-- uuid on insert function
create or replace
function assign_uuid_on_insert()
returns trigger as $$
begin
    if NEW.id is null then
        NEW.id := uuid_generate_v4();
end if;

return new;
end;

$$ language plpgsql;


-- entidades contratuais

create table if not exists public.entidades_contratuais (
    id UUID primary key default uuid_generate_v4(),
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
    ative boolean default true,
    bo_rede boolean default false,
    created_at timestamp default current_timestamp
);

create trigger trigger_assign_uuid
before
insert
	on
	public.entidades_contratuais
for each row
execute function assign_uuid_on_insert();

-- fim de entidades contratuais

-- entidades escolares

create table if not exists public.entidades_escolares (
    id UUID primary key default uuid_generate_v4(),
    id_ec int,
    nome_operacional varchar(100),
    cnpj_escola varchar(18),
    cep varchar(10),
    endereco varchar(200),
    cidade varchar(100),
    uf varchar(2),
    bairro varchar(100),
    complemento varchar(200),
    ative boolean default true,
    entidades_contratuais UUID references public.entidades_contratuais(id)
);

create trigger trigger_assign_uuid
before
insert
	on
	public.entidades_escolares 
for each row
execute function assign_uuid_on_insert();


-- fim de unidades escolares

-- contratos

create table if not exists relacionamento.contratos (
	id UUID primary key default uuid_generate_v4(),
	entidades_contratuais UUID references public.entidades_contratuais(id),
	ano_assinatura int,
	ano_operacao int,
	ano_termino int,
	ativo boolean default true,
	resp_frete varchar(100),
	pedido_min int,
	reajuste_igpm_ipca boolean
);

create trigger trigger_assign_uuid
before
insert
	on
	relacionamento.contratos 
for each row
execute function assign_uuid_on_insert();

-- fim de contratos


-- ec/ee mapper

update
	public.entidades_escolares ee
set
	entidades_contratuais = ec.id
from
	public.entidades_contratuais ec
where
	ee.id_ec = ec.id_ec;




