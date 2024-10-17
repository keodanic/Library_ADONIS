import Route from '@ioc:Adonis/Core/Route'

Route.post("/session", "SessionsController.store")
Route.delete("/session", "SessionsController.destroy").middleware('auth')

Route.resource("/livro", "LivrosController").apiOnly()
Route.resource("/user", "UsersController").apiOnly()
Route.group(()=>{
    Route.resource("/emprestimo", "EmprestimosController").apiOnly()

    

    

  }
).middleware('auth')