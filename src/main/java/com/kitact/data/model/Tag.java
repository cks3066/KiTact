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
@Table(name = "tb_tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tag_id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Column
    private String tag;

    public Tag(String tag) {
        this.tag = tag;
    }
}
