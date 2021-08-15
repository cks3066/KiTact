package com.kitact.data.model;

import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Menu {
    public Menu(Restaurant restaurant_id, String menu_name, Long menu_price) {
        this.restaurant_id = restaurant_id;
        this.menu_name = menu_name;
        this.menu_price = menu_price;

    }
    @ManyToOne
    private Restaurant restaurant_id;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long menu_id;

    @Column(nullable = false)
    private String menu_name;

    @Column(nullable = false)
    private Long menu_price;
}
