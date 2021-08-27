package com.kitact.data.dto;

import lombok.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
/**
 * 네이버 지역 검색 API 호출 시 전달되는 DTO 클래스
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchLocalRequestDTO {
    private String query = ""; // 검색을 원하는 문자열로서 UTF-8로 인코딩한다.
    private int display = 1; // 검색 결과 출력 건수 지정(1 ~ 5)
    private int start = 1; // 검색 시작 위치로 1만 가능
    private String sort = Sort.RANDOM.getStr(); // 정렬 옵션: random(유사도순), comment(카페/블로그 리뷰 개수 순)

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
