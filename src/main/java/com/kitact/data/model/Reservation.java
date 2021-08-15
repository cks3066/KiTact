package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_reservation")
public class Reservation extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reservation_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private User user_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Restaurant restaurant_id;

    @Column
    private Boolean ended;

    public Reservation(User user_id, Restaurant restaurant_id, Boolean is_ended) {
        this.user_id = user_id;
        this.restaurant_id = restaurant_id;
        this.ended = is_ended;
    }
}
