package com.pitchmanagement.dao;

import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.dto.admin.EditPitchImageDto;
import com.pitchmanagement.model.request.ImageRequest;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ImageDao {

    List<EditPitchImageDto> getImageByEditPitchId(@Param("pitchId") int pitchId);

    List<ImageDto> getImageByPitchId(@Param("pitchId") Long pitchId);

    ImageDto getImageById(Long id);

    void insertImage(ImageRequest  imageDto);

    void deleteImage(Long id);

    @Delete("<script>"
            + "DELETE FROM image WHERE pitch_id = #{pitchId} "
            + "<if test='imgIds != null and !imgIds.isEmpty()'>"
            + "AND id NOT IN "
            + "<foreach item='id' collection='imgIds' open='(' separator=',' close=')'>"
            + "#{id}"
            + "</foreach>"
            + "</if>"
            + "</script>")
    void deleteByPitchIdAndNotIn(@Param("pitchId") Integer pitchId, @Param("imgIds") List<Integer> imgIds);

}
