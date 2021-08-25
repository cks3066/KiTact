package com.kitact.data.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantDto {
    private String restaurant_name;
    private String large_category;
    private String medium_category;
    private String small_category;
    private String img;
    private String address;
    private String tel;
    private String time;
    private String detail;
    private String tags;
    private Integer lng;
    private Integer lat;
    private Integer total_seat_count;
    private Integer vacancy;
}
