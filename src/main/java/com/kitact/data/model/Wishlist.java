package com.kitact.data.model;

import com.kitact.data.model.base.TimeStamped;
import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Wishlist extends TimeStamped {
    public Wishlist(User user_id) {
        this.user_id = user_id;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long wishlist_id;

    @ManyToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private User user_id;
}