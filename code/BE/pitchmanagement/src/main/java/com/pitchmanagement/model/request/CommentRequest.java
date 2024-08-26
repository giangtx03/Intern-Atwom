package com.pitchmanagement.model.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
public class CommentRequest {
    private Integer id;
    @NotNull
    @Min(value = 1, message = "vui lòng nhập số sao")
    private Integer star;
    private String content;
    @NotNull
    private Integer userId;
    @NotNull
    private Integer pitchId;
    private LocalDateTime updateAt = LocalDateTime.now();
}