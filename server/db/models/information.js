"use strict";

module.exports = function (sequelize, Sequelize) {

    var information = sequelize.define('information', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        key: {
            type: Sequelize.STRING,
            unique: {
                args: true,
                msg: 'Key already in use!'
            }
        },

        value: {
            type: Sequelize.STRING,
            notEmpty: true
        }

    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
        });

    return information;

}