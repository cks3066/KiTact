package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_seat")
public class Seat extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seat_id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer x;

    @Column(nullable = false)
    private Integer y;

    @Column(nullable = false)
    private Integer people;

    @Column(nullable = false)
    private Boolean vacancy;

    @Column(nullable = false)
    private String client;


    public Seat(String type, Integer x, Integer y, Integer people, Boolean vacancy, String client) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.people = people;
        this.vacancy = vacancy;
        this.client = client;
    }
}
