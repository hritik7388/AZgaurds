module.exports = {
	ALL_FIELDS: 'All fields are required',
	TODO_CREATED: 'Todo item created successfully',
	TODO_UPDATED: 'Todo item updated successfully',
	TODO_DELETED: 'Todo item deleted successfully',
	TODO_NOT_FOUND: 'Todo item not found',
	TODOS_FETCHED: 'Todo items fetched successfully',
	TODO_FETCHED: 'Todo item fetched successfully',
	CSV_UPLOAD_SUCCESS: 'Todo items uploaded successfully from CSV',
	CSV_DOWNLOAD_SUCCESS: 'Todo items downloaded successfully in CSV format',
	OTP_SEND: 'OTP sent successfully', // Assuming this is from the signup example
	EMAIL_EXIST: 'Email already exists', // Assuming this is from the signup example
	USER_ALREADY_EXIST: 'User already exists', // Assuming this is from the signup example
	PWD_NOT_MATCH: 'Passwords do not match',  


	SMS_BODY: (otp) => `Your verification code is  ${otp}`,
	REFER_SMS_BODY: (first_name, last_name, referral_code, iosLink, androidLink, webLink) => `${first_name} ${last_name} wants to refer you on this application. 
	Please use ${referral_code} as the referral code. Website Link : ${webLink}, Android Link : ${androidLink}, IOS Link : ${iosLink}`
};