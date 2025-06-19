# CampusDabba APK Installation Guide

## Current Issue: APK Shows as "BIN" File

If your APK is showing as a "BIN" file and not giving installation options, follow these solutions:

## Solution 1: Rename the APK File

The issue might be with the file extension. Try renaming the APK:

1. **On your phone**: Long press the APK file → Rename → Make sure it ends with `.apk`
2. **Before transferring**: Rename `CampusDabba-debug-20250619_114114.apk` to something simple like `CampusDabba.apk`

## Solution 2: Transfer Methods

### Method A: ADB Installation (Recommended)
If you have ADB set up:
```bash
# Connect your phone via USB with Developer Options enabled
adb install CampusDabba-debug-20250619_114114.apk
```

### Method B: Cloud Transfer
1. Upload APK to Google Drive/Dropbox/OneDrive
2. Download directly on your phone
3. Install from Downloads folder

### Method C: Email Transfer
1. Email the APK to yourself
2. Download attachment on phone
3. Install from email app

### Method D: USB Transfer
1. Connect phone to computer via USB
2. Copy APK to phone's Download folder
3. Use a file manager app to navigate and install

## Solution 3: Enable Unknown Sources

Before installing, make sure you've enabled installation from unknown sources:

### For Android 8.0+ (API 26+):
1. Go to **Settings** → **Apps & notifications** → **Special app access** → **Install unknown apps**
2. Select your file manager or browser
3. Toggle on **Allow from this source**

### For Android 7.1 and below:
1. Go to **Settings** → **Security**
2. Toggle on **Unknown sources**
3. Confirm the warning dialog

## Solution 4: Use a Different File Manager

If your default file manager isn't recognizing the APK:

1. Install **ES File Explorer** or **Files by Google**
2. Navigate to the APK location
3. Tap the APK file to install

## Solution 5: Check Android Version Compatibility

The APK is built with:
- **Minimum SDK**: 23 (Android 6.0)
- **Target SDK**: 30 (Android 11)
- **Compile SDK**: 34 (Android 14)

**Your device must be Android 6.0 (API 23) or higher.**

## Solution 6: Clear Package Installer Cache

If installation keeps failing:

1. Go to **Settings** → **Apps** → **Package Installer**
2. Tap **Storage** → **Clear Cache** → **Clear Data**
3. Try installing the APK again

## Solution 7: Fresh APK Download

Try using the latest APK file: `CampusDabba-debug-20250619_114114.apk`

This is a freshly built APK with:
- Proper debug signing
- Compatible SDK versions
- All required permissions

## Solution 8: Developer Options Method

1. Enable **Developer Options**:
   - Go to **Settings** → **About phone**
   - Tap **Build number** 7 times
   - Go back to **Settings** → **Developer options**

2. Enable **USB debugging** and **Install via USB**

3. Try installing again

## Solution 9: Samsung Devices Specific

If you're using a Samsung device:

1. Go to **Settings** → **Biometrics and security** → **Install unknown apps**
2. Select your file manager and enable it
3. Try installing again

## Solution 10: Factory Reset Package Installer

As a last resort:

1. Go to **Settings** → **Apps** → **Package Installer**
2. Tap the three dots → **Uninstall updates**
3. Restart your phone
4. Try installing the APK again

## Verification Steps

After successful installation:

1. Look for **CampusDabba** icon in your app drawer
2. The app should open and load the website in a WebView
3. Check that all features work (login, browse, etc.)

## If All Else Fails

1. **Check device specs**: Ensure Android 6.0+ and at least 2GB RAM
2. **Try on different device**: Test on another Android device
3. **Contact support**: Share your device model, Android version, and exact error messages

## APK Information

- **File**: `CampusDabba-debug-20250619_114114.apk`
- **Size**: ~7.6 MB
- **Type**: Debug APK (signed with debug keystore)
- **Architecture**: Universal (works on all device architectures)
- **Permissions**: Internet, Network State, Camera, Location, etc.

## Need Help?

If you're still having issues:
1. Share your device model and Android version
2. Share any error messages you see
3. Try the installation on a different Android device to isolate the issue

The APK has been tested and built successfully, so the issue is likely with the installation process rather than the APK itself.
