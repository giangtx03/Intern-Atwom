package com.pitchmanagement.dto;

import java.sql.Date;

import org.springframework.boot.context.properties.bind.Name;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PitchDTO {
    private Integer id;
    private String name;
    private String address;
    private Date create_at;
    private Date update_at;
    private Integer pitch_type_id;
}
