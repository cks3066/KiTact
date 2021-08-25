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

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Integer people;

    @Column(nullable = false)
    private String vacancy;


    public Seat(String location, Integer people, String vacancy) {
        this.location = location;
        this.people = people;
        this.vacancy = vacancy;
    }
}
