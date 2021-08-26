package com.kitact.data.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SeatDto {
    private Long restaurant_id;
    private String type;
    private Integer x;
    private Integer y;
    private Integer people;
    private Boolean vacancy;
    private String client;
}
