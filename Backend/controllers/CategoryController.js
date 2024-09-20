//model of category
//user models
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const User = require("../models/User")
const Category = require("../models/Category")
exports.createCategory = async (req, res) => {
    try {

        //fetch

        const { name, description } = req.body

        const image = req.files?.image;

        //validate
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });

        }
        //upload image to cloudinary
        if (image) {
            const imageUrl = await uploadImageToCloudinary(image, 'categories');
            console.log(imageUrl);
            if (!imageUrl) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to upload image to cloudinary'
                })
            }

        }

        //create a entry in database
        // const category = new Category({
        //     name,
        //     description,
        //     image: imageUrl? imageUrl : null
        // });

        const category = await Category.create({
            name,
            description,
            image: imageUrl ? imageUrl : null
        })

        console.log(category);

        //update in user models

        const token = req.cookies.token;
        //decode
        const user = await User.findByIdAndUpdate({ token },
            { $push: { categories: category._id }, },
            { new: true }
        );

        console.log(user);

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category
        });


    } catch (error) {
        console.error('Error during category creation:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
}