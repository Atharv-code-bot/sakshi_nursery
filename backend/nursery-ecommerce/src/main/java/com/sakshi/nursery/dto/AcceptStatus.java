package com.sakshi.nursery.dto;

import com.sakshi.nursery.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcceptStatus {
    private  String orderID;
    private OrderStatus newstatus;

}
