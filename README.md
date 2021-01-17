TODO PROJECT
============

a minimalist todo app  
created with Expo / sqlite  

**local installation**
```sh
git clone https://github/kwabounga/todo-project.git
npm install
# for launching expo dev server
expo start

# for building app
expo build:android
# choose apk
# and wait for build queue
```

**android phone running debug**
- Activate USB debugging
- install Expo app from google play 
- make sure your phone is on the same wifi network than your computer (lan)
- do ``expo start`` command
- when expo server is running launch Expo app on your phone
- scan the given QR code from the console
- test

**android phone installation**
- after ``expo build:android`` is completed
- download the .apk file and put it on your phone
- Allow App Installations from Unknown Sources
- install apk ; skip warning ; no authorizations required
- enjoy using todo app


***used packages***  
expo-sqlite  
expo-font  
@expo-google-fonts  
react-native-gesture-handler  
expo-app-loading  

