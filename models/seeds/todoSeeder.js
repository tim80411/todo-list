const Todo = require('../todo')
const db = require('../../config/mongoose')

db.once('open', () => {
  // 基於TodoSchema 的規則建立種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  
  console.log('done')
})