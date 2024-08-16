package com.pitchmanagement.dto.admin;

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
    private String sumTime;
    private String sumImg;
}
