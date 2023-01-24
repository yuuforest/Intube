package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.UserModifyReq;
import com.ssafy.interview.api.request.UserRegisterPostReq;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.UserRepository;
import com.ssafy.interview.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public void createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setEmail(userRegisterInfo.getEmail());
		user.setName(userRegisterInfo.getName());
		user.setNickname(userRegisterInfo.getNickname());
		user.setPhone(userRegisterInfo.getPhone());
		user.setGender(userRegisterInfo.getGender());
		user.setBirth(userRegisterInfo.getBirth());
		user.setIntroduction(userRegisterInfo.getIntroduction());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		userRepository.save(user);
	}

//	@Override
//	public void updateUser(UserModifyReq userModifyInfo) {
//		userRepositorySupport.updateByEmail(userModifyInfo.getEmail(),
//				passwordEncoder.encode(userModifyInfo.getPassword()), userModifyInfo.getName(), userModifyInfo.getNickname(),
//				userModifyInfo.getPhone(), userModifyInfo.getGender(), userModifyInfo.getBirth(),
//				userModifyInfo.getIntroduction(), userModifyInfo.getTemperature(), userModifyInfo.getAuthorization(),
//				userModifyInfo.getPoint(), userModifyInfo.getProfile_url());
//	}

	@Override
	public void deleteUser(String email) {
		User user = userRepository.findByEmail(email).get();
		userRepository.delete(user);
	}

	public Optional<User> testUserByEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User getUserByEmail(String email) {
		// 디비에 유저 정보 조회 (email 를 통한 조회).
		Optional<User> user = userRepositorySupport.findUserByEmail(email);
		if (user.isPresent()){
			return user.get();
		}
		return null;
	}
}
