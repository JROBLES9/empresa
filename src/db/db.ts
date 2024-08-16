import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE ?? '', process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? '', {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	pool: {
	  max: 10,       // Número máximo de conexiones en el pool
	  min: 0,        // Número mínimo de conexiones en el pool
	  acquire: 30000, // Tiempo máximo en milisegundos que el pool intentará adquirir una conexión antes de lanzar un error
	  idle: 10000    // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
	}
  });

sequelize.authenticate().then(() => {
	console.log('Conexión establecida con la base de datos');
}).catch((error) => {
	console.log('Error en la conexión con la base de datos:', error);
})
  

export default sequelize;