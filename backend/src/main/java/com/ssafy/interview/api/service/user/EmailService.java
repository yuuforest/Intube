package com.ssafy.interview.api.service.user;

public interface EmailService {
    String sendAuthCode(String to) throws Exception;
    String sendRandomPassword(String to) throws Exception;
}
