package com.kitact.data.model;

import com.kitact.data.model.base.TimeStamped;
import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Payment extends TimeStamped {
    public Payment(Order order_id, Boolean is_ended) {
        this.order_id = order_id;
        this.is_ended  = is_ended;
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long payment_id;

    @OneToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Order order_id;

    @Column
    private Boolean is_ended;
}

