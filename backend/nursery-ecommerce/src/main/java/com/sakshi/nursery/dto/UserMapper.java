package com.sakshi.nursery.dto;


import com.sakshi.nursery.dto.UserDto;
import com.sakshi.nursery.model.User;

import java.time.format.DateTimeFormatter;

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());
        dto.setProvider(user.getProvider());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        dto.setCreatedate(user.getCreatedAt().format(formatter));
        dto.setAuthenticated(true);

        return dto;
    }
}

