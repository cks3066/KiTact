package com.kitact.data.dto;

import com.kitact.data.model.Menu;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MenuDTO {
    private Long restaurantId;
    private String imageUri;
    private String menuName;
    private Integer menuPrice;
    private Boolean active;
    private Integer quantity;

    public MenuDTO (Menu menu) {
        this.restaurantId = menu.getRestaurant().getRestaurant_id();
        this.imageUri = menu.getSrc();
        this.menuName = menu.getMenu_name();
        this.menuPrice = menu.getMenu_price();
        this.active = true;
        this.quantity = 0;
    }
}
