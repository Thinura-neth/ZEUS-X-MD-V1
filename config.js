const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//gg
module.exports = {
SESSION_ID:'DpokVLwL#n2G5yf-c18AspCytugWNec71_st_asUcdByyDpRUen4',

ANTI_DELETE: process.env.ANTI_DELETE === undefined ? 'true' : process.env.ANTI_DELETE, 
MV_BLOCK: process.env. MV_BLOCK === undefined ? 'false' : process.env. MV_BLOCK,    
ANTI_LINK: process.env.ANTI_LINK === undefined ? 'true' : process.env.ANTI_LINK, 
PONNA_ALERT: process.env.PONNA_ALERT === undefined ? 'false' : process.env.PONNA_ALERT,
SEEDR_MAIL: '',
SEEDR_PASSWORD: '',
SUDO: '',//
DB_NAME: 'pramaaaataaaaahaaaaggaaaajjaa',
LANG: 'SI',
OWNER_NUMBER: '94774571418',
TG_GROUP: ''

};
//GITHUB_AUTH_TdOKEN: 'ouvnI0xSDsmfWA1filVxx.SZ0vJGYkjlC5VX54U0e10',

