const REST_API_KEY = "dc6c7559412fd1c77ad3e0a798803e27";
const REDIRECT_URI = "https://intube.store:8443/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
