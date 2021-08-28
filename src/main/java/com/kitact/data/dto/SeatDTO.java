package com.kitact.data.dto;

import com.kitact.data.model.Seat;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SeatDTO {
    private Long restaurantId;
    private String type;
    private Integer posX;
    private Integer posY;
    private Integer people;
    private Boolean vacancy;
    private String client;

    public SeatDTO(Seat seat) {
        this.restaurantId = seat.getRestaurant().getRestaurant_id();
        this.type = seat.getType();
        this.posX = seat.getX();
        this.posY = seat.getY();
        this.people = seat.getPeople();
        this.vacancy = seat.getVacancy();
        this.client = seat.getClient();
    }
}
