package com.kitact.data.dto;

import com.kitact.data.model.Menu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestaurantDTON {
    private long restaurantId;
    private String restaurantName;
    private String ownerName;
    private String largeCategory;
    private String midiumCategory;
    private String smallCategory;
    private String imageUri;
    private String address;
    private String tel;
    private String detail;
    private List<String> tags;
    private int totalSeatCount;
    private int vacancyCount;
    private int lng;
    private int lat;
    private String openTime;
    private String closeTime;
    private String holiday;
    private List<SeatDTO> seats;
    private List<MenuDTO> menus;
}
