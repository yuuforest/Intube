package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.result.dialogModifyReq;
import com.ssafy.interview.api.response.result.DialogRes;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.repository.conference.DialogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service("ResultService")
public class ResultServiceImpl implements ResultService {

    @Autowired
    DialogRepository dialogRepository;

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
                    .timestamp(dialog.getTimestamp())
                    .build());
        }
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
                    .timestamp(dialog.getTimestamp())
                    .build());
        }
        return res;
    }

    @Override
    @Transactional
    public void updateOneDialog(dialogModifyReq dialogInfo) {
        Dialog dialog = dialogRepository.findById(dialogInfo.getDialogID()).get();
        dialog.setContent(dialogInfo.getContent());
    }

    @Override
    @Transactional
    public void updateAllDialog(List<dialogModifyReq> dialogInfos) {
        for (dialogModifyReq info : dialogInfos) {
            Dialog dialog = dialogRepository.findById(info.getDialogID()).get();
            dialog.setContent(info.getContent());
        }
    }
}
