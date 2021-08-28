package com.kitact.data.dto;

import lombok.*;

/**
 * 음식점의 정보를 담고있는 DTO 클래스
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantDTO {
    private String restaurant_name;
    private String large_category;
    private String medium_category;
    private String small_category;
    private String img;
    private String address;
    private String tel;
    private String opentime;
    private String closetime;
    private String holiday;
    private String detail;
    private String tags;
    private Integer lng;
    private Integer lat;
    private Integer total_seat_count;
    private Integer vacancy_count;
    private Integer owner;
}
