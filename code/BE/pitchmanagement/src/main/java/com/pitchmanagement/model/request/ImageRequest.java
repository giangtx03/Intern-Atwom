package com.pitchmanagement.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequest {
    private int id;
    private String name;
    private int pitchId;
}
