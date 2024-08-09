package com.pitchmanagement.service;

import java.util.List;

import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.model.request.CommentRequest;

public interface CommentService {
    List<CommentDTO> GetCommentByPitch(Integer pitch_id, Integer offset, Integer limit);

    void insert(CommentRequest commentRequest);

    void update(CommentRequest commentRequest);

    void delete(Integer id);
}