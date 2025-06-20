package com.sakshi.nursery.dto;



import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ConfirmPaymentRequestDTO {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deliveryDate;
    private  String address;
}

