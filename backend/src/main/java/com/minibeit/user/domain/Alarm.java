package com.minibeit.user.domain;

import lombok.*;

import javax.persistence.Embeddable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Alarm {

    private LocalDateTime approvedAlarm;
    private LocalDateTime rejectedAlarm;


    public boolean rejectedAlarmCheck() {
        if (this.rejectedAlarm == null) {
            return false;
        }
        LocalDateTime plusDays = this.rejectedAlarm.plusDays(3L);
        return LocalDateTime.now().isBefore(plusDays);
    }

    public boolean approvedAlarmCheck() {
        if (this.approvedAlarm == null) {
            return false;
        }
        LocalDateTime plusDays = this.approvedAlarm.plusDays(3L);
        return LocalDateTime.now().isBefore(plusDays);
    }

    public void alarmOn(AlarmStatus alarmStatus){
        if(AlarmStatus.APPROVE.equals(alarmStatus)){
            this.approvedAlarm = LocalDateTime.now();
        }
        else if(AlarmStatus.REJECT.equals(alarmStatus)){
            this.rejectedAlarm = LocalDateTime.now();
        }
    }

    public void alarmOff(AlarmStatus alarmStatus){
        if(AlarmStatus.APPROVE.equals(alarmStatus)){
            this.approvedAlarm = null;
        }
        else if(AlarmStatus.REJECT.equals(alarmStatus)){
            this.rejectedAlarm = null;
        }
    }
}
