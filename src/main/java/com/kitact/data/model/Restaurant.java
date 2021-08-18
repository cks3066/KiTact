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
    @JoinColumn
    private User user_id;

    @ManyToOne
    @JoinColumn
    private Wishlist wishlist_id;

    @Column(nullable = false, length = 50)
    private String restaurant_name;

    @Column(length = 100)
    private String tag;

    @Column(length = 100)
    private String address;

    @Column(length = 15)
    private String telephone;

    @Column
    private String restaurant_image;

    @Column(length = 30)
    private String openinghours;

    @Column(nullable = false, length = 10)
    private String big_category;

    @Column(nullable = false, length = 10)
    private String small_category;

    @Column
    private Float lat;

    @Column
    private Float lng;

    public Restaurant(User user_id, Wishlist wishlist_id, String restaurant_name,
                      String tag, String address, String telephone,
                      String restaurant_image, String openinghours,
                      String big_category, String small_category,
                      Float lat, Float lng) {
        this.user_id = user_id;
        this.wishlist_id = wishlist_id;
        this.restaurant_name = restaurant_name;
        this.tag = tag;
        this.address = address;
        this.telephone = telephone;
        this.restaurant_image = restaurant_image;
        this.openinghours = openinghours;
        this.big_category = big_category;
        this.small_category = small_category;
        this.lat = lat;
        this.lng = lng;
    }
}