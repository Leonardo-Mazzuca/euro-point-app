
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router'


const TabsLayout = () => {
  return (
  <Tabs
    screenOptions={{
      tabBarStyle: {
        height: 60,
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
      },
      tabBarActiveTintColor: Colors.light.primaryBlue
    }}
  >
    <Tabs.Screen 
      name="index"
      options={{
        headerShown: false,
        title: "Home",
        tabBarIcon: ({color})=> (<Feather name='home' size={24} color={color} />)
      }}
    />
    <Tabs.Screen 
      name="projects"
      options={{
        headerShown: false,
        title: "Projetos",
        tabBarIcon: ({color})=> (<AntDesign name='folder1' size={24} color={color} />)
      }}
    />
    <Tabs.Screen 
      name="newsletter"
      options={{
        headerShown: false,
        title: "Newsletter",
        tabBarIcon: ({color})=> (<AntDesign name='filetext1' size={24} color={color} />)
      }}
    />
    <Tabs.Screen 
      name="trainings"
      options={{
        headerShown: false,
        title: "Treinamentos",
        tabBarIcon: ({color})=> (<Feather name='target' size={24} color={color} />)
      }}
    />
    <Tabs.Screen 
      name="ideas"
      options={{
        headerShown: false,
        title: "Ideias",
        tabBarIcon: ({color})=> (<FontAwesome5 name="lightbulb" size={24} color={color} />)
      }}
    />
  </Tabs>
  );
}

export default TabsLayout