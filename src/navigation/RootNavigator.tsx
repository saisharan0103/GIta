import { BookOpen, MessageCircle } from 'lucide-react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { KrishnaChatScreen } from '../screens/KrishnaChatScreen';
import { ReelsScreen } from '../screens/ReelsScreen';
import { MainTabParamList, RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.cream,
    border: colors.border,
    card: colors.parchment,
    primary: colors.saffron,
    text: colors.softText,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.saffron,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.parchment,
          borderTopColor: colors.border,
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} strokeWidth={1.8} />
          ),
        }}
      />
      <Tab.Screen
        component={ReelsScreen}
        name="Reels"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} strokeWidth={1.8} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen component={MainTabs} name="MainTabs" options={{ headerShown: false }} />
        <Stack.Screen
          component={KrishnaChatScreen}
          name="KrishnaChat"
          options={{
            headerShown: true,
            presentation: 'modal',
            headerStyle: {
              backgroundColor: colors.parchment,
            },
            headerTintColor: colors.deepBlue,
            title: 'Krishna',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
