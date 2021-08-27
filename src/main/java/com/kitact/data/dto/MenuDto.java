package com.kitact.data.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MenuDto {
    private Long restaurant_id;
    private String src;
    private String menu_name;
    private Integer menu_price;
}
