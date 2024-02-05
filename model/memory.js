import {DataTypes} from "sequelize";
import {sequelize} from "./configDb.js"
export const Memory = sequelize.define("Memory",{
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  date:{
    type:DataTypes.DATEONLY,
    allowNull:false
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  src:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'资源路径'
  }
})