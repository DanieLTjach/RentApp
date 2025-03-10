const { use } = require(`../controllers/user_routes`);
const db_manager = require(`../db/db_manager`);
const db = new db_manager;

// Бизнес логика тут.

exports.register = async (req, res) => {
    const { email ,password, username } = req.body;
    try{
        if ( !email || !password || !username) {
            return res.status(400).json({error: "All fields are required"})
        };

        let result = await db.user_register(email, password, username);
        if(result === true){
            return res.status(200)
        }
    }
    catch(error){
        console.error(error);
    }
}

exports.login = async (req, res) => {

}

exports.edit = async (req, res) => {
    
}
