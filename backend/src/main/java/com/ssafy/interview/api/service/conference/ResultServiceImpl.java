package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.result.DialogModifyReq;
import com.ssafy.interview.api.request.result.ResultModifyReq;
import com.ssafy.interview.api.response.result.ConferenceResultDetailRes;
import com.ssafy.interview.api.response.result.DialogDetailRes;
import com.ssafy.interview.api.response.result.DialogRes;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceResult;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.interview.Question;
import com.ssafy.interview.db.repository.conference.ConferenceRepository;
import com.ssafy.interview.db.repository.conference.ConferenceResultRepository;
import com.ssafy.interview.db.repository.conference.DialogRepository;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import com.ssafy.interview.db.repository.interview.InterviewTimeRepository;
import com.ssafy.interview.db.repository.user.UserRepository;
import com.ssafy.interview.exception.interview.ApplicantAndOwnerDuplicationException;
import com.ssafy.interview.exception.interview.InterviewTimeModifyResultDuplicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service("ResultService")
public class ResultServiceImpl implements ResultService {

    @Autowired
    DialogRepository dialogRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    InterviewTimeRepository interviewTimeRepository;
    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    ConferenceResultRepository conferenceResultRepository;
    @Autowired
    InterviewRepository interviewRepository;

    @Override
    public List<DialogRes> dialogInAll(Long conferenceID) {
        List<Dialog> dialogs = dialogRepository.findByConference_idOrderById(conferenceID).get();
        List<DialogRes> res = new ArrayList<>();
        for (Dialog dialog : dialogs) {
            Long questionId = dialog.getQuestion() == null ? null : dialog.getQuestion().getId();
            res.add(DialogRes.DialogResBuilder()
                    .dialogID(dialog.getId())
                    .userID(dialog.getUser().getId())
                    .conferenceID(dialog.getConference().getId())
                    .questionID(questionId)
                    .content(dialog.getContent())
//                    .timestamp(dialog.getTimestamp())
                    .build());
        }
        // Group By Question ID
        return res;
    }

    @Override
    public List<DialogRes> dialogInQuestion(Long conferenceID, Long questionID) {
        List<Dialog> dialogs = dialogRepository.findByConference_idAndQuestion_id(conferenceID, questionID).get();
        List<DialogRes> res = new ArrayList<>();
        for (Dialog dialog : dialogs) {
            Long questionId = dialog.getQuestion() == null ? null : dialog.getQuestion().getId();
            res.add(DialogRes.DialogResBuilder()
                    .dialogID(dialog.getId())
                    .userID(dialog.getUser().getId())
                    .conferenceID(dialog.getConference().getId())
                    .questionID(questionId)
                    .content(dialog.getContent())
                    .build());
        }
        return res;
    }

    @Override
    @Transactional
    public void updateOneDialog(DialogModifyReq dialogInfo) {
        Dialog dialog = dialogRepository.findById(dialogInfo.getDialogID()).get();
        dialog.setContent(dialogInfo.getContent());
    }

    @Override
    @Transactional
    public void updateAllDialog(List<DialogModifyReq> dialogInfo) {
        for (DialogModifyReq info : dialogInfo) {
            Dialog dialog = dialogRepository.findById(info.getDialogID()).get();
            dialog.setContent(info.getContent());
        }
    }

    @Override
    @Transactional
    public void createConferenceResult(Long user_id, Long interview_id, Long interview_time_id) {
        User user = userRepository.findById(user_id).get();

        // 중복 종료 체크!!!
        DuplicateInterviewTimeModifyState(user.getName(), interview_time_id);

        Conference conference = conferenceRepository.findByInterviewTime_Id(interview_time_id).get();

        // dialog 가져오기
        List<Dialog> dialogList = dialogRepository.findAllByConferenceId(conference.getId());
        HashMap<Question, String> resultMap = new LinkedHashMap<>();
        String header = null;
        String content = null;
        String nullQuestion = "";
        for (Dialog curDialog : dialogList) {
            if (curDialog.getUser().getId() != user_id) { // header 갱신
                header = "[" + curDialog.getUser().getName() + "(답변자)" + "   /   " + curDialog.getTimestamp() + "]" + "<br>";
            } else {
                header = "[" + curDialog.getUser().getName() + "(질문자)" + "   /   " + curDialog.getTimestamp() + "]" + "<br>";
            }
            content = ": " + curDialog.getContent() + "<br><br>";

            if (curDialog.getQuestion() == null) {
                nullQuestion += (header + content);
            } else {
                Question question = curDialog.getQuestion();

                if (!resultMap.containsKey(question)) { // question_id의 존재에 따라 text를 계속 저장해준다
                    resultMap.put(question, header + content);
                } else {
                    String text = resultMap.get(question);
                    text += (header + content);
                    resultMap.replace(question, text);
                }
            }
        }

        // Question Id 가 null인 경우 저장
        conferenceResultRepository.save(ConferenceResult.builder().content(nullQuestion).conference(conference).build());

        // Question 별 정리한 text로 conferenceResult 생성
        if (!resultMap.isEmpty()) {
            Set<Map.Entry<Question, String>> setMap = resultMap.entrySet();

            for (Map.Entry<Question, String> entry : setMap) {
                conferenceResultRepository.save(ConferenceResult.builder().content(entry.getValue()).conference(conference).question(entry.getKey()).build());
            }
        }

    }

    @Override
    public ConferenceResultDetailRes searchConferenceResult(Long user_id, Long interview_id, Long interview_time_id) {
        User user = userRepository.findById(user_id).get();

        // 내가 작성한 인터뷰가 맞는지 여부 확인
        equalOwnerIdAndUserId(user.getName(), user_id, interview_id);

        ConferenceResultDetailRes conferenceResultDetailRes = conferenceRepository.findConferenceResultDetailRes(interview_time_id);
        conferenceResultDetailRes.setConferenceResultRes(conferenceResultRepository.findConferenceResultRes(conferenceResultDetailRes.getConference_id()));

        return conferenceResultDetailRes;
    }

    @Override
    @Transactional
    public void updateConferenceResult(ResultModifyReq resultModifyReq) {
        ConferenceResult conferenceResult = conferenceResultRepository.findById(resultModifyReq.getResult_id()).orElseThrow(() -> new IllegalArgumentException("해당 결과 아이디는 없습니다. id=" + resultModifyReq.getResult_id()));

        // 해당 질문에 따른 결과 수정
        conferenceResult.updateConferenceResult(resultModifyReq.getResult_content());
    }

    @Override
    public List<DialogDetailRes> searchDialogDetailRes(Long user_id, Long interview_id, Long interview_time_id) {
        User user = userRepository.findById(user_id).get();

        // 내가 작성한 인터뷰가 맞는지 여부 확인
        equalOwnerIdAndUserId(user.getName(), user_id, interview_id);

        Conference conference = conferenceRepository.findByInterviewTime_Id(interview_time_id).get();


        return dialogRepository.findDialogDetailRes(conference.getId());
    }

    @Override
    @Transactional
    public void deleteDialog(Long dialog_id) {
        // 해당 Dialog 삭제
        dialogRepository.deleteById(dialog_id);
    }

    /**
     * 이미 끝난 인터뷰 회의방인지 확인
     *
     * @param name              로그인한 유저 이름
     * @param interview_time_id 해당 인터뷰 Id
     */
    private void DuplicateInterviewTimeModifyState(String name, Long interview_time_id) {
        if (interviewTimeRepository.existModifyStateByState(interview_time_id)) {
            throw new InterviewTimeModifyResultDuplicationException(name + "님!");
        }
    }

    /**
     * 내가 작성한 인터뷰가 맞는지 여부 확인
     *
     * @param name         로그인한 유저 이름
     * @param user_id      중복검사 할 로그인 Id
     * @param interview_id 해당 인터뷰 Id
     */
    private void equalOwnerIdAndUserId(String name, Long user_id, Long interview_id) {
        if (!interviewRepository.existInterviewByUserId(user_id, interview_id)) {
            throw new ApplicantAndOwnerDuplicationException(name + "님! 작성자와 일치하지않아 권한이 없습니다.");
        }
    }

}
