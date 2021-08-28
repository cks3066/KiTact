package com.kitact.data.dto;

import com.kitact.data.model.Menu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantDTO {
    private long restaurantId;
    private String restaurantName;
    private String ownerName;
    private String largeCategory;
    private String mediumCategory;
    private String smallCategory;
    private String imageUrl;
    private String address;
    private String tel;
    private String detail;
    private List<String> tags;
    private Integer totalSeatCount;
    private Integer  vacancyCount;
    private Integer lng;
    private Integer lat;
    private String openTime;
    private String closeTime;
    private String holiday;
    private List<SeatDTO> seats;
    private List<MenuDTO> menus;
}
