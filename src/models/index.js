const config = require("config");
const { Sequelize } = require("sequelize");
const user = require("./user");
const shop = require("./shop");
const itemCategory = require("./item-category");
const item = require("./item");
const purchase = require("./purchases");
const itemImage = require("./item-image");
const favorite = require("./favorite");

const sequelize = new Sequelize({ ...config.get("db") });

// initialized all the models here..
user.initModel(sequelize);
shop.initModel(sequelize);
itemCategory.initModel(sequelize);
item.initModel(sequelize);
purchase.initModel(sequelize);
itemImage.initModel(sequelize);
favorite.initModel(sequelize);

const db = {};
db.sequelize = sequelize;
db.User = user.User;
db.Shop = shop.Shop;
db.ItemCategory = itemCategory.ItemCategory;
db.Item = item.Item;
db.Purchase = purchase.Purchase;
db.ItemImage = itemImage.ItemImage;
db.Favorite = favorite.Favorite;

// relations

db.ItemCategory.hasMany(db.Item);
db.Shop.hasMany(db.Item);

module.exports = db;
