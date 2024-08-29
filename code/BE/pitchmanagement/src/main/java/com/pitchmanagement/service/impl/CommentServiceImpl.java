package com.pitchmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import com.pitchmanagement.util.JwtUtil;
import lombok.RequiredArgsConstructor;

import org.apache.ibatis.javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Override
    public List<CommentDTO> GetCommentByPitch(Integer pitch_id,Integer user_id, Integer offset, Integer limit, String order) {
        PageHelper.startPage(offset, limit);
        PageHelper.orderBy("cm.star " + order +", cm.update_at DESC");
        List<CommentDTO> lst = commentDAO.GetCommentByPitch(pitch_id,user_id,order);
        logger.info("Search comment for pitch: userId: {}, order: {} in Service", user_id, order);
        return lst;
    }

    public Integer total(Integer picth_id,Integer user_id){
        return commentDAO.total(picth_id,user_id);
    }

    @Override
    public void insert(CommentRequest commentRequest) {
        commentDAO.insert(commentRequest);
    }

    @Override
    public void update(CommentRequest commentRequest)  {
        CommentDTO comment = commentDAO.selectById(commentRequest.getId());
        if(comment == null){
            try {
                throw new NotFoundException("Không tìm thấy comment");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        commentDAO.update(commentRequest);
    }

    @Override
    public void delete(Integer id) {
        CommentDTO comment = commentDAO.selectById(id);
        if(comment == null){
            try {
                throw new NotFoundException("Không tìm thấy comment");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        commentDAO.delete(id);
    }
}
