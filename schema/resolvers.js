import db from './../models/index.js'

export const resolvers ={
  Query: {
    getUsers: async () => { return db.User.findAll()},
    getUser: async (_,args) =>{ 
      const {id} =args;
      return await db.User.findByPk(id);
    },
    getUserRatings : async (_,args) =>{
      const {userId} = args;
      return await db.Ratings.findAll({where: {user_id: userId}})
    }
},
 Mutation: {
    createUser: async (_, args) => {
      const { name, email } = args;
      return await db.User.create({ name, email });
    },
    updateUser: async (_, args) => {
      const { id, name, email } = args;
      const user = await db.User.findByPk(id);
      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        return user;
      }
      throw new Error('User not found');
    }
}

}