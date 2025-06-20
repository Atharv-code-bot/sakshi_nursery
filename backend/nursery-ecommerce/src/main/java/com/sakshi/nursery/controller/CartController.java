package com.sakshi.nursery.controller;

import com.sakshi.nursery.config.AuthUtil;
import com.sakshi.nursery.dto.CartItemDTO;
import com.sakshi.nursery.dto.CartItemResponseDTO;
import com.sakshi.nursery.model.User;
import com.sakshi.nursery.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/carts")
//@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("/AddToCart")
    public ResponseEntity<String> addToCart(@RequestBody CartItemDTO dto) {
        User user=authUtil.getLoggedInUser();
        cartService.addToCart(user.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(" Added");
    }

    @GetMapping("/GetCarts")
    public ResponseEntity<List<CartItemResponseDTO>> getCart() {
        User user=authUtil.getLoggedInUser();
        List<CartItemResponseDTO> cartItems = cartService.getCartItems(user.getId());
        return ResponseEntity.ok(cartItems);
    }
    @DeleteMapping("/deleteBy-ProductID/{productid}")
    public ResponseEntity<String> DeleteByProductID(@PathVariable Long productid){
        User user=authUtil.getLoggedInUser();
        cartService.deleteProductAndCleanCarts(user.getId(),productid);
        return ResponseEntity.ok("Deleted");
    }
    @PutMapping("/update-quantity")
    public ResponseEntity<String> updateCartQuantity(@RequestBody CartItemDTO dto) {
        User user=authUtil.getLoggedInUser();
        cartService.updateCartQuantity(user.getId(), dto);
        return ResponseEntity.ok("Quantity updated successfully.");
    }

}

