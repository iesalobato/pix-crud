'use strict'

const Pagamento = use('App/Models/Pagamento')
const Database = use('Database')

class PagamentoController {
  /**
   * Retorna uma lista de pagamentos
   * GET pagamentos
   */
  async index () {
    return await Pagamento.query().orderBy('data_pagamento', 'desc').fetch();
  }

  /**
   * Retorna um único pagamento
   * GET pagamentos/:id
   */
  async show ({params, response}) {
    const pagamento = await Pagamento.findBy('id',params.id);

    if(!pagamento){
      response.status(404).send({message: "PAGAMENTO NÃO ENCONTRADO"})
    }
    return pagamento;
  }

  async updatePorcentagem(data){
    const pagamentos = await Pagamento.query().where('data_pagamento','=', data).fetch();

    if(pagamentos){
      const totalReturn = await Database.from('pagamentos').where('data_pagamento','=', data).sum('valor');
      const total = totalReturn[0].sum;
      for(var i=0; i<pagamentos.rows.length; i++){
        pagamentos.rows[i].porcentagem_individual = (100*pagamentos.rows[i].valor)/total;
        await pagamentos.rows[i].save();
      }
    }
  }

  /**
   * Salva um novo pagamento.
   * POST pagamentos
   */
  async store ({ request, response }) {

    const valor = request.only(['valor']);
    if(valor.valor == 0){
      return response.status(400).send({message: "O VALOR DO PAGAMENTO NÃO PODE SER ZERO"})
    }

    const data = request.all();
    if(!data.descricao){
      data.descricao = "";
    }
    
    const pagamento = await Pagamento.create(data);
    await this.updatePorcentagem(pagamento.data_pagamento);
    return pagamento;
  }

  /**
   * Atualiza as informações de um pagamento
   * PUT pagamentos/:id
   */
  async update ({ params, request, response }) {
    const pagamento = await Pagamento.findBy('id',params.id);

    if(!pagamento){
      response.status(404).send({message: "PAGAMENTO NÃO ENCONTRADO"})
    }

    const valor = request.only(['valor']);
    if(valor.valor == 0){
      return response.status(400).send({message: "O VALOR DO PAGAMENTO NÃO PODE SER ZERO"})
    }

    const data  = request.all();
    pagamento.nome_destinatario = data.nome_destinatario;
    pagamento.valor = data.valor;
    pagamento.descricao = data.descricao ? data.descricao : "";
    pagamento.data_pagamento = data.data_pagamento;
    pagamento.instituicao = data.instituicao;
    pagamento.cpf = data.cpf;
    pagamento.chave_pix = data.chave_pix;
    await pagamento.save();
    await this.updatePorcentagem(pagamento.data_pagamento);
    return pagamento; 
  }

  /**
   * Exclui um pagamento
   * DELETE pagamentos/:id
   */
  async destroy ({ params, response }) {
    const pagamento = await Pagamento.findBy('id',params.id);

    if(pagamento){
      await pagamento.delete();
      await this.updatePorcentagem(pagamento.data_pagamento);
      return pagamento;
    }
    response.status(404).send({message: "PAGAMENTO NÃO ENCONTRADO"})
  }
}

module.exports = PagamentoController
