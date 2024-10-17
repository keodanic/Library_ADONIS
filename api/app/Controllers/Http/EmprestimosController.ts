import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Emprestimo from 'App/Models/Emprestimo'


export default class EmprestimosController {
  public async index({}: HttpContextContract) {
    const emprestimos = await Emprestimo.all()
    return emprestimos
  }

  public async store({request}: HttpContextContract) {
    const {livro_id,user_id} = request.only(['livro_id','user_id'])
    const emprestimo = await Emprestimo.create({
      livro_id,
      user_id
    })
    return emprestimo
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const emprestimo = await Emprestimo.findByOrFail('id_emprestimo', params.id)
      return emprestimo
    } catch (error) {
      return response.status(400).json({error: "Emprestimo not found"})
    }
  }
  public async update({request, response, params}: HttpContextContract) {
    try {
      const {data_devolucao} = request.only(['data_devolucao'])
      const emprestimo = await Emprestimo.findByOrFail('id_emprestimo', params.id)
      emprestimo.merge({data_devolucao})
      await emprestimo.save()
      return emprestimo
    } catch (error) {
      return response.status(400).json({error: "Emprestimo not found"})
    }
  }
}

