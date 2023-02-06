package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.db.repository.conference.DialogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ResultService")
public class ResultServiceImpl implements ResultService {

    @Autowired
    DialogRepository dialogRepository;
}
