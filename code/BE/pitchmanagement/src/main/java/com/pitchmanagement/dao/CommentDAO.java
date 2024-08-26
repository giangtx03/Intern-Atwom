package com.pitchmanagement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.model.request.CommentRequest;

@Mapper
public interface CommentDAO {
    List<CommentDTO> GetCommentByPitch(@Param("pitch_id") Integer pitch_id, @Param("user_id") Integer user_id,@Param("order") String order);

    CommentDTO selectById(@Param("id") Integer id);

    Integer total(@Param("pitch_id") Integer pitch_id,@Param("user_id") Integer user_id);

    void insert(CommentRequest comment);

    void update(CommentRequest comment);

    void delete(@Param("id") Integer id);
}