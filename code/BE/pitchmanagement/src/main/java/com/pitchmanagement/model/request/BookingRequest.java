package com.pitchmanagement.model.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
public class BookingRequest {
    private Integer id;
    private String note;
    @NotBlank(message = "status not blank")
    private String status;
    @NotNull(message = "pitch id not null")
    private Integer pitchId;
    @NotNull(message = "time slot id not null")
    private Integer timeSlotId;
    @NotNull(message = "user id not null")
    private Integer userId;
    private LocalDateTime createAt = LocalDateTime.now();
    private LocalDateTime updateAt = LocalDateTime.now();
}
