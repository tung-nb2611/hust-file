package com.example.filedemo.common;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;

public class Common {
    public static long getTimestamp() {
        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        return Date.from(now.toInstant()).getTime() ;
    }
    public class FileStatus {
        public final static int ACTIVE = 1;
        public final static int DELETED = 2;
    }
}
