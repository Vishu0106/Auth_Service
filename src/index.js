process.loadEnvFile();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const {PORT} = require('./config/server-config');
const db = require('./models/index');
const {User,Role} = require('./models/index');
const app = express();
const prepareAndStartServer = async() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async()=>{
        console.log(`Server is running on port ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alert:true});
        }
        const u1 = await User.findByPk(1);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);

    })
}

prepareAndStartServer();