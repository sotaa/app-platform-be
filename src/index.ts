import { UserDirectoryServer } from './user-directory.server';

const userDirectory = new UserDirectoryServer(console.log);
userDirectory.enableDocumentation('/docs');
userDirectory.initialize({dbConfig: {
    type: 'mysql',
    host: 'localhost',
    database: 'userdirectory',
    password: '@123qwe@',
    port: '3306',
    username: 'root',
    synchronize: true
}});

userDirectory.start(process.env.PORT || 3000);
