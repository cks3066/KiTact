package com.kitact.data.model;
import com.kitact.data.model.base.TimeStamped;

import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Seat {
    public Seat(Restaurant restaurant_id, Integer seat_count, String location) {
        this.restaurant_id = restaurant_id;
        this.seat_count = seat_count;
        this.location = location;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long seat_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant_id;

    @Column(nullable = false)
    private Integer seat_count;

    @Column(nullable = false)
    private String location;
}
