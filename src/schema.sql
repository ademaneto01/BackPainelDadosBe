CREATE DATABASE DBPainelDadosBe;

DROP TABLE if exists usuarios;

CREATE TABLE usuarios (
	id serial primary key,
 	nome varchar(100) NOT NULL,
  	email varchar(100) NOT NULL UNIQUE,
  	senha varchar(100) NOT NULL,
    perfil varchar(100) NOT NULL
);

DROP TABLE if exists painel_dados;

CREATE TABLE painel_dados (
    id serial primary key,
    url_dados varchar(100),
    time_stamp varchar(100),
    id_usuario integer REFERENCES usuarios(id)
);





