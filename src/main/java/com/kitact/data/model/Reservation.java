package com.kitact.data.model;
import com.kitact.data.model.base.TimeStamped;

import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Reservation {
    public Reservation(User user_id, Restaurant restaurant_id, Boolean is_ended) {
        this.user_id = user_id;
        this.restaurant_id = restaurant_id;
        this.is_ended = is_ended;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long reservation_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private User user_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant_id;

    @Column
    private Boolean is_ended;
}
