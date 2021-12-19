package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.service.exception.BusinessProfileCountExceedException;
import com.minibeit.businessprofile.service.exception.DuplicateShareException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BusinessProfiles {
    private final List<BusinessProfile> businessProfileList;

    public static BusinessProfiles create(List<BusinessProfile> businessProfileList) {
        return new BusinessProfiles(businessProfileList);
    }

    public void countExceedValidation() {
        if (businessProfileList.size() >= 3) {
            throw new BusinessProfileCountExceedException();
        }
    }

    public void duplicateShareValidation(BusinessProfile businessProfile){
        if (businessProfileList.contains(businessProfile)) {
            throw new DuplicateShareException();
        }
    }

}
