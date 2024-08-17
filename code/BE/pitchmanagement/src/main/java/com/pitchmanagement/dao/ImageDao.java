package com.pitchmanagement.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

@Mapper
public interface ImageDao {

    Map<String, Object> getImageByPitchId(@Param("pitchId") Long pitchId);

}
