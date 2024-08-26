package com.pitchmanagement.service;

import java.util.List;

import org.apache.ibatis.javassist.NotFoundException;

import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.model.request.CommentRequest;

public interface CommentService {
    List<CommentDTO> GetCommentByPitch(Integer pitch_id, Integer user_id, Integer offset, Integer limit, String order);

    Integer total(Integer picth_id, Integer user_id);

    void insert(CommentRequest commentRequest);

    void update(CommentRequest commentRequest) ;

    void delete(Integer id);
}