import { Sequelize, DataTypes } from "sequelize";
// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
export const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
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
})
export const Contribution = sequelize.define(
  "Contribution",
  {
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
  }
)
Member.hasMany(Contribution);
Contribution.belongsTo(Member);
// 数据库初始化方法
export async function init() {
  await Counter.sync({ alter: true });
  await Member.sync({ alter: true });
  await Contribution.sync({ alter: true });
}
