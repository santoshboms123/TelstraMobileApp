package au.com.telstra;

import android.os.Bundle;

import com.salesforce.androidsdk.push.PushNotificationInterface;

public class telstraPushNotification implements ReactApplication {

public interface IPushNotificationInterface {
    public void onPushMessageReceived(Bundle message);
}