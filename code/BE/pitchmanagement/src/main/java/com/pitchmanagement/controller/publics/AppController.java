package com.pitchmanagement.controller.publics;

import java.util.List;

import com.pitchmanagement.dto.CommentDTO;
import com.pitchmanagement.dto.PitchTimeDTO;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.CommentService;
import com.pitchmanagement.service.ImageService;

import com.pitchmanagement.util.JwtUtil;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}")
public class AppController {

    private final ImageService imageService;
    private final CommentService commentService;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @GetMapping("/image/{image_name}")
    public ResponseEntity<?> getImage(
            @PathVariable("image_name") String imageName) {
        try {
            Resource source = imageService.download(imageName);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(source);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @GetMapping("/comment/{id}")
    public ResponseEntity<?> getCommentByPitch(
            @Min(value = 1, message = "pitch id must be greater than 0") @PathVariable("id") Integer pitch_id,
            @RequestParam(name = "keySearch", defaultValue = "", required = false) Integer user_id,
            @RequestParam(name = "page", defaultValue = "1", required = false) Integer offset,
            @RequestParam(name = "limit", defaultValue = "5", required = false) Integer limit,
            @RequestParam(name = "order", defaultValue = "DESC", required = false) String order) {
        try {
            List<CommentDTO> lst = commentService.GetCommentByPitch(pitch_id, user_id, offset, limit,order);
            logger.info("Search comment for pitch: userId: {}, order: {} in Controller", user_id, order);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("success")
                    .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/comment/total/{id}")
    public ResponseEntity<?> total(
        @Min(value = 1, message = "pitch id must be greater than 0") @PathVariable("id") Integer pitch_id,
        @RequestParam(name = "keySearch", defaultValue = "", required = false) Integer user_id) {
        try {
            Integer lst = commentService.total(pitch_id,user_id);
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("success")
                    .data(lst)
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            BaseResponse response = BaseResponse.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("failed: " + e)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
