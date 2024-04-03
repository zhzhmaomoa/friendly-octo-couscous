import {DataTypes} from "sequelize";
import {sequelize} from "./configDb.js"
export const Member = sequelize.define("Member",{
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'族员名字'
  },
  province:{
	type:DataTypes.STRING,
	allowNull:false,
  },
  iconPath:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:"形象"
  }
});
  
