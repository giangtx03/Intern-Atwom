package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.pitchmanagement.dao.CommentDAO;
import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.model.request.CommentRequest;
import com.pitchmanagement.service.CommentService;

import jakarta.transaction.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentDAO commentDAO;

    @Override
    public List<CommentDTO> GetCommentByPitch(Integer pitch_id,Integer user_id, Integer offset, Integer limit) {
        PageHelper.startPage(offset, limit);
        List<CommentDTO> lst = commentDAO.GetCommentByPitch(pitch_id,user_id);
        return lst;
    }

    public Integer total(Integer picth_id){
        return commentDAO.total(picth_id);
    }

    @Override
    public void insert(CommentRequest commentRequest) {
        commentDAO.insert(commentRequest);
    }

    @Override
    public void update(CommentRequest commentRequest) {
        commentDAO.update(commentRequest);
    }

    @Override
    public void delete(Integer id) {
        commentDAO.delete(id);
    }
}
