package com.pitchmanagement.controller;

import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.model.request.ImageRequest;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.model.response.BaseResponse;
import com.pitchmanagement.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("${api.prefix}/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    ResponseEntity<BaseResponse> addImagePitch(
            @RequestParam("file") MultipartFile file,
            @RequestParam("pitchId") int pitchId) {

        // Xử lý việc lưu trữ file và các thao tác khác
        ImageRequest imageRequest = new ImageRequest();
        imageRequest.setName(file.getOriginalFilename());
        imageRequest.setPitchId(pitchId);


        ImageRequest img = imageService.addImg(imageRequest);
        System.out.println(img);

        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(img)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
