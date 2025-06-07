const swaggerAutogen = require('swagger-autogen')();

console.log('Starting swagger autogen...');
const doc = {
    info: {
        title: 'Computers API',
        description: 'Computers Api',
        title: 'Companies API',
        description: 'Companies Api',
    },
    host: 'cse-341-project2-3srj.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

console.log('Starting swagger autogen 2...');
swaggerAutogen(outputFile, endpointsFiles, doc);