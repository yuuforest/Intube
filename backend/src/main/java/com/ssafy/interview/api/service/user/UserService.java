package com.ssafy.interview.api.service.user;

import com.ssafy.interview.api.request.user.UserModifyPutReq;
import com.ssafy.interview.api.request.user.UserPasswordPutReq;
import com.ssafy.interview.api.request.user.UserRegisterPostReq;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	void createUser(UserRegisterPostReq userRegisterInfo);
	void updateUser(UserModifyPutReq userModifyInfo);
	void updatePassword(String email, String newPassword);
	void deleteUser(String email);
//	Optional<User> testUserByEmail(String email);
//	User getUserByEmail(String email);
	void uploadImage(String email, String url);
}
