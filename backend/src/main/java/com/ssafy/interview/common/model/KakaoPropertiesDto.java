package com.ssafy.interview.common.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoPropertiesDto {
    private String nickname;
    private String profileImage;
    private String thumbnailImage;

    public KakaoPropertiesDto(JsonNode properties) {
        if (properties.has("nickname"))
            this.nickname = properties.get("nickname").asText();
        if (properties.has("profile_image"))
            this.profileImage = properties.get("profile_image").asText();
        if (properties.has("thumbnail_image"))
            this.thumbnailImage = properties.get("thumbnail_image").asText();
    }
}
