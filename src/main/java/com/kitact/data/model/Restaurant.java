package com.kitact.data.model;

import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Restaurant {
    public Restaurant(String restaurant_name, String location) {
        this.restaurant_name = restaurant_name;
        this.location = location;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
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

}