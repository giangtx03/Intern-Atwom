package com.pitchmanagement.dto.admin;

import com.pitchmanagement.dto.ImageDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EditPitchRequestDto {

    private Integer id;
    private String name;
    private String address;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Integer pitchTypeId;
    private List<EditPitchTimeRequestDto> editPitchTimeRequestDtos;
    private List<EditPitchImageDto> imageDtos;

}
