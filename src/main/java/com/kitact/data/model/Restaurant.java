package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_restaurant")
public class Restaurant extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long restaurant_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private User user_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Wishlist wishlist_id;

    @Column(nullable = false)
    private String restaurant_name;

    @Column(nullable = false)
    private String location;

    public Restaurant(String restaurant_name, String location) {
        this.restaurant_name = restaurant_name;
        this.location = location;
    }
}