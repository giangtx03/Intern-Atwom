package com.pitchmanagement.dao;

import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.model.request.ImageRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ImageDao {

    List<ImageDto> getImageByPitchId(@Param("pitchId") Long pitchId);

    void insertImage(ImageRequest  imageDto);

}
