package com.basil.shoppingcart.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.basil.shoppingcart.dto.request.RegisterRequest;
import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.model.User;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toUser(RegisterRequest request);

    @Mapping(target = "role", source = "role.roleName")
    UserResponse toUserResponse(User user);

}