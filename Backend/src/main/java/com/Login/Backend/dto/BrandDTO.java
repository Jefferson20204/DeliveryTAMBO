package com.Login.Backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

<<<<<<< HEAD
=======
import com.google.common.base.MoreObjects;

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
@Data
@Builder
public class BrandDTO {
    private UUID id;
    private String name;
<<<<<<< HEAD
=======

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("name", name)
                .toString();
    }
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
}
