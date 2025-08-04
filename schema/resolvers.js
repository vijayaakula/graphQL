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
      return await db.User.update({ name, email }, { where: { id } });
    },
    deleteUser: async (_, args) => {
      const { id } = args;
      return await db.User.destroy({ where: { id } });
    },
    // addRating: async (_, args) => {
    //   const { userId, rating } = args;
    //   return await db.Ratings.create({ user_id: userId, rating });
    // },
    // deleteRating: async (_, args) => {
    //   const { userId } = args;
    //   return await db.Ratings.destroy({ where: { user_id: userId } });
    // }
}

}