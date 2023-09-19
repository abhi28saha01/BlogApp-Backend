const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req,res) => {
    try{
        //Fetch Data
        const {name,email,password,confirmPassword,phoneNumber} = req.body;

        //Validation
        if(!name || !email || !password || !confirmPassword || !phoneNumber){
            return res.status(400).json({
                success : false,
                message : 'Enter the details Carefully',
            })
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(email)){
            return res.status(400).json({
                success : false,
                message : 'Enter the Email Carefully',
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : 'Password and Confirm Password are not Same',
            })
        }

        //Check that user is Already Present or Not
        const findUser = await User.findOne({email});

        if(findUser){
            return res.status(400).json({
                success : false,
                message : 'Email id is Already Present',
            })
        }

        //Hash Password
        let strongPass;
        try{
            strongPass = await bcrypt.hash(password,10);
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                success : false,
                message : 'Internal Server Error'
            })
        }

        const newUser = await User.create({
            name,email,password : SecurePass,phoneNumber
        })

        return res.status(200).json({
            success : true,
            message : "User is Created SuccessFully",
            newUser
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'User Can not Created Please Try Agian'
        })
    }
};

exports.logIn = async(req,res) => {
    try{

        //Fetch Information from Req.Body
        const {email,password} = req.body;

        //Validation Check
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : 'Please insert Data Carefully',
            });
        }

        //Check Email Registered or Not
        const user = await User.findOne({email});
        //If Email not Registered
        if(!user){
            return res.status(401).json({
                success : false,
                message : 'User Not Exist Please SignUp'
            });
        }

        //Now we find the User
        //Compare

        if(await bcrypt.compare(password,user.password)){
            //True
            //Create Token
            const payload = {
                name : user.name,
                email : user.email,
                phoneNumber : user.phoneNumber
            }
            const userToken = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : '2h'
            })

            // Now Create Cookie and Send as a Success Message
            const options = {
                expires : new Date(Date.now() + 3 * 60 * 60 * 1000),
                httpOnly : true
            }
            
            res.cookie('userCookie',userToken,options).status(200).json({
                success : true,
                message : 'User Logged In Successfully'
            })

        }
        //false
        else{
            return res.status(400).json({
                success : false,
                message : 'Incorrect Password'
            })
        }

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'User Can not Logged In Please Try Agian'
        })
    }
};