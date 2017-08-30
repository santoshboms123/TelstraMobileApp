package au.com.telstra;

import android.os.Bundle;

import com.salesforce.androidsdk.push.PushNotificationInterface;

public class TelstraPushNotification implements PushNotificationInterface {

    @Override
    public void onPushMessageReceived(Bundle message) {

    }

    public interface IPushNotificationInterface {
        public void onPushMessageReceived(Bundle message);
    }
}