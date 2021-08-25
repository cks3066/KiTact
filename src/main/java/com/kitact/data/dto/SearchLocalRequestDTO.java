package com.kitact.data.dto;

import lombok.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchLocalRequestDTO {
    private String query = "";
    private int display = 1;
    private int start = 1;
    private String sort = Sort.RANDOM.getStr();

    public MultiValueMap<String, String> toMultiValueMap() {
        LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("query", query);
        map.add("display", String.valueOf(display));
        map.add("start", String.valueOf(start));
        map.add("sort", sort);

        return map;
    }

    @Getter
    enum Sort {
        RANDOM("random"),
        COMMENT("comment");

        private final String str;

        Sort(String str) {
            this.str = str;
        }
    }
}
