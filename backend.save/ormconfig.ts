let database = 'sacredtext';
let logging = ['error'];
getEnvironment();

function getEnvironment() {
    switch (process.env.NODE_ENV) {
        case 'production':
            database = 'sacredtext';
            break;
        case 'staging':
            database = 'sacredtext';
            break;
        default :
            process.env.NODE_ENV = 'development';
            database = 'sacredtext';
            logging.push('warn');
            break;
    }
}

console.log('[ormconfig] environment: ', process.env.NODE_ENV);
console.log('[ormconfig] database: ', database);
console.log('[ormconfig] logging: ', logging);

module.exports = {
    'type': 'mysql',
    'host': 'localhost',
    'port': 3306,
    'username': 'sacredapp',
    'password': 'sac42Red!$!',
    'database': database,
    'synchronize': false,
    'logging': logging,
    'logger': 'file',
    'bigNumberStrings': false,
    'entities': [
        'dist/entities/*.js'
    ],
    'migrations': [
        'dist/migrations/**/*.js'
    ],
    'subscribers': [
        'dist/subscribers/**/*.js'
    ],
    'cli': {
        'entitiesDir': 'src/entities',
        'migrationsDir': 'src/migrations',
        'subscribersDir': 'src/subscribers'
    }
};
