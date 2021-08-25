package com.kitact.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchImageRequestDTO {
    private String query = "";
    private int display = 1;
    private int start = 1;
    private String sort = Sort.SIM.getStr();
    private String filter = Filter.ALL.getStr();

    public MultiValueMap<String, String> toMultiValueMap() {
        LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("query", query);
        map.add("display", String.valueOf(display));
        map.add("start", String.valueOf(start));
        map.add("sort", sort);
        map.add("filter", filter);

        return map;
    }

    @Getter
    enum Sort {
        SIM("sim"),
        DATE("date");

        private final String str;

        Sort(String str) {
            this.str = str;
        }
    }

    @Getter
    enum Filter {
        ALL("all"),
        LARGE("large"),
        MEDIUM("medium"),
        SMALL("small");

        private final String str;

        Filter(String str) {
            this.str = str;
        }
    }
}
