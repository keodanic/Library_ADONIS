import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import Emprestimo from './Emprestimo'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome_usuario: string

  @column()
  public cpf_usuario: string

  @column()
  public email: string

  @hasMany(() => Emprestimo)
  public emprestimo: HasMany<typeof Emprestimo>

  @column({ serializeAs: null })
  public password: string

  @column()
  public token: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}