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
    private Long menu_id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Column
    private String src;

    @Column(nullable = false)
    private String menu_name;

    @Column(nullable = false)
    private Integer menu_price;


    public Menu(String src, String menu_name, Integer menu_price) {
        this.src = src;
        this.menu_name = menu_name;
        this.menu_price = menu_price;
    }
}
