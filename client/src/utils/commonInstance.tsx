import axios from "axios";

let BASE_URL = "";
if (
  import.meta.env.VITE_APP_API_ENDPOINT &&
  typeof import.meta.env.VITE_APP_API_ENDPOINT === "string"
) {
  BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT;
}

const commonInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  timeout: 500, // 백엔드 서버 없다는 가정.
});

// commonInstance.interceptors.response.use(config => {
//   console.log(config.headers);
//   return config;
// });

// 응답 에러 처리 interceptors
commonInstance.interceptors.response.use(
  response => {
    // 응답이 정상적으로 도착한 경우에는 그대로 반환
    return response;
  },
  error => {
    // 응답이 에러인 경우에 대한 처리
    if (error.response) {
      // 서버에서 응답을 받았으나 응답 코드가 2xx가 아닌 경우
      console.error("서버 응답 에러:", error.response.status);
      // 여기서 에러 메시지를 작성하거나 다른 에러 처리 로직을 수행할 수 있음
    } else if (error.request) {
      // 요청이 서버에 도달하지 않은 경우
      console.error("요청 에러:", error.request);
    } else {
      // 요청을 보내기 전에 발생한 에러
      console.error("에러 발생:", error.message);
    }
    return Promise.reject(error); // 에러를 다음 핸들러로 전달
  },
);

export default commonInstance;

// 비회원일 때 사용할 axios 인스턴스
