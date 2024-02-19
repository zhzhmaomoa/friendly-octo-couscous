import {Member} from "./member.js"
import {Contribution}  from "./contribution.js";
Member.hasMany(Contribution);
Contribution.belongsTo(Member);
import {Memory} from "./memory.js"
import {RedemptionCode} from "./redemptionCode.js"
// 数据库初始化方法
export async function init() {
  await Member.sync({ alter: true });
  await Contribution.sync({ alter: true });
  await Memory.sync({alter:true});
  await RedemptionCode.sync({alter:true});
}
