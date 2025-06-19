#!/bin/bash

# CampusDabba APK Builder Script
# This script builds both debug and release APKs for your mobile app

echo "🚀 Building CampusDabba Mobile App APKs..."

# Set environment variables
export ANDROID_HOME=$HOME/android-sdk
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home

# Navigate to android directory
cd android

echo "🧹 Cleaning previous builds..."
./gradlew clean

echo "📱 Building Debug APK..."
./gradlew assembleDebug

# Copy APKs to main directory with multiple names for compatibility
echo "📦 Copying APKs..."
cp app/build/outputs/apk/debug/app-debug.apk ../CampusDabba.apk
cp app/build/outputs/apk/debug/app-debug.apk ../campusdabba.apk
cp app/build/outputs/apk/debug/app-debug.apk ../campus-dabba.apk

echo "✅ APK build complete!"
echo "📁 Files generated:"
ls -lh ../CampusDabba*.apk ../campusdabba.apk ../campus-dabba.apk

echo ""
echo "🎯 Ready to install (multiple names for compatibility):"
echo "  - CampusDabba.apk (main debug APK)"
echo "  - campusdabba.apk (lowercase version)"
echo "  - campus-dabba.apk (hyphenated version)"
echo ""
echo "📱 Installation methods:"
echo "  1. Transfer any APK to phone and tap to install"
echo "  2. Use ADB: adb install CampusDabba.apk"
echo "  3. Upload to cloud storage and download on phone"
echo "  4. Email to yourself and download on phone"
