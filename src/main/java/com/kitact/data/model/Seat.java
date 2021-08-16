package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_seat")
public class Seat extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seat_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant_id;

    @Column(nullable = false)
    private Integer seat_size;

    @Column(nullable = false)
    private String location;

    public Seat(Restaurant restaurant_id, Integer seat_size, String location) {
        this.restaurant_id = restaurant_id;
        this.seat_size = seat_size;
        this.location = location;
    }
}
