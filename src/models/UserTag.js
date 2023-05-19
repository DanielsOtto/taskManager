import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
import User from './User.js';
import Tag from './Tag.js';

const UserTag = db.define('UserTag', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  }
}, { tableName: 'users_tags' });

User.belongsToMany(Tag, { through: UserTag, foreignKey: 'userId' });
Tag.belongsToMany(User, { through: UserTag, foreignKey: 'tagId' });

export default UserTag;