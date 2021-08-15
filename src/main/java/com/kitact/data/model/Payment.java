package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.*;
import javax.persistence.*;

@ToString(callSuper = true)
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tb_payment")
public class Payment extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long payment_id;

    @OneToOne
    @JoinColumn(nullable = false, insertable = false, updatable = false)
    private Order order_id;

    @Column
    private Boolean ended;

    public Payment(Order order_Entity_id, Boolean is_ended) {
        this.order_id = order_Entity_id;
        this.ended  = is_ended;
    }
}

