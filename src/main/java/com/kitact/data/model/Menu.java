package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_menu")
public class Menu extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Restaurant restaurant;

    @Column(nullable = false)
    private String menu_name;

    @Column(nullable = false)
    private Long menu_price;

    public Menu(Restaurant restaurant_id, String menu_name, Long menu_price) {
        this.restaurant = restaurant_id;
        this.menu_name = menu_name;
        this.menu_price = menu_price;
    }
}
