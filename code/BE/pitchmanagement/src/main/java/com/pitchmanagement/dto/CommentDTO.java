package com.pitchmanagement.dto;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Integer id;
    private Integer star;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Integer userId;
    private Integer pitchId;
    private String fullname;
    private String avatar;
}
