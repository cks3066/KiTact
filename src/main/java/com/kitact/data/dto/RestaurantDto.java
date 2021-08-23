package com.kitact.data.dto;

import com.kitact.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDto {
    private String restaurant_name;
    private String tag;
    private String address;
    private String telephone;
    private String openinghours;
    private String big_category;
    private String small_category;
    private Double lat;
    private Double lng;
}
