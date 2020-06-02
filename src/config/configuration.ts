import * as redisStore from 'cache-manager-redis-store';

export default () => ({
    database: {
        type: 'mysql',
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "123456",
        database: "nest-test",
        autoLoadEntities: true,
        synchronize: true,
    },
    cache: {
        store: redisStore,
        host: 'localhost',
        auth_pass: '123456',
        port: 6379
    },
    bull: {
        redis: {
            host: 'localhost',
            password: '123456',
            port: 6379
        }
    }
});
