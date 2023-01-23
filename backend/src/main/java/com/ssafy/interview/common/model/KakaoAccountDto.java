package com.ssafy.interview.common.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoAccountDto {

    private Boolean hasEmail;
    private Boolean emailNeedsAgreement;
    private Boolean isEmailValid;
    private Boolean isEmailVerified;
    private String email;
    private Boolean hasGender;
    private Boolean genderNeedsAgreement;
    private String gender;

    public KakaoAccountDto(JsonNode kakaoAccount) {
        this.hasEmail = kakaoAccount.get("has_email").asBoolean();
        this.emailNeedsAgreement = kakaoAccount.get("email_needs_agreement").asBoolean();
        this.isEmailValid = kakaoAccount.get("is_email_valid").asBoolean();
        this.isEmailVerified = kakaoAccount.get("is_email_verified").asBoolean();
        this.email = kakaoAccount.get("email").asText();
        if (kakaoAccount.has("has_gender"))
            this.hasGender = kakaoAccount.get("has_gender").asBoolean();
        if (kakaoAccount.has("gender_needs_agreement"))
            this.genderNeedsAgreement = kakaoAccount.get("gender_needs_agreement").asBoolean();
        if (kakaoAccount.has("gender"))
            this.gender = kakaoAccount.get("gender").asText();
    }
}