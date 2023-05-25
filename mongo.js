const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const addname = process.argv[3]
const addnumber = process.argv[4]

const url = `mongodb+srv://er-0:${password}@cluster0.d55lk6g.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
  name: addname,
  number: addnumber,
})

if (process.argv[3]) {
  person.save().then(() => {
    console.log(`added ${addname} number ${addnumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('puhelinluettelo:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
