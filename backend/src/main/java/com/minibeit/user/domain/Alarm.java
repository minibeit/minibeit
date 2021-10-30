package com.minibeit.user.domain;

import lombok.*;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Alarm {

    private LocalDateTime rejectedAlarm;
    private LocalDateTime approvedAlarm;

    public Alarm(){
        this.rejectedAlarm = null;
        this.approvedAlarm = null;
    }

    public void approvedAlarmOn(){
        this.approvedAlarm = LocalDateTime.now();
    }
    public void approvedAlarmOff(){
        this.approvedAlarm = null;
    }

    public void rejectedAlarmOn(){
        this.rejectedAlarm = LocalDateTime.now();
    }
    public void rejectedAlarmOff(){
        this.rejectedAlarm = null;
    }
}
