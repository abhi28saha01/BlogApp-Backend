const Post = require('../Models/PostModel');

exports.createPost = async (req,res) => {
    try{
        const {user,title,description} = req.body;

        if(!user || !title || !description){
            return res.status(400).json({
                success : false,
                message : 'Enter the Details Carefully',
            })
        }

        const posted = await Post.create({user,title,description});

        res.status(200).json({
            success : true,
            data : posted,
            message : 'Post Created Successfully',
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Not Posted Try Again',
        })
    }
}

exports.DeletePost = async (req,res) => {
    try{
        const {id} = req.params;

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Post Deleted Successfully",
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Not Deleted Try Again',
        });
    }
};

exports.UpdatePost = async (req,res) => {
    try{
        const {title,description} = req.body;
        const {id} = req.params;

        const updatePost = await Post.findByIdAndUpdate(
            {_id : id},
            {title,description,EditedAt : Date.now()}
        );

        res.status(200).json({
            success : true,
            data : updatePost,
            message : 'Post Updated Successfully',
        });
    }   
    catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Not Updated Try Again',
        });
    }
};

exports.GetPost = async(req,res) => {
    try{
        const posts = await Post.find({});

        res.status(200).json({
            success : true,
            data : posts,
            message : 'All Post are Fetched Successfully',
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Not Fetched Try Again',
        });
    }
};

exports.GetPostbyID = async (req,res) => {
    try{
        const {id} = req.params;

        const post = await Post.findById(id);

        if(!post){
            return res.status(401).json({
                success : false,
                message : "No Post is Available with this id",
            });
        }

        res.status(200).json({
            success : true,
            data : post,
            message : 'Post Fetched successfully',
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Not Fetched Try Again',
        });
    }
}