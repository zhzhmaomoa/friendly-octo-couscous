import {DataTypes} from "sequelize";
import {sequelize} from "./configDb.js"
import moment from "moment";
export const RedemptionCode = sequelize.define("RedemptionCode",{
	id:{
		type:DataTypes.INTEGER,
		allowNull:false,
		primaryKey:true,
		autoIncrement:true
	},
	type:{
		type:DataTypes.STRING,
		allowNull:false,
		comment:'redemptionCode/codedMessage',
	},
	redemptionCode:{
		type:DataTypes.STRING,
		allowNull:false,
	},
	deadline:{ 
		type:DataTypes.DATE,
		allowNull:false,
		get(){
			return moment(this.getDataValue('deadline')).format('YYYY-MM-DDTkk:mm:ss');
		}
	},
	purpleClothingEasterEgg:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	purpleFurnitureEasterEgg:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        yellowClothingEasterEgg:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        yellowFurnitureEasterEgg:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        redClothingEasterEgg:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        redFurnitureEasterEgg:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        friendshipStar:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
	heart:{
                type:DataTypes.INTEGER,
                allowNull:false
	},
	diamond:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        goldCoin:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        furniture:{
                type:DataTypes.STRING,
        },
        clothing:{
                type:DataTypes.STRING
        },
        action:{
                type:DataTypes.STRING
        },
        house:{
                type:DataTypes.STRING,
        },
        appellation:{
                type:DataTypes.STRING,
        },
        potion:{
                type:DataTypes.INTEGER,
                allowNull:false
        },
	petWhistle:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	circulationPass:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	chronoTrigger:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	points:{
		type:DataTypes.INTEGER,
		allowNull:false
	}
})
