package com.sakshi.nursery.controller;



import com.sakshi.nursery.config.AuthUtil;
import com.sakshi.nursery.dto.ReviewRequest;
import com.sakshi.nursery.dto.ReviewResponse;
import com.sakshi.nursery.model.User;
import com.sakshi.nursery.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private ReviewService reviewService;

    @PostMapping()
    public ReviewResponse addReview(@RequestBody ReviewRequest request) {
        User user = authUtil.getLoggedInUser();
        return reviewService.addReview(user.getId(), request);
    }

    @GetMapping("/product/{productId}")
    public List<ReviewResponse> getProductReviews(@PathVariable Long productId) {
        return reviewService.getReviewsForProduct(productId);
    }
}

