import AsyncHandler from "../utils/async-handler.js";

/**
 * @route POST /user/register
 * @desc Register user controller
 * @access public
 */
export const registerUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. get data from req.body
2. check for all required fields
3. validate user details
4. check user already exists using email
5. save verification in Redis
6. save user details to DB
7. generate tokens
8. send verification mail
9. send response
10. welcome mail
*/
});

/**
 * @route POST /user/login
 * @desc Login user controller
 * @access public
 */
export const loginUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. get email & password from req.body
2. check for all required fields
3. check user already exists using email
4. check for email verification
5. verify credentials
6. generate access & refresh tokens
7. save refresh token in redis
8. send response
*/
});

/**
 * @route POST /user/verify-email
 * @desc Verify email controller
 * @access public
 */
export const verifyEmail = AsyncHandler(async (req: any, res: any) => {
  /*
1. get verification token from the query 
2. get verify-email token from redis
3. check whether they are matched or not 
4. if matched then update user info. as isVerified= true
5. send response
*/
});

/**
 * @route POST /user/logout
 * @desc logout user controller
 * @access public
 */
export const logoutUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. clear all cookies of the user
2. clear refresh token from redis also
3. send response
  */
});

/**
 * @route POST /user/logout
 * @desc Refresh access token controller
 * @access public
 */
export const refreshAccessToken = AsyncHandler(async (req: any, res: any) => {
  /*
1. get refresh token from cookies
2. check for token expiry
3. verify the refresh token matching with token in Redis
4. call generateToken() for access token
5. send token in cookies
  */
});

/**
 * @route GET /user/profile
 * @desc get user profile controller
 * @access private
 */
export const getUserProfile = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. check user exists or not
3. send user info.
  */
});

/**
 * @route PATCH /user/profile
 * @desc update user profile controller
 * @access private
 */
export const updateUserProfile = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. get data from req.body
3. validate data
4. update data in db
5. send response
  */
});

/**
 * @route put /user/password
 * @desc update user profile controller
 * @access private
 */
export const changePassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get data from req.body
2. check for all required fields
3. validate data
4. update password in db
5. send response
  */
});

/**
 * @route POST /user/forgot-password
 * @desc forgot password controller
 * @access public
 */
export const forgotPassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get email from req.body
2. find user from db
3. generate 6-digit otp
4. store the otp & email in redis for 10 min
5. send otp in email
6. send response
  */
});

/**
 * @route POST /user/reset-password
 * @desc reset password controller
 * @access public
 */
export const resetPassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get data from req.body
2. get otp from redis 
3. verify otp
4. update password in db
5. delete otp
6. send response
 */
});

export const deleteUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. delete user from db 
3. send response
 */
});
