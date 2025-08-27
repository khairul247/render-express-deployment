//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.findAll()
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog Details'});
    })
    .catch(err => {
        console.log(err);
    })
}

const blog_create_get = (req,res) => {
    res.render('create', {title: 'Create new blog'});
}

const blog_create_post = (req,res) => {
    Blog.create(req.body)
     .then((result) => {
        res.redirect('/');
     })
     .catch((err) => {
        console.log(err)
     })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.delete(id)
        .then(result => {
            res.json({ redirect: '/'})
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}