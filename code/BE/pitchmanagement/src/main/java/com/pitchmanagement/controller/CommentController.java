package com.pitchmanagement.controller;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.model.request.CommentRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("{id}")
    public ResponseEntity<?> getCommentByPitch(@PathVariable("id") Integer pitch_id,@RequestParam("offset") Integer offset,@RequestParam("limit")Integer limit ){
        try {
            List<CommentDTO> lst = commentService.GetCommentByPitch(pitch_id,offset,limit);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("success")
                    .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> insert (@RequestBody CommentRequest commentRequest){
        try {
            commentService.insert(commentRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("success")
                    // .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping
    public ResponseEntity<?> update (@RequestBody CommentRequest commentRequest){
        try {
            commentService.update(commentRequest);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("success")
                    // .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable("id") Integer id){
        try {
            commentService.delete(id);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("success")
                    // .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.CREATED)
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
