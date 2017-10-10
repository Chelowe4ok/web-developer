"use strict";

module.exports = function (sequelize, Sequelize) {
 
    var Contact = sequelize.define('Contact', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        phone: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        resume: {
            type: Sequelize.TEXT
        }
 
    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
    });
 
    return Contact;
 
}