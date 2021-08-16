package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;

import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_order")
public class Order extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant;

    @OneToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Reservation reservation;

    public Order(Restaurant restaurant_id, Reservation reservation_id) {
        this.restaurant = restaurant_id;
        this.reservation = reservation_id;
    }
}
