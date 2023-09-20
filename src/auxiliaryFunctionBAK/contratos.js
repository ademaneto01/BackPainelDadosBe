// const connection = require("../connection");

// // async function registrarEntidadeContratual(req, res) {
// //   const {
// //     nome_simplificado,
// //     razao_social,
// //     cnpj_cont,
// //     cep,
// //     endereco,
// //     cidade,
// //     uf,
// //     bairro,
// //     complemento,
// //     bo_rede,
// //     ativo,
// //   } = req.body;

// //   if (
// //     !nome_simplificado ||
// //     !razao_social ||
// //     !cnpj_cont ||
// //     !cep ||
// //     !endereco ||
// //     !cidade ||
// //     !uf ||
// //     !bairro ||
// //     !complemento
// //   ) {
// //     return res
// //       .status(400)
// //       .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
// //   }

// //   try {
// //     const deleted = false;
// //     const qtdEscolas = 0;
// //     const query =
// //       "INSERT INTO entidades_contratuais (nome_simplificado,razao_social,cnpj_cont,cep,endereco,cidade,uf,bairro,complemento, ativo, bo_rede, deleted, qtdescolas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";
// //     const {
// //       rows: [registredContract],
// //     } = await connection.query(query, [
// //       nome_simplificado,
// //       razao_social,
// //       cnpj_cont,
// //       cep,
// //       endereco,
// //       cidade,
// //       uf,
// //       bairro,
// //       complemento,
// //       ativo,
// //       bo_rede,
// //       deleted,
// //       qtdEscolas,
// //     ]);

// //     if (!registredContract) {
// //       return res
// //         .status(400)
// //         .json({ mensagem: "Não foi possivel cadastrar o contrato." });
// //     }

// //     return res.status(201).json(registredContract);
// //   } catch (error) {
// //     return res.status(400).json(error.message);
// //   }
// // }

// // async function editarEntidadeContratual(req, res) {
// //   const {
// //     id,
// //     nome_simplificado,
// //     razao_social,
// //     cnpj_cont,
// //     cep,
// //     endereco,
// //     cidade,
// //     uf,
// //     bairro,
// //     complemento,
// //     ativo,
// //     bo_rede,
// //   } = req.body;

// //   if (
// //     !nome_simplificado ||
// //     !razao_social ||
// //     !cnpj_cont ||
// //     !cep ||
// //     !endereco ||
// //     !cidade ||
// //     !uf ||
// //     !bairro ||
// //     !complemento
// //   ) {
// //     return res
// //       .status(400)
// //       .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
// //   }

// //   try {
// //     const updateDados =
// //       "UPDATE entidades_contratuais SET nome_simplificado = $1, razao_social = $2, cnpj_cont = $3, cep = $4, endereco = $5, cidade = $6, uf = $7, bairro = $8, complemento = $9, ativo = $10, bo_rede = $11 WHERE id = $12 RETURNING *";
// //     const { rows, rowCount } = await connection.query(updateDados, [
// //       nome_simplificado,
// //       razao_social,
// //       cnpj_cont,
// //       cep,
// //       endereco,
// //       cidade,
// //       uf,
// //       bairro,
// //       complemento,
// //       ativo,
// //       bo_rede,
// //       id,
// //     ]);

// //     if (rowCount === 0) {
// //       return res
// //         .status(400)
// //         .json({ mensagem: "Não foi possivel atualizar o usuário." });
// //     }
// //     const contractData = rows;
// //     return res.status(200).json(contractData);
// //   } catch (error) {
// //     return res.status(400).json(error.message);
// //   }
// // }

// // async function localizarContratos(req, res) {
// //   try {
// //     const deleted = false;
// //     const query = "SELECT * FROM entidades_contratuais WHERE deleted = $1";
// //     const { rows } = await connection.query(query, [deleted]);

// //     const userData = rows;

// //     return res.status(200).json(userData);
// //   } catch (error) {
// //     return res.status(400).json(error.message);
// //   }
// // }

// // async function localizarContrato(req, res) {
// //   const { id } = req.body;
// //   try {
// //     const query = "SELECT * FROM entidades_contratuais WHERE id = $1";
// //     const { rows } = await connection.query(query, [id]);

// //     const userData = rows;

// //     return res.status(200).json(userData);
// //   } catch (error) {
// //     return res.status(400).json(error.message);
// //   }
// // }

// // async function deletarContrato(req, res) {
// //   const { uuid_ec } = req.body;

// //   try {
// //     const deleted = true;
// //     const ativo = false;
// //     const query = "SELECT * FROM entidades_escolares WHERE uuid_ec = $1";
// //     const { rows: entidadeEscolar, rowCount } = await connection.query(query, [
// //       uuid_ec,
// //     ]);

// //     if (rowCount > 0) {
// //       const deleteQueryEntidadesEscolares =
// //         "UPDATE entidades_escolares SET deleted = $1, ativo = $2 WHERE uuid_ec = $3";
// //       await connection.query(deleteQueryEntidadesEscolares, [
// //         deleted,
// //         ativo,
// //         uuid_ec,
// //       ]);
// //     }
// //     //EXCLUIR RELAÇÃO DO USUARIO_PDG COM A ESCOLA RELACIONADA AO CONTRATO EXCLUIDA
// //     const queryDeleteUsuarioPdg = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
// //     await connection.query(queryDeleteUsuarioPdg, [entidadeEscolar[0].id]);

// //     //EXCLUIR RELAÇÃO DE PAINELDADOS COM A ESCOLA RELACIONADA AO CONTRATO EXCLUIDA
// //     const queryDeletePainelDados = "DELETE FROM painel_dados WHERE id_ee = $1";
// //     await connection.query(queryDeletePainelDados, [entidadeEscolar[0].id]);

// //     const queryUpdateContrato =
// //       "UPDATE entidades_contratuais SET deleted = $1, ativo = $2 WHERE id = $3 RETURNING *";
// //     const { rows } = await connection.query(queryUpdateContrato, [
// //       deleted,
// //       ativo,
// //       uuid_ec,
// //     ]);
// //     const contratos = rows;
// //     return res.status(200).json(contratos);
// //   } catch (error) {
// //     return res.status(400).json(error.message);
// //   }
// // }

// async function sobreescreverContrato(req, res) {
//   const {
//     uuid_ec,
//     nome_simplificado,
//     razao_social,
//     cnpj_cont,
//     cep,
//     endereco,
//     cidade,
//     uf,
//     bairro,
//     complemento,
//     bo_rede,
//   } = req.body;

//   if (
//     !nome_simplificado ||
//     !razao_social ||
//     !cnpj_cont ||
//     !cep ||
//     !endereco ||
//     !cidade ||
//     !uf ||
//     !bairro ||
//     !complemento ||
//     !bo_rede
//   ) {
//     return res
//       .status(400)
//       .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
//   }

//   try {
//     //SOBREESCREVER ANTIGO CONTRATO
//     const ativo = false;
//     const delet = true;
//     const query =
//       "UPDATE entidades_contratuais SET ativo = $1, deleted = $2 WHERE id = $3 RETURNING *";

//     const { rows: contratos } = await connection.query(query, [
//       ativo,
//       delet,
//       uuid_ec,
//     ]);

//     //INSERIR DADOS NOVO CONTRATO

//     const situacaoCadastro = true;
//     const deletFalseInsert = false;
//     const queryCadastroContrato =
//       "INSERT INTO entidades_contratuais (nome_simplificado, razao_social, cnpj_cont, cep, endereco, cidade, uf, bairro, complemento, ativo, QtdEscolas, bo_rede, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";
//     const {
//       rows: [registredContract],
//     } = await connection.query(queryCadastroContrato, [
//       nome_simplificado,
//       razao_social,
//       cnpj_cont,
//       cep,
//       endereco,
//       cidade,
//       uf,
//       bairro,
//       complemento,
//       situacaoCadastro,
//       contratos[0].qtdescolas,
//       bo_rede,
//       deletFalseInsert,
//     ]);

//     if (!registredContract) {
//       return res
//         .status(400)
//         .json({ mensagem: "Não foi possivel cadastrar o contrato." });
//     }

//     //ENCONTRAR ENTIDADES ESCOLARES RELACIONADAS AO CONTRATO

//     const situacaoEntidadesEscolares = true;
//     const queryLocalicarEntidadesEscolares =
//       "SELECT * FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
//     const { rows: LocalizarEntidadesEscolares } = await connection.query(
//       queryLocalicarEntidadesEscolares,
//       [uuid_ec, situacaoEntidadesEscolares]
//     );

//     //DUPLICAR ENTIDADES ESCOLARES

//     const situacaoRegistrarEntidade = true;
//     const deletedFalseParaInsert = false;
//     const queryDuplicarEntidades =
//       "INSERT INTO entidades_escolares ( nome_operacional, cnpj_escola, cep, endereco, cidade, uf, bairro, complemento, uuid_ec, ativo, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";

//     for (let entidadeNew of LocalizarEntidadesEscolares) {
//       const { rows: inserindoNovaEntidade } = await connection.query(
//         queryDuplicarEntidades,
//         [
//           entidadeNew.nome_operacional,
//           entidadeNew.cnpj_escola,
//           entidadeNew.cep,
//           entidadeNew.endereco,
//           entidadeNew.cidade,
//           entidadeNew.uf,
//           entidadeNew.bairro,
//           entidadeNew.complemento,
//           registredContract.id,
//           situacaoRegistrarEntidade,
//           deletedFalseParaInsert,
//         ]
//       );

//       const localizarUsersTabAuxiliar =
//         "SELECT * FROM usuarios_pdg WHERE id_ee = $1";
//       const { rowCount, rows: localizarUser } = await connection.query(
//         localizarUsersTabAuxiliar,
//         [entidadeNew.id]
//       );

//       if (rowCount > 0) {
//         const alterandoIdEscolaUsuarioPedagogico =
//           "INSERT INTO usuarios_pdg (id_usuario, id_ee) VALUES ($1, $2) RETURNING *";
//         await connection.query(alterandoIdEscolaUsuarioPedagogico, [
//           localizarUser[0].id_usuario,
//           inserindoNovaEntidade[0].id,
//         ]);
//       }
//     }

//     //DESATIVAR ANTIGA ENTIDADES ESCOLARES

//     const situacaoSobreescreverEntidadesEscolares = false;
//     const setarParaDeletado = true;
//     const querySobreescreverEntidade =
//       "UPDATE entidades_escolares SET ativo = $1, deleted = $2 WHERE id = $3";

//     for (let entidade of LocalizarEntidadesEscolares) {
//       await connection.query(querySobreescreverEntidade, [
//         situacaoSobreescreverEntidadesEscolares,
//         setarParaDeletado,
//         entidade.id,
//       ]);
//     }

//     return res.status(200).json(contratos);
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// }

// module.exports = {
//   // registrarEntidadeContratual,
//   // editarEntidadeContratual,
//   // localizarContratos,
//   deletarContrato,
//   // localizarContrato,
//   sobreescreverContrato,
// };
