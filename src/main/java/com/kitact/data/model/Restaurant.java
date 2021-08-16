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

    @Column
    private String address;

    @Column
    private String telephone;

    @Column
    private String openinghours;

    @Column(nullable = false)
    private Integer mapx;

    @Column(nullable = false)
    private Integer mapy;

    @Column(nullable = false)
    private String category;


    public Restaurant(String restaurant_name, String telephone, String openinghours,
                      Integer mapx, Integer mapy, String category) {
        this.restaurant_name = restaurant_name;
        this.telephone = telephone;
        this.openinghours = openinghours;
        this.mapx = mapx;
        this.mapy = mapy;
        this.category = category;
    }
}