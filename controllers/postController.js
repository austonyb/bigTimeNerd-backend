const Sequelize = require('sequelize')
require('dotenv').config()
const CONNECTION_STRING = process.env.CONNECTION_STRING

let allPosts = []

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    
    cachePosts: () => {
        console.log("posts cached!")
    },

    retrieveAllPosts: (req, res) => {
        sequelize.query(`
            SELECT * FROM posts;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    },

    //test to return authors

    retrieveAuthorList: (req, res) => {
        sequelize.query(`
            SELECT first_name AS first
            FROM authors;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    }

}