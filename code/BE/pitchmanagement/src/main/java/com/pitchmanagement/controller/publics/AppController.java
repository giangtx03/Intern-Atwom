package com.pitchmanagement.controller.publics;

import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}")
public class AppController {

    private final ImageService imageService;

    @GetMapping("/image/{image_name}")
    public ResponseEntity<?> getImage(
            @PathVariable("image_name") String imageName
    ){
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

}
