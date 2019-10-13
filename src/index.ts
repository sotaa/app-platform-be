import { UserDirectoryServer } from './user-directory.server';

const userDirectory = new UserDirectoryServer(console.log);
userDirectory.enableDocumentation('/docs');

userDirectory.start(process.env.PORT || 3000);
