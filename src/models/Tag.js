import { DataTypes, UUIDV4 } from 'sequelize';
import db from '../database/sequelize.db.js';

const Tag = db.define('Tag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'tags' });

export default Tag;