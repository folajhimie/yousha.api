
const express = require("express");
const router = express.Router();
const { Account } = require('../models/account');
const upload = require('../middleware/multer.js')
const cloudinary = require('../utils/cloudinary.js')
const { User } = require("../models/user.js");
const { auth } = require("../middleware/auth.js");

// const multer = require("multer");


// Configure Multer for file uploads
// const storage = multer.memoryStorage(); // Store files in memory as buffers
// const upload = multer({ storage: storage });


// Multer configuration for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// POST endpoint for creating an account
router.post('/', auth, upload.fields([
        { name: 'frontId', maxCount: 1 },
        { name: 'backId', maxCount: 1 },
        { name: 'selfieId', maxCount: 1 },
        { name: 'applicantId', maxCount: 1 },
    ]), async (req, res) => {
        try {
            // Extracting form data and files from the request
            const {
                accountNumber,
                address,
                socialSecurityNumber,
                dateOfBirth,
                taxNumber,
                employerNumber,
            } = req.body;

            // console.log("all request..", req.body);

            // Assuming that files are attached in the request and parsed by Multer
            // const frontId = req.files['frontId'][0];
            // const backId = req.files['backId'][0];
            // const selfieId = req.files['selfieId'][0];
            // const applicantId = req.files['applicantId'][0];

            const file = req.files;

            // console.log("all the files..", req.files);

            const frontIdPath = req.files['frontId'][0].path;
            const backIdPath = req.files['backId'][0].path;
            const selfieIdPath = req.files['selfieId'][0].path;
            const applicantIdPath = req.files['applicantId'][0].path;

            // Upload the files to Cloudinary

            const frontIdResult = await cloudinary.uploader.upload(frontIdPath);
            const backIdResult = await cloudinary.uploader.upload(backIdPath);
            const selfieIdResult = await cloudinary.uploader.upload(selfieIdPath);
            const applicantIdResult = await cloudinary.uploader.upload(applicantIdPath);

            // console.log("all the code for the iamges..", frontIdResult, backIdResult, selfieIdResult, applicantIdResult);

            // const frontIdResult = await cloudinary.uploader.upload(file.tempFilePath, {folder: "test"}, (err, result) =>{
            //     if(err) throw err;
    
            //     removeTmp(file.tempFilePath)
    
            //     return ({public_id: result.public_id, url: result.secure_url})
            // })
            const userId = req.user?._id;
            // const userLogin = await User.findById(userId).exec()

            // console.log("bank in the code...", req.user, userId );
            // console.log("all the way back...", userLogin , req.user);


            // Creating a new account document
            const newAccount = new Account({
                accountNumber,
                address,
                socialSecurityNumber,
                dateOfBirth,
                taxNumber,
                employerNumber,
                frontId: frontIdResult,
                backId: backIdResult,
                selfieId: selfieIdResult,
                applicantId: applicantIdResult,
            });

            // console.log("all the code..", newAccount);

            // Saving the account to the database
            const savedAccount = await newAccount.save();



            

            // Find the associated user and update isAdmin to true
            const user = await User.findByIdAndUpdate(
              userId,
              { isAdmin: true, isVerified: true, accountId: newAccount._id },
              { new: true }
            );

            // console.log("aLL THE USER...", user , "new account...", savedAccount);

            return res.status(200).json({
                status: true,
                message: 'Account created successfully',
                savedAccount, 
                user
            });
        } catch (error) {
            console.error('Error creating account:', error, error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

module.exports = router;
