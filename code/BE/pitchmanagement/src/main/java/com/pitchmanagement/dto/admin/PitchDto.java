package com.pitchmanagement.dto.admin;

import com.pitchmanagement.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class PitchDto {

    private Integer id;
    private String name;
    private String address;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String type;
    private Integer sumTime;
    private Integer sumImg;
    private List<PitchTimeChildrenDto> pitchTimeChildrenDtos;
    private List<ImageDto> imageDtos;

    public PitchDto (Integer id, String name, String address, LocalDateTime createAt, LocalDateTime updateAt, String type, Integer sumTime, Integer sumImg) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.type = type;
        this.sumTime = sumTime;
        this.sumImg = sumImg;
    }
}
