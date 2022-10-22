const DB = require("../database/config");
const { User, AccessCode } = require("../models/");

const existsEmailValidator = async (email) => {
  const db = new DB();
  try {
    await db.connect();
    const emailExists = await User.findOne({ email });
    await db.disconnect();

    if (emailExists) 
        throw new Error("Email has been registered");

  } catch (error) {
    throw new Error("Email has been registered");
  }
};

const existsUserById = async (id) => {
    const db = new DB();
    try {
        await db.connect();
        const userByID = await User.findOne({ id });
        await db.disconnect();
        if ( !userByID ) 
            throw new Error("User don't exist");
    } catch (error) {
        throw new Error("Email has been registered");
    }
};

const existAccessCode = async ( code ) => {

    const db =  new DB();

    try {
      await db.connect();
      const access = await AccessCode.findOne({ code, status: true });
      await db.disconnect();

      if( !access )
        throw new Error("Access Code has been expired");
      
    } catch (error) {
      throw new Error("Report this assue to the admin");
    }
}


module.exports = {
  existsEmailValidator,
  existsUserById,
  existAccessCode
};
