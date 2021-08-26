package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@DynamicUpdate
@Entity
@Table(name = "tb_restaurant")
public class Restaurant extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long restaurant_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn
    private Wishlist wishlist_id;

    @Column(length = 10)
    private String large_category;

    @Column(length = 10)
    private String medium_category;

    @Column(length = 10)
    private String small_category;

    @Column(length = 50)
    private String restaurant_name;

    @Column
    private String img;

    @Column(length = 100)
    private String address;

    @Column(length = 15)
    private String tel;

    @Column(length = 50)
    private String opentime;

    @Column(length = 50)
    private String closetime;

    @Column(length = 30)
    private String holiday;

    @Column(length = 200)
    private String detail;

    @Column(length = 200)
    private String tags;

    @Column
    private Integer lat;

    @Column
    private Integer lng;

    @Column
    private Integer total_seat_count;

    @Column
    private Integer vacancy_count;

    @Column
    private String owner;


    public Restaurant(String large_category, String medium_category, String small_category,
                      String restaurant_name,
                      String img,
                      String address, String tel,
                      String opentime, String closetime, String holiday,
                      String detail, String tags,
                      Integer lat, Integer lng,
                      Integer total_seat_count, Integer vacancy_count,
                      String owner) {
        this.large_category = large_category;
        this.medium_category = medium_category;
        this.small_category = small_category;
        this.restaurant_name = restaurant_name;
        this.img = img;
        this.address = address;
        this.tel = tel;
        this.opentime = opentime;
        this.closetime = closetime;
        this.holiday = holiday;
        this.detail = detail;
        this.tags = tags;
        this.lat = lat;
        this.lng = lng;
        this.total_seat_count = total_seat_count;
        this.vacancy_count = vacancy_count;
        this.owner = owner;
    }
}