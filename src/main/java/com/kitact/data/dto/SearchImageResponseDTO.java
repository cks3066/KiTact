package com.kitact.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchImageResponseDTO {
    private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<SearchImageItem> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchImageItem{
        private String title;  // 검색 결과 업체, 기관명을 나타낸다.
        private String link;  // 검색 결과 업체, 기관의 상세 정보가 제공되는 네이버 페이지의 하이퍼텍스트 link를 나타낸다.
        private String thumbnail;  // 검색 결과 이미지의 썸네일 link를 나타낸다.
        private String sizeHeight;  // 검색 결과 이미지의 썸네일 높이를 나타낸다.
        private String sizeWidth;  // 검색 결과 이미지의 너비를 나타낸다. 단위는 pixel이다.
    }
}
