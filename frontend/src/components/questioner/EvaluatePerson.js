import "components/questioner/EvaluatePerson.css";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import http from "api/Http";

const EvalPerson = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, name, email } = props;

  const [Honest, setHonest] = useState("");
  const setHonestChange = event => {
    setHonest(event.target.value);
  };
  const [Ontime, setOntime] = useState("");
  const setOntimeChange = event => {
    setOntime(event.target.value);
  };
  const [NextChance, setNextChance] = useState("");
  const setNextChanceChange = event => {
    setNextChance(event.target.value);
  };

  // const [closeButton, setcloseButton] = useState(true);

  const countApi = async () => {
    const count = (Number(Honest) + Number(Ontime) + Number(NextChance)) / 6;
    console.log("count: " + count);
    const key = count >= 0 ? 1 : 0;
    console.log("key: " + key);
    const temperature = count >= 0 ? count : -count;
    console.log("tempoerature: " + temperature);
    let data = {
      email: email,
      temperature: temperature,
      key: key,
    };
    try {
      const response = await http.put("/user/temperature", data);
      console.log(response);
    } catch {}
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <FormControl>
              <FormLabel id="demo-form-control-label-placement" sx={{ mt: 1 }}>
                {name}님이 성실하게 답변해주셨나요?????
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="Honest"
                defaultValue={0}
                value={Honest}
                onChange={setHonestChange}
                sx={{ mb: 4 }}
              >
                <FormControlLabel value={1} control={<Radio />} label="예" />
                <FormControlLabel value={0} control={<Radio />} label="보통" />
                <FormControlLabel
                  value={-1}
                  control={<Radio />}
                  label="아니오"
                />
              </RadioGroup>
              <FormLabel id="demo-form-control-label-placement">
                {name}님이 시간약속을 잘 지켜주셨나요?????
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="Ontime"
                defaultValue={0}
                value={Ontime}
                onChange={setOntimeChange}
                sx={{ mb: 4 }}
              >
                <FormControlLabel value={1} control={<Radio />} label="예" />
                <FormControlLabel value={0} control={<Radio />} label="보통" />
                <FormControlLabel
                  value={-1}
                  control={<Radio />}
                  label="아니오"
                />
              </RadioGroup>
              <FormLabel id="demo-form-control-label-placement">
                {name}님과 다음에도 인터뷰를 진행하고 싶으신가요?????
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="NextChance"
                defaultValue={0}
                value={NextChance}
                onChange={setNextChanceChange}
                sx={{ mb: 2 }}
              >
                <FormControlLabel value={1} control={<Radio />} label="예" />
                <FormControlLabel value={0} control={<Radio />} label="보통" />
                <FormControlLabel
                  value={-1}
                  control={<Radio />}
                  label="아니오"
                />
              </RadioGroup>
            </FormControl>
          </main>
          <footer>
            <button
              className="close"
              onClick={() => {
                countApi();
                props.setModalOpen(false);
              }}
            >
              답변 완료😁
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default EvalPerson;
