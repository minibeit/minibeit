package com.minibeit.user.domain;

import lombok.*;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Alarm {

    private LocalDateTime approvedAlarm;
    private LocalDateTime rejectedAlarm;

    public void approvedOn() {
        this.approvedAlarm = LocalDateTime.now();
    }

    public void approvedOff() {
        this.approvedAlarm = null;
    }

    public void rejectedOn() {
        this.rejectedAlarm = LocalDateTime.now();
    }

    public void rejectedOff() {
        this.rejectedAlarm = null;
    }
}
