package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class PitchResponse {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("address")
    private String address;
    @JsonProperty("create_at")
    private LocalDateTime createAt;
    @JsonProperty("update_at")
    private LocalDateTime updateAt;
    @JsonProperty("pitch_type_name")
    private String pitchTypeName;
    @JsonProperty("images")
    private List<ImageDto> images;
    @JsonProperty("times")
    private List<PitchTimeChildrenDto> times;
    @JsonProperty("avg_star")
    private double avgStar;

    public static PitchResponse fromSrc(Map<String, Object> src, List<ImageDto> images, List<PitchTimeChildrenDto> times){
        return PitchResponse.builder()
                .id(Long.parseLong(src.get("id").toString()))
                .address(src.get("address") != null ? src.get("address").toString() : "")
                .name(src.get("name").toString())
                .createAt(src.get("createAt") != null ? LocalDateTime.parse(src.get("createAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .updateAt(src.get("updateAt") != null ? LocalDateTime.parse(src.get("updateAt").toString().replace(".0",""), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null)
                .pitchTypeName(src.get("pitchTypeName").toString())
                .images(images)
                .times(times)
                .avgStar(src.get("avgStar") != null ? Double.parseDouble(src.get("avgStar").toString()) : 0)
                .build();
    }
}
