const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
let name = null
let number = null

if(process.argv.length === 5){
  name = process.argv[3]
  number = process.argv[4]
}

const url = `mongodb+srv://ahmed:${password}@cluster0.umm56.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)


if(name !== null && number !== null){
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else{
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {console.log(person.name + ' ' + person.number)})
      mongoose.connection.close()
    })
}


