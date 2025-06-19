# 🍽️ CampusDabba - Homemade Food Delivery Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-campusdabba0.netlify.app-orange?style=for-the-badge&logo=netlify)](https://campusdabba0.netlify.app/)
[![Mobile App](https://img.shields.io/badge/Mobile%20App-Android%20APK-green?style=for-the-badge&logo=android)](https://github.com/arnav-campusdabba/releases)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

> **Connecting students with authentic home-cooked meals from local households**

CampusDabba is a modern, mobile-first platform that bridges the gap between home cooks and students seeking delicious, affordable, and authentic homemade food. Built with cutting-edge technology and a focus on community building.

## 🌟 Live Demo

🌐 **Web App**: [https://campusdabba0.netlify.app/](https://compusdabba0.netlify.app/)  
📱 **Mobile App**: Available as Android APK (see installation guide below)

## � What Makes CampusDabba Special?

### 🏡 **For Students & Food Lovers**
- 🔍 **Discover Local Cooks** - Browse verified home cooks with ratings and specialties
- 🛒 **Smart Order Management** - Seamless cart system with real-time availability
- 💳 **Secure Payments** - Integrated Razorpay with UPI, cards, and wallet support
- 📱 **Real-time Tracking** - Track your order from kitchen to doorstep
- 📍 **Location-based Discovery** - Find cooks near you with delivery options
- ⭐ **Community Reviews** - Rate and review to help others discover great food
- 🤖 **AI Chatbot Support** - Get instant help 24/7
- 👤 **Profile Management** - Manage addresses, payments, and order history

### 🍽️ **For Home Cooks**
- 📝 **Complete Registration** - Multi-step verification with Aadhaar and food safety
- 🍜 **Menu Management** - Create beautiful menus with photos and descriptions
- 📦 **Order Dashboard** - Real-time order notifications and management
- 📊 **Status Updates** - Track orders from preparation to delivery
- 💰 **Payment Analytics** - Monitor earnings with detailed insights
- ⏰ **Flexible Scheduling** - Set availability and order limits
- 📈 **Business Analytics** - Track performance and customer feedback
- 🔔 **Smart Notifications** - Never miss an order with real-time alerts

### 👨‍💼 **For Administrators**
- 🎛️ **Comprehensive Dashboard** - Complete platform oversight
- 👥 **User Management** - Monitor students, cooks, and activities
- 📊 **Analytics & Reports** - Track platform performance and growth
- **💳 Payment Oversight** – Monitor all transactions and resolve payment issues
- **🔧 System Settings** – Configure platform settings and manage user roles
- **📈 Business Intelligence** – Analytics on user growth, popular dishes, and revenue

---

## 🏗 Complete Tech Stack  

## 🛠️ Technology Stack

### **Frontend & Mobile**
- ⚛️ **Next.js 14** - Modern React framework with App Router
- 📱 **Capacitor** - Cross-platform mobile app development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **ShadCN UI** - Modern component library
- 📝 **TypeScript** - Type-safe development
- 🎯 **React Hook Form** - Efficient form management
- 🎪 **Framer Motion** - Smooth animations
- 🎨 **Lucide Icons** - Beautiful icon system

### **Backend & Database**
- 🚀 **Supabase** - Backend-as-a-Service
- 🐘 **PostgreSQL** - Robust relational database
- 🔐 **Row Level Security (RLS)** - Database-level security
- 🔄 **Real-time Subscriptions** - Live data updates
- 📁 **Supabase Storage** - File and image management
- 🔑 **JWT Authentication** - Secure user sessions

### **Payment & Integrations**
- 💳 **Razorpay** - Payment gateway integration
- 🏦 **UPI, Cards, Wallets** - Multiple payment methods
- 🔒 **Secure Webhooks** - Payment verification
- 🧪 **Test Mode** - Development-friendly testing

### **Development & Deployment**
- 🔧 **Node.js** - Runtime environment
- 📦 **npm** - Package management
- 🌐 **Netlify** - Web app deployment
- 📱 **Android APK** - Mobile app distribution
- 🔄 **Git** - Version control

## 🏗️ Project Structure

```
campusdabba/
├── app/                    # Next.js app directory
│   ├── (static)/          # Static pages (about, faq, etc.)
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── cook/              # Cook-specific pages
│   ├── student/           # Student-specific pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── auth/             # Auth components
│   ├── cook/             # Cook components
│   ├── student/          # Student components
│   ├── shared/           # Shared components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
├── public/               # Static assets
├── android/              # Capacitor Android project
├── supabase/            # Database migrations
└── docs/                # Documentation

```

## 📱 Mobile App Features

### **Native Mobile Experience**
- 📱 **Cross-platform** - Single codebase for Android & iOS
- 🔄 **Offline Support** - Cache data for better performance
- 🔔 **Push Notifications** - Real-time order updates
- 📷 **Camera Integration** - Upload menu photos
- 📍 **Geolocation** - Find nearby cooks
- 📊 **Native Performance** - Smooth animations and interactions

### **Mobile-Optimized UI**
- 👆 **Touch-friendly** - Optimized for mobile interactions
- 🎨 **Responsive Design** - Perfect on all screen sizes
- 🌙 **Dark Mode** - Easy on the eyes
- ⚡ **Fast Loading** - Optimized performance
- 🎪 **Smooth Animations** - Delightful user experience

## 🔐 Security Features
- 🔐 **Row Level Security (RLS)** - Database-level access control
- 🔑 **JWT Authentication** - Secure session management
- 👥 **Role-based Access Control** - Different permissions for each user type
- 🛡️ **API Route Protection** - Middleware-based authorization
- ✅ **Data Validation** - Frontend and backend validation
- 🔒 **Secure File Upload** - Safe image and document handling
- � **SQL Injection Protection** - Parameterized queries
- 🕵️ **Privacy Controls** - User data protection

## 🚀 Quick Start

### **Prerequisites**
- 🟢 **Node.js 18+** and npm
- 📊 **Supabase** account
- 💳 **Razorpay** account (for payments)
- 📱 **Android Studio** (for mobile development)

### **1️⃣ Clone & Install**
```bash
git clone https://github.com/your-username/campusdabba.git
cd campusdabba
npm install
```

### **2️⃣ Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_SECRET_KEY=your_admin_secret_key
```

### **3️⃣ Database Setup**
```bash
# Run Supabase migrations
npx supabase db push

# Seed the database (optional)
npm run db:seed
```

### **4️⃣ Development Server**
```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

### **5️⃣ Mobile App Development**
```bash
# Build for mobile
npm run mobile:build

# Run on Android
npm run mobile:android

# Run on iOS (macOS only)
npm run mobile:ios
```

## 📱 Mobile App Installation

### **Option 1: Install APK (Android)**
1. Download `CampusDabba_Perfect_v2.0.apk` from the project root
2. Enable "Unknown Sources" in Android settings
3. Install the APK file
4. Launch CampusDabba app

### **Option 2: Build from Source**
```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Sync with Capacitor
npm run mobile:sync

# Build APK
npm run mobile:build

# Install on connected device
npm run mobile:android
```

## 🔄 Development Workflow & APK Creation

### **Complete Development to APK Process**

This section covers the entire workflow from making changes to your app to creating and deploying a new APK.

### **Step 1: Development Environment Setup**
```bash
# Ensure you have the correct environment
node --version    # Should be 18+
npm --version     # Should be 8+
java --version    # Should be 21 (for Capacitor builds)

# Set Java 21 for Android builds
export JAVA_HOME=/opt/homebrew/Cellar/openjdk@21/21.0.7/libexec/openjdk.jdk/Contents/Home
```

### **Step 2: Making Changes to Your App**

#### **For Web App Changes:**
```bash
# 1. Start development server
npm run dev

# 2. Make your changes in:
# - app/ (pages and routes)
# - components/ (React components)
# - lib/ (utilities and data)
# - public/ (static assets)

# 3. Test changes locally
# Visit http://localhost:3000

# 4. Ensure TypeScript compilation is clean
npm run build
```

#### **For Mobile-Specific Changes:**
```bash
# 1. Update Capacitor configuration if needed
# Edit capacitor.config.ts

# 2. For native features, modify:
# - android/app/src/main/ (Android-specific code)
# - iOS equivalent for iOS builds

# 3. Update app icons/splash screens:
# - android/app/src/main/res/ (Android assets)
# - public/ (web assets)
```

### **Step 3: Testing Your Changes**

#### **Web Testing:**
```bash
# Development testing
npm run dev

# Production build testing
npm run build
npm start
```

#### **Mobile Testing:**
```bash
# Test on connected Android device with live reload
npm run android:dev

# This provides:
# - Live reload on code changes
# - Chrome DevTools debugging
# - Real device testing
```

### **Step 4: Building & Deploying Web App**

#### **Deploy to Netlify:**
```bash
# 1. Ensure all changes are committed
git add .
git commit -m "Your descriptive commit message"

# 2. Push to main branch (triggers auto-deployment)
git push origin main

# 3. Netlify automatically:
# - Runs npm run build
# - Deploys to https://webconvertedapp.netlify.app/
# - Usually takes 2-3 minutes
```

### **Step 5: Creating the Perfect APK**

#### **Pre-build Checklist:**
```bash
# 1. Ensure web app is deployed and working
# Visit https://webconvertedapp.netlify.app/

# 2. Update Capacitor config if URL changed
# Edit capacitor.config.ts - server.url should point to live site

# 3. Clean previous builds
rm -rf android/app/build
rm -rf .next
```

#### **APK Build Process:**
```bash
# 1. Set Java environment for Capacitor
export JAVA_HOME=/opt/homebrew/Cellar/openjdk@21/21.0.7/libexec/openjdk.jdk/Contents/Home

# 2. Clean and sync Capacitor
npx cap sync android

# 3. Clean Android build artifacts
cd android && ./gradlew clean && cd ..

# 4. Build the APK
cd android && ./gradlew assembleDebug && cd ..

# 5. Copy APK to project root with descriptive name
cp android/app/build/outputs/apk/debug/app-debug.apk ./CampusDabba_v$(date +%Y%m%d_%H%M).apk
```

#### **Alternative: One-Command APK Build**
```bash
# Create a build script (build-apk.sh)
#!/bin/bash
echo "🚀 Building CampusDabba APK..."

# Set Java environment
export JAVA_HOME=/opt/homebrew/Cellar/openjdk@21/21.0.7/libexec/openjdk.jdk/Contents/Home

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf android/app/build
npx cap sync android

# Build APK
echo "🔨 Building APK..."
cd android && ./gradlew assembleDebug && cd ..

# Copy with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M)
cp android/app/build/outputs/apk/debug/app-debug.apk ./CampusDabba_v$TIMESTAMP.apk

echo "✅ APK built successfully: CampusDabba_v$TIMESTAMP.apk"

# Make script executable
chmod +x build-apk.sh

# Run the script
./build-apk.sh
```

### **Step 6: Installing APK on Device**

#### **Connect Your Android Device:**
```bash
# Enable Developer Options and USB Debugging on your phone
# Connect via USB cable

# Verify device connection
adb devices
# Should show your device ID

# Install the APK
adb install -r CampusDabba_v20250619_1430.apk
# -r flag replaces existing app if installed
```

#### **Share APK with Others:**
```bash
# Upload to Google Drive, Dropbox, or send via email
# Users need to:
# 1. Enable "Install from Unknown Sources"
# 2. Download APK file
# 3. Tap to install
```

### **Step 7: Version Management & Release Process**

#### **Version Tracking:**
```bash
# Update version in package.json
{
  "version": "2.1.0"
}

# Update Android version (android/app/build.gradle)
android {
    defaultConfig {
        versionCode 21
        versionName "2.1.0"
    }
}

# Create release commit
git add .
git commit -m "Release v2.1.0: Add new features and improvements"
git tag v2.1.0
git push origin main --tags
```

#### **Release Checklist:**
- [ ] ✅ All features tested locally
- [ ] ✅ Web app deployed and working
- [ ] ✅ APK built successfully
- [ ] ✅ APK tested on real device
- [ ] ✅ Version numbers updated
- [ ] ✅ Release notes written
- [ ] ✅ APK shared with team/users

### **Step 8: Troubleshooting Common Issues**

#### **Build Failures:**
```bash
# Java version issues
echo $JAVA_HOME
/usr/libexec/java_home -V  # List all Java versions

# Gradle cache issues
cd android && ./gradlew clean && cd ..
rm -rf android/.gradle

# Capacitor sync issues
npx cap sync android --force
```

#### **APK Installation Issues:**
```bash
# Check device compatibility
adb shell getprop ro.build.version.sdk  # Should be 21+

# Reinstall with force
adb uninstall com.arnav.campusdabba
adb install CampusDabba_v20250619_1430.apk
```

### **Step 9: Continuous Integration (Optional)**

#### **Automated APK Builds:**
```yaml
# .github/workflows/build-apk.yml
name: Build APK
on:
  push:
    branches: [main]
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: actions/setup-java@v3
        with:
          java-version: '21'
          
      - run: npm install
      - run: npx cap sync android
      - run: cd android && ./gradlew assembleDebug
      
      - uses: actions/upload-artifact@v3
        with:
          name: campusdabba-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

## 🧪 Testing

### **Development Testing**
```bash
# Run development server
npm run dev

# Test payment integration
npm run test:payments

# Test mobile app
npm run android:dev  # Live reload on device
```

### **Production Testing**
- 🌐 **Web App**: [https://campusdabba0.netlify.app/](https://campusdabba0.netlify.app/)
- 📱 **Mobile App**: Install APK and test all features
- 💳 **Payments**: Use Razorpay test cards

## 📊 Database Schema

### **Core Tables**
- 👤 **users** - User profiles and authentication
- 👨‍🍳 **cooks** - Cook verification and details
- 🛒 **orders** - Order management and tracking
- 🍽️ **order_items** - Individual items in orders
- 📋 **dabba_menu** - Cook menu items and pricing
- 💰 **payments** - Payment history and status

### **Relationships**
- Users ↔ Cooks (1:1 optional)
- Cooks ↔ Menu Items (1:many)
- Orders ↔ Order Items (1:many)
- Users ↔ Orders (1:many)
- Orders ↔ Payments (1:1)

## 🎯 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### **Payments**
- `POST /api/razorpay/create-order` - Create payment order
- `POST /api/razorpay/verify-payment` - Verify payment
- `GET /api/razorpay/test` - Test payment integration

### **Orders**
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## 🏢 About CampusDabba

CampusDabba is a startup pre-incubated in **IIIT Dharwad's Research Park**. We are revolutionizing the food delivery industry by focusing on authentic home-cooked meals and supporting local households.

### **Our Mission**
- 🏠 **Empower Local Families** - Provide income opportunities for home cooks
- 🥘 **Authentic Home Cooking** - Preserve traditional recipes and cooking methods
- 👨‍🎓 **Support Students** - Affordable, healthy meal options for students
- 🌱 **Sustainable Business** - Build a community-driven food ecosystem

### **Join Our Team**
We're actively hiring passionate developers to join our innovative team!

**Open Positions:**
- Full Stack Developers
- Mobile App Developers
- UI/UX Designers
- DevOps Engineers

**Apply here:** [Join Our Team](https://forms.gle/DKhBZBuZQ3zBzZdu9)

## 📞 Contact & Support

### **Get in Touch**
- 📧 **Email:** campusdabba@gmail.com
- 📱 **Phone:** +91 9022392820
- 🌐 **Website:** [https://campusdabba0.netlify.app/](https://campusdabba0.netlify.app/)
- 💼 **Careers:** [Join Our Team](https://forms.gle/DKhBZBuZQ3zBzZdu9)

### **Support**
- 📖 **Documentation:** See `/docs` folder
- 🐛 **Bug Reports:** Create an issue on GitHub
- 💡 **Feature Requests:** Open a discussion
- 💬 **Community:** Join our Discord/Slack

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**
1. 🐛 **Bug Reports** - Found a bug? Let us know!
2. 💡 **Feature Requests** - Have an idea? Share it!
3. 🔧 **Code Contributions** - Submit pull requests
4. 📝 **Documentation** - Help improve our docs
5. 🧪 **Testing** - Help test new features

### **Development Process**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### **Phase 1: MVP** ✅
- [x] User authentication system
- [x] Cook registration and verification
- [x] Order management system
- [x] Payment integration
- [x] Mobile app development

### **Phase 2: Enhancement** 🚧
- [ ] Real-time chat between cooks and customers
- [ ] Advanced analytics dashboard
- [ ] Push notifications system
- [ ] Multi-language support
- [ ] iOS app development

### **Phase 3: Scale** 📋
- [ ] Multi-city expansion
- [ ] Advanced AI recommendations
- [ ] Subscription-based meal plans
- [ ] Delivery partner integration
- [ ] Enterprise solutions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IIIT Dharwad Research Park** for incubation support
- **Supabase** for providing excellent backend services
- **Vercel/Netlify** for seamless deployment
- **Razorpay** for payment integration
- **Open Source Community** for amazing tools and libraries

---

<div align="center">

**Made with ❤️ by the CampusDabba Team**

[🌐 Live Demo](https://campusdabba0.netlify.app/) • [📱 Mobile App](https://github.com/arnavballincode) • [📧 Contact](mailto:campusdabba@gmail.com) • [💼 Careers](https://forms.gle/DKhBZBuZQ3zBzZdu9)

**⭐ Star this repo if you found it helpful!**

</div>
