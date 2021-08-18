package com.kitact.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantEnrollDto {
    private String restaurant_name;
    private String tag;
    private String address;
    private String telephone;
    private String openinghours;
    private String big_category;
    private String small_category;
    private Float lat;
    private Float lng;
}
