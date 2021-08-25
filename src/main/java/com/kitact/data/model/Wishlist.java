package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;

import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_wishlist")
public class Wishlist extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wishlist_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private User user_id;



    public Wishlist(User user_id) {
        this.user_id = user_id;
    }
}