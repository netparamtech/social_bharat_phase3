const url = require('url');
const User = require('../models/User');
const UserJobDetail = require('../models/UserJobDetail');
const UserContactDetail = require('../models/UserContactDetail');
const UserEducationalDetail = require('../models/UserEducationalDetail');
const UserMatrimonialDetail = require('../models/UserMatrimonialDetail');
const UserToken = require('../models/UserToken');
const { OTPService, OTPExpiredError } = require('../services/OTPService');
const JwtTokenService = require('../services/JwtTokenService');
const FileUploadService = require('../services/FileUploadService');
const PasswordService = require('../services/PasswordService');
const { validationResult } = require('express-validator');
const {
    tmpUserCreationFormRules, 
    userRegisterFormRules, 
    attemptLoginFormRules,
    userLoginFormRules, 
    userLoginByPasswordFormRules,
    userBasicProfileFormRules , 
    attemptUpdateMobileFormRules,
    updateMobileFormRules,
    updatePasswordFormRules,
    userContactUpdateFormRules ,  
    userJobUpdateFormRules,
    userEducationalDetailsUpdateFormRules,
    userMatrimonialDetaisUpdateFromRules,
    userBusinessUpdateFormRules,
} = require('../validators/UserValidator');
const UserBusinessDetails = require('../models/UserBusinessDetails');

const uploadService = new FileUploadService();

module.exports = {
    createTmpUser: [ tmpUserCreationFormRules, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errorMessages[error.path] = error.msg;
            });
            return res.status(400).json({ message: "Validation Failed", errors: errorMessages });
        }
        let userData = req.body;
        await User.createTmpUser(userData);
        await OTPService.generateOTP(userData.mobile);
        
        return res.status(201).json({ message: "OTP Sent on your mobile number.", data: userData });
    }],

    register: [userRegisterFormRules ,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = {};
                errors.array({ onlyFirstError: true }).forEach((error) => {
                    errorMessages[error.path] = error.msg;
                });
                return res.status(400).json({ message: "Validation Failed", errors: errorMessages });
            }
            
            const userData = req.body;
            
            const isOTPVerified = await OTPService.verifyOTP(userData.mobile, userData.otp);
            if(isOTPVerified) {
                delete userData.otp;
                const userId = await User.register(userData);
                const tokenData = await JwtTokenService.generateToken(userId,userData.community_id);
                const responseData = await User.findById(userId);
                return res.status(201).json({ message: "User Registered Successfully", token: tokenData, data: responseData  });
            } else {
                return res.status(401).json({ message: "Invalid OTP." });
            }          
        } catch (err) {
            if(err instanceof OTPExpiredError) {
                return res.status(500).json({ message: err.message });    
            }
            return res.status(500).json({ message: "Internal Server Error", error: err.message});
        }
    }],

    attemptLogin: [ attemptLoginFormRules, async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        const {mobile} = req.body;
        await OTPService.generateOTP(mobile);
        return res.status(200).json({ message: "OTP Sent on your mobile number. Please verify"});
    }],

    login : [userLoginFormRules, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        const {mobile, otp} = req.body;
        try {
            const isOTPVerified = await OTPService.verifyOTP(mobile, otp);
            if(isOTPVerified) {
                const userData = await User.findByMobile(mobile); 
                if(typeof userData !== "undefined") {
                    if(userData.status === 'Inactive') {
                        return res.status(451).json({ message: "User Blocked"});    
                    }
                    const tokenData = await JwtTokenService.generateToken(userData.id, userData.community_id);
                    const responseData = userData;
                    return res.status(200).json({ message: "User Login Successfully", token: tokenData, data: responseData  });
                }
            } else {
                return res.status(401).json({ message: "Invalid OTP" });
            }
        } catch (error) {
            if(error instanceof OTPExpiredError) {
                return res.status(410).json({ message: error.message }); 
            }
            return res.status(500).json({message: error.message});
        }
    }],

    loginByPassword: [userLoginByPasswordFormRules, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }

        const {mobile, password} = req.body;
        try {
            const userData = await User.authenticate(mobile); 
            if(userData.status === 'Inactive') {
                return res.status(451).json({ message: "User Blocked"});
            }
            if(typeof userData !== "undefined") {
                const isMatched = await PasswordService.comparePasswords(password, userData.password);
                if(isMatched) {
                    const tokenData = await JwtTokenService.generateToken(userData.id, userData.community_id);
                    delete userData.password;
                    return res.status(200).json({ message: "User Login Successfully", token: tokenData, data: userData  });
                }else {
                    return res.status(401).json({ message: "Invalid Password" });
                }
            } else {
                return res.status(404).json({message: "Invalid Mobile Number."});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }],

    logout : async (req, res) => {
        const isTokenRemoved = await UserToken.deleteToken(req.userId)
        if(isTokenRemoved) {
            return res.status(200).json({ message: "Logout Successfully." });
        } else {
            return res.status(500).json({ message: "Something went wrong." });
        }
    },

    updateProfilePicture:   [uploadService.uploadSingleImage('profile_pic'), async (req, res) => {
        const photoObject = req.file;
        const userId = req.userId;
        try {
            const userData = await User.findById(userId);
            const designationPath = await uploadService.moveFile(photoObject.path, "users");
            await User.updateProfilePhoto(userId,designationPath, userData.photo);
            userData.photo = designationPath;
            return res.status(200).json({message: "Profile photo updated successfully", data: userData});
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
    }],

    updateBasicProfile : [userBasicProfileFormRules , async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        
        const data = req.body;
        const userId = req.userId;
        
        try { 
            const affectedRows = await User.updateBasicProfile(userId, data);
            if(affectedRows > 0) {
                const userData = await User.findById(userId);
                return res.status(200).json({ "message": "Profile updated successfully", data: userData });
            } else {
                return res.status(3040).json({ "message": "Nothing Gets Changed."});
            }
        } catch(error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    attemptUpdateMobile: [attemptUpdateMobileFormRules, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        try {
            const {mobile} = req.body;
            await OTPService.generateOTP(mobile);
            return res.status(200).json({ "message": "OTP Sent. Verify New Mobile Number." });
        } catch(error) {
            return res.status(500).json({ "message": error.message });
        }
    }],

    updateMobile: [updateMobileFormRules, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        try {
            const userId = req.userId;
            const {mobile, otp} = req.body;
            
            const isOTPVerified = await OTPService.verifyOTP(mobile, otp);
            if(isOTPVerified) {
                const isMobileUpdated = await User.updateMobile(userId, mobile);
                if(isMobileUpdated) {
                    const userData = await User.findById(userId);
                    return res.status(200).json({ "message": "Mobile updated successfully." , data: userData});
                } else {
                    return res.status(500).json({ "message": "Mobile can\'t be changed." });
                }
            }else {
                return res.status(401).json({ message: "Invalid OTP" });
            }
        } catch(error) {
            if(error instanceof OTPExpiredError) {
                return res.status(410).json({ message: error.message }); 
            }
            return res.status(500).json({ "message": error.message });
        }
    }],

    updatePassword: [updatePasswordFormRules, async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }

        try {
            const userId = req.userId;
            const { password } = req.body;
            const encPassword = await PasswordService.hashPassword(password);
            const isPasswordUpdated = await User.updatePassword(userId, encPassword);
            if(isPasswordUpdated) {
                return res.status(200).json({ "message": "Password Updated Successfully"});
            } else {
                return res.status(304).json({ "message": "Nothing Changed"});
            } 
        } catch(error) {
            return res.status(500).json({ "message": error.message}); 
        }
    }],

    updateContactDetails : [userContactUpdateFormRules,async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        const data = req.body;
        const userId = req.userId;
        console.log("User Id",userId);
        
        try {
            await UserContactDetail.create(data, userId); 
            const user = await User.findByIdWith(userId);
            return res.status(200).json({ "message": "Contact Details Saved Successfully", data: user });
        } catch(error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    updateJobDetails :[userJobUpdateFormRules, async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        const data = req.body;
        const userId = req.userId;
        console.log(data);
        try {
            await UserJobDetail.create(data, userId);
            const user = await User.findByIdWith(userId);
            return res.status(200).json({ "message": "Job details Saved Successfully", data: user});
        }catch(error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    updateEducationalDetails: [userEducationalDetailsUpdateFormRules , async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }
        const data = req.body;
        const userId = req.userId;
        try {
            await UserEducationalDetail.create(data, userId);
            const user = await User.findByIdWith(userId); 
            return res.status(200).json({ "message": "Education Detail created successfully", data: user});
        } catch(error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    updateMatrimonialDetails: [userMatrimonialDetaisUpdateFromRules, async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }

        const data = req.body;
        const userId = req.userId;
        try {
            let uploadedProposalPhotos = [];
            for(photo of data.proposal_photos) {
                if(photo.startsWith('temp/') || photo.startsWith('temp\\')) {
                    const uploadedProposalPhoto = await uploadService.moveFile(photo, "users/matrimonial");
                    uploadedProposalPhotos.push(uploadedProposalPhoto);
                } else {
                    const prevUploadedPhoto = photo.substr(photo.indexOf('uploads/'));
                    uploadedProposalPhotos.push(prevUploadedPhoto);
                }
            }
            data.proposal_photos = uploadedProposalPhotos.join(",");
            
            //Remove the previous files
            const userMatrimonialDetail = await UserMatrimonialDetail.findByUserId(userId);
            if(userMatrimonialDetail && userMatrimonialDetail.proposal_photos) {
                const previousProposalPhotos = userMatrimonialDetail.proposal_photos.split(",");
                const deletedImages = previousProposalPhotos.filter(item => !uploadedProposalPhotos.includes(item));
                await uploadService.deleteFiles(deletedImages);
            }
            if(data.biodata.startsWith('temp/') || data.biodata.startsWith('temp\\')) {
                const uploadedBiodata = await uploadService.moveFile(data.biodata, "users/matrimonial", userMatrimonialDetail?userMatrimonialDetail.biodata:'');
                data.biodata = uploadedBiodata;
            } else {
                data.biodata = userMatrimonialDetail.biodata;
            }
            
            await UserMatrimonialDetail.create(data, userId);
            const user = await User.findByIdWith(userId); 
            return res.status(200).json({ "message": "Matrimonial Details updated successfully", data: user});

        } catch(error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    updateBuisnessDetails: [userBusinessUpdateFormRules, async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() ) {          
            const errormessages = {};
            errors.array({ onlyFirstError: true }).forEach((error) => {
                errormessages[error.path] = error.msg;
            });
            return res.status(400).json({ "message": "Validation Failed", "errors": errormessages });
        }

        const data = req.body;
        const userId = req.userId;
        try {
            await UserBusinessDetails.update(data, userId);
            const user = await User.findByIdWith(userId);
            return res.status(200).json({ "message": "Business Details updated successfully", data: user});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    profile :[async (req,res) =>{
        const userId = req.userId;
        try {
            const user = await User.findByIdWith(userId);
            return res.status(200).json({ "message": "User Profile", data: user});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    userProfileForAdmin: [async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findByIdWith(userId);
            return res.status(200).json({ "message": "User Profile", data: user});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    findAllUsers: [async (req, res) => {
        
        const queryParams = req.query;
        

        try {
            const {users, totalRecords} = await User.fetchByPage(queryParams);
            users.forEach(user => {
                try {
                    user.community = JSON.parse(user.community,true)
                } catch(error) {
                    throw error;
                }
            });
            return res.status(200).json({ "message": "Users List", totalRecords, filteredRecords: totalRecords, data: users});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    findAllContacts: [async (req, res) => {
        const userId = req.userId;
        try {
            const contacts = await UserContactDetail.findAll(userId);
            return res.status(200).json({ "message": "User Contacts", data: contacts});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],
    
    findSingleContact: [async (req, res) => {
        const userId = req.userId;
        const contatDetailId = req.params.id;
        
        try {
            const row = await UserContactDetail.get(contatDetailId, userId);
            if(typeof row === 'undefined') {
                return res.status(404).json({ "message": "No Record Found."});
            }else {
                return res.status(200).json({ "message": `User Contact <Contact Id: ${contatDetailId}>`, data: row});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    deleteContact: [async (req, res) => {
        const userId = req.userId;
        const contatDetailId = req.params.id;

        try {
            const isDeleted = await UserContactDetail.delete(contatDetailId, userId);
            if(isDeleted) {
                return res.status(200).json({ "message": "Deleted Successfully"});
            } else {
                return res.status(400).json({ "message": "Something went worng."});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    findAllJobs: [async (req, res) => {
        const userId = req.userId;

        try {
            const jobs = await UserJobDetail.findAll(userId);
            return res.status(200).json({ "message": "User Jobs", data: jobs});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],
    
    findSingleJob: [async (req, res) => {
        const userId = req.userId;
        const jobDetailId = req.params.id;
        
        try {
            const row = await UserJobDetail.get(jobDetailId, userId);
            if(typeof row === 'undefined') {
                return res.status(404).json({ "message": "No Record Found."});
            }else {
                return res.status(200).json({ "message": `User Job <Job Id: ${jobDetailId}>`, data: row});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    deleteJob: [async (req, res) => {
        const userId = req.userId;
        const jobDetailId = req.params.id;

        try {
            const isDeleted = await UserJobDetail.delete(jobDetailId, userId);
            if(isDeleted) {
                return res.status(200).json({ "message": "Deleted Successfully"});
            } else {
                return res.status(400).json({ "message": "Something went worng."});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    findAllEducations: [async (req, res) => {
        const userId = req.userId;
        try {
            const educations = await UserEducationalDetail.findAll(userId);
            return res.status(200).json({ "message": "User Educations", data: educations});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],
    
    findSingleEducation: [async (req, res) => {
        const userId = req.userId;
        const educationDetailId = req.params.id;
        
        try {
            const row = await UserEducationalDetail.get(educationDetailId, userId);
            if(typeof row === 'undefined') {
                return res.status(404).json({ "message": "No Record Found."});
            }else {
                return res.status(200).json({ "message": `User Education <Id: ${educationDetailId}>`, data: row});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    deleteEducation: [async (req, res) => {
        const userId = req.userId;
        const educationDetailId = req.params.id;

        try {
            const isDeleted = await UserEducationalDetail.delete(educationDetailId, userId);
            if(isDeleted) {
                return res.status(200).json({ "message": "Deleted Successfully"});
            } else {
                return res.status(400).json({ "message": "Something went worng."});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    deleteMatrimonialDetail: [async (req, res) => {
        const userId = req.userId;

        try {
            const row = await UserMatrimonialDetail.findByUserId(userId);
            if(typeof row !== "undefined") {
                if(row.proposal_photos) {
                    uploadService.deleteFiles(row.proposal_photos.split(","));
                }
                if(row.biodata) {
                    console.log("User biodata: ", row.biodata);
                    uploadService.deleteFiles(row.biodata);
                }
                const isDeleted = await UserMatrimonialDetail.delete(userId);
                if(isDeleted) {
                    return res.status(200).json({ "message": "Deleted Successfully"});
                } else {
                    return res.status(400).json({ "message": "Something went worng."});
                }
            } else {
                return res.status(404).json({ "message": "Record Not Found"});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],

    search: [async (req, res) => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const queryString = parsedUrl.query;

            //Fetch data from query object
            const userId = req.userId;
            const communityId = req.communityId;
            const {totalFilteredRecords, searchResult} = await User.search(userId, communityId, queryString);
            return res.status(200).json({ "message": "Search Result", data: {totalFilteredRecords, users: searchResult}});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }

    }],

    searchPartner: [async (req, res) => {
        try {
            const userId = req.userId;
            
            const parsedUrl = url.parse(req.url, true);
            const queryString = parsedUrl.query;

            const {totalFilteredRecords, result} = await User.searchPartner(userId, queryString);

            
            return res.status(200).json({ "message": "Search Result", data: {totalFilteredRecords, users: result}});
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }

    }],

    toggleStatus: [async (req, res) => {
        const userId = req.params.id;

        try {
            const isUpdated = await User.toggleStatus(userId);
            if(isUpdated) {
                return res.status(200).json({ "message": "Status Changed Successfully"});
            } else {
                return res.status(400).json({ "message": "Something went worng."});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }],
    toggleMobileVisibility: [async (req, res) => {
        const userId = req.userId;
        
        try {
            const isUpdated = await User.toggleMobileVisibility(userId);
            if(isUpdated) {
                return res.status(200).json({ "message": "Status Changed Successfully"});
            } else {
                return res.status(400).json({ "message": "Something went worng."});
            }
        } catch (error) {
            return res.status(500).json({ "message": error.message});
        }
    }]
}
