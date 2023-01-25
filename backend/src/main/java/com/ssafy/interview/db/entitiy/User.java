package com.ssafy.interview.db.entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

    String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    String name;

    String nickname;

    String phone;

    String gender;

    @Temporal(TemporalType.DATE)
    Date birth;

    String introduction;

    double temperature;

    int is_email_authorized;

    int point;

    String profile_url;

    @PrePersist
    public void prePersist(){
        this.temperature = this.temperature == 0.0 ? 36.0 : this.temperature;
    }
}
