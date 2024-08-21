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

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PreAuthorize("ROLE_ADMIN")
    @PostMapping("/admin")
    ResponseEntity<BaseResponse> addImagePitch(
            @RequestParam("file") MultipartFile file,
            @RequestParam("pitchId") int pitchId) throws Exception {

        ImageRequest img = imageService.addImg(file, pitchId);

        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(img)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @DeleteMapping("/admin")
    ResponseEntity<BaseResponse> delImgById(@RequestParam Long id) throws IOException {

        imageService.deleteDB(id);

        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("ROLE_ADMIN")
    @GetMapping("/admin")
    ResponseEntity<BaseResponse> getImgByPitchId(@RequestParam Long pitchId)  {

        List<ImageDto> img = imageService.getImgByPitchId(pitchId);

        BaseResponse response = BaseResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(img)
                .message("success")
                .build();

        return ResponseEntity.ok().body(response);
    }
}
