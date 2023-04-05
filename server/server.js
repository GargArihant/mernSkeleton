import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'
app.listen(config.port, (err) => {
 if (err) {
 console.log(err)
 }
 console.info('Server started on port %s.', config.port)
})

mongoose.Promise = global.Promise
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mernproject', { useNewUrlParser: true, 
//  useCreateIndex: true, 
//  useUnifiedTopology: true 
} ) 
mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
