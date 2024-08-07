package com.pitchmanagement.model.request;

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
    private Integer star;
    private String content;
    @NotNull
    private Integer user_id;
    @NotNull
    private Integer pitch_id;
}
