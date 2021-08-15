package com.kitact.data.model;
import com.kitact.data.model.base.TimeStamped;

import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Order extends TimeStamped {
    public Order(Restaurant restaurant_id, Reservation reservation_id) {
        this.restaurant_id = restaurant_id;
        this.reservation_id = reservation_id;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long order_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant_id;

    @OneToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Reservation reservation_id;
}
