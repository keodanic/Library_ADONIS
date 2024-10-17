import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({request}: HttpContextContract) {
    const {nome_usuario,cpf_usuario, email, password} = request.only(['nome_usuario','cpf_usuario', 'email', 'password'])
    const user = await User.create({
      nome_usuario,
      cpf_usuario, 
      email, 
      password
    })
    return user
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      return user
    } catch (error) {
      return response.status(400).json({error: "User not found"})
    }
  }

  public async update({request, response, params}: HttpContextContract) {
    try {
      const {nome_usuario,email, password} = request.only(['nome_usuario','email', 'password'])
      const user = await User.findByOrFail('id', params.id)
      user.merge({nome_usuario, email, password})
      await user.save()
      return user
    } catch (error) {
      return response.status(400).json({error: "User not found"})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({error: "User not found"})
    }
  }
}