import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livro from 'App/Models/Livro'


export default class LivrosController {
  public async index({}: HttpContextContract) {
    const livros = await Livro.all()
    return livros
  }

  public async store({request}: HttpContextContract) {
    const {nome_livro,autor_livro, ano_publicacao} = request.only(['nome_livro','autor_livro', 'ano_publicacao'])
    const livro = await Livro.create({
      nome_livro,
      autor_livro, 
      ano_publicacao
    })
    return livro
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const livro = await Livro.findByOrFail('nome_livro', params.nome_livro)
      return livro
    } catch (error) {
      return response.status(400).json({error: "Livro não achado :("})
    }
  }
  public async showbyid({response, params}: HttpContextContract) {
    try {
      const livro = await Livro.findByOrFail('id_livro', params.id)
      return livro
    } catch (error) {
      return response.status(400).json({error: "Livro não achado :("})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const livro = await Livro.findByOrFail('id_livro', params.id)
      await livro.delete()
      return response.status(203).json({message:"Livro Apagado"})
    } catch (error) {
      return response.status(400).json({error: "Este livro não existe "})
    }
  }
}