package com.pitchmanagement.service;

import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.model.request.ImageRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    String upload( MultipartFile file) throws  Exception;
    Resource download( String filename) throws Exception;
    void delete( String filename) throws IOException;
    ImageRequest  addImg(MultipartFile file, int pitchId) throws Exception;
    List<ImageDto> getImgByPitchId(Long pitchId);
    void deleteDB (Long id) throws IOException;
}
