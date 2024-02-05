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
  latitude:{
    type:DataTypes.FLOAT,
    allowNull:false,
    comment:'纬度'
  },
  longitude:{
    type:DataTypes.FLOAT,
    allowNull:false,
    comment:'经度'
  },
  iconPath:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:"形象"
  }
});
  