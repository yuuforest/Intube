package com.ssafy.interview.api.service.user;

import com.ssafy.interview.api.request.user.UserModifyPutReq;
import com.ssafy.interview.api.request.user.UserRegisterPostReq;
import com.ssafy.interview.db.entitiy.User;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	void createUser(UserRegisterPostReq userRegisterInfo);
	void updateUser(UserModifyPutReq userModifyInfo);
	void updatePassword(String email, String newPassword);
	void deleteUser(String email);
	void uploadImage(String email, String url);
	Optional<User> findByEmail(String email);
	Optional<User> findByNickname(String nickname);
	Optional<User> findEmail(String name, String phone);
	Optional<User> findPassword(String name, String email);
	void updatePoint(String email, int point);
	void updateTemperature(String email, double temperature);
}
