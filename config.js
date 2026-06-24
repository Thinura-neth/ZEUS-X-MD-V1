const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//gg
module.exports = {
SESSION_ID:'session eka methenta danna',

ANTI_DELETE: process.env.ANTI_DELETE === undefined ? 'true' : process.env.ANTI_DELETE, 
MV_BLOCK: process.env. MV_BLOCK === undefined ? 'false' : process.env. MV_BLOCK,    
ANTI_LINK: process.env.ANTI_LINK === undefined ? 'true' : process.env.ANTI_LINK, 
SEEDR_MAIL: '',
SEEDR_PASSWORD: '',
SUDO: '',//
DB_NAME: 'zeus',
LANG: 'SI',
OWNER_NUMBER: '94774571418',
TG_GROUP: ''

};
//GITHUB_AUTH_TdOKEN: 'ouvnI0xSDsmfWA1filVxx.SZ0vJGYkjlC5VX54U0e10',

