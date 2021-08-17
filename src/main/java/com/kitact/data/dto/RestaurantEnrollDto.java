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
    private String username;
    private String restaurant_name;
    private String category;
    private String address;
    private String telephone;
    private String openinghours;
    private Integer mapx;
    private Integer mapy;
}
