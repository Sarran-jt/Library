// importing models
const Book = require('../models/book');
const User = require('../models/user');
const Activity = require('../models/activity');

// GLOBAL_VARIABLES
const PER_PAGE = 10;

exports.getDashboard = async(req, res, next) => {
    var page = req.query.page || 1;
    try{
        const users_count = await User.find().countDocuments();
        const books_count = await Book.find().countDocuments();
        const activity_count = await Activity.find().countDocuments();
        const activities = await Activity
            .find()
            .sort('-createdAt')
            .skip((PER_PAGE * page) - PER_PAGE)
            .limit(PER_PAGE);

        res.render("admin/index", {
            users_count : users_count,
            books_count : books_count,
            activities : activities,
            current : page,
            pages: Math.ceil(activity_count / perPage),
            });   
    } catch(err) {
        console.log(err);
    }
}

