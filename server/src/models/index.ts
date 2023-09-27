import User from './User';
import Task from './Task';

User.hasMany(Task, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Task.belongsTo(User, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    },
});

export {Task, User}