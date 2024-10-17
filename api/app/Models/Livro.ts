import { DateTime } from 'luxon'
import { BaseModel, column, hasMany,HasMany} from '@ioc:Adonis/Lucid/Orm'
import Emprestimo from './Emprestimo'

export default class Livro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome_livro: string

  @column()
  public autor_livro: string

  @column()
  public ano_publicacao: number

  @hasMany(() => Emprestimo)
  public emprestimo: HasMany<typeof Emprestimo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}