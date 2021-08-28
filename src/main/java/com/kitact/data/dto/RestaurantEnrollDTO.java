package com.kitact.data.dto;

import lombok.*;

import java.util.List;

/**
 * 음식점 정보를 등록할 때 전달되는 DTO 클래스
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantEnrollDTO {
    private List<String> tags;
}
