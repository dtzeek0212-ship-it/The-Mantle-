import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts, SairaStencilOne_400Regular } from '@expo-google-fonts/saira-stencil-one';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { Orbitron_900Black } from '@expo-google-fonts/orbitron';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
import { OnboardingStack } from './navigation/OnboardingNavigator';
import { colors } from './theme/colors';
import { AppProvider } from './store/AppContext';
import { WebFrame } from './components/WebFrame';
import { UserProvider, useUser } from './context/UserContext';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    /* Hide Vercel Toolbar and Feedback buttons */
    .vercel-toolbar, #vercel-toolbar, vercel-live-feedback {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }
    
    /* Fix mobile browser viewport cut-off with dynamic viewport height */
    html, body, #root {
      height: 100dvh !important;
      width: 100vw !important;
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);
}

const Stack = createNativeStackNavigator();

// Customizing the Navigation Default Theme
const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

// Internal navigator that listens to User context
const AppNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user.hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      ) : (
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular,
    RobotoMono_400Regular,
    Orbitron_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <AppProvider>
        <WebFrame>
          <StatusBar style="light" />
          <NavigationContainer theme={MyDarkTheme}>
            <AppNavigator />
          </NavigationContainer>
        </WebFrame>
      </AppProvider>
    </UserProvider>
  );
}
