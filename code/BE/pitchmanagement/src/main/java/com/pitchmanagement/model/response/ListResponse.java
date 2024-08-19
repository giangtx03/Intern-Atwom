package com.pitchmanagement.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class ListResponse {

    @JsonProperty("items")
    private Object items;

    @JsonProperty("total_items")
    private Long totalItems;

    @JsonProperty("total_pages")
    private int totalPages;

}
