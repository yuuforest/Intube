import { useEffect, useState } from "react";

const getSeconds = time => {
  const seconds = Number(time % 60);
  if (seconds < 10) {
    return "0" + String(seconds);
  } else {
    return String(seconds);
  }
};

const Timer = () => {
  const [time, setTime] = useState(300); // 남은 시간 (단위: 초)
  useEffect(() => {
    if (time < 0) {
      alert("인증 시간 만료. 다시 인증해주세요.");
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);
  return (
    <div>
      <div>
        <span>{parseInt(time / 60)}</span>
        <span> : </span>
        <span>{getSeconds(time)}</span>
      </div>
    </div>
  );
};

export default Timer;
