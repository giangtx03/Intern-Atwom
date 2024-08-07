package com.pitchmanagement.model.request;

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
    private Integer star;
    private String content;
    private Integer user_id;
    private Integer pitch_id;
}
