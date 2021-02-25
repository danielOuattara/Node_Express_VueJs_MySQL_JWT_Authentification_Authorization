
module.exports =  {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '1_superPassword!',
    DB: "test_jwt_mysql",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}