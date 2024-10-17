import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo,belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'
import User from './User'

export default class Emprestimo extends BaseModel {
  @column()
  public livro_id: number

  @belongsTo(() => Livro)
  public livro: BelongsTo<typeof Livro>

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  
  @column({ isPrimary: true })
  public id_emprestimo: number

  @column.dateTime({ autoCreate: true })
  public data_emprestimo: DateTime

  @column()
  public data_devolucao: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}