import {DataTypes} from "sequelize";
import {sequelize} from "./configDb.js"
export const Contribution = sequelize.define("Contribution",{
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  time:{
    type:DataTypes.DATEONLY,
    allowNull:false
  },
  quantity:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
})
