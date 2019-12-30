const path = require('path');
/*const bcrypt = require('bcrypt');
const sec='';
bcrypt.hash('sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U', 10, (err, hash) => {
     this.sec = hash;
    console.log(this.sec);
    console.log(bcrypt.compare( 'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U','sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U'));
});*/
module.exports = {
    port : 3000,
    host:'http://localhost:',
    secret :'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U',
    //secret :this.sec,
    path : {
        controllers : { 
            api : path.resolve('./modules/controllers/api'),
            web : path.resolve('./modules/controllers/web')
        },
        model : path.resolve('./modules/models'),
        transform : path.resolve('./modules/transforms'),
        controller : path.resolve('./modules/controllers'),
    }
}