import { colors } from '@/components/ui/colors'
import CustomText from '@/components/ui/CustomText'
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const content = () => {
  const { colorScheme } = useColorScheme()
  const iconColor = colorScheme === "light" ? colors.light.black : colors.dark.white
  const contentcard = [
    {
      icon: <Entypo name="graduation-cap" size={20} color={iconColor} />,
      title: "Education",
      desc: "Details about your studies, degrees, and schooling."
    },
    {
      icon: <MaterialCommunityIcons name="brain" size={20} color={iconColor} />,
      title: "Skills",
      desc: "The abilities and tools you are good at."
    },
    {
      icon: <MaterialCommunityIcons name="earth" size={20} color={iconColor} />,
      title: "Languages",
      desc: "The languages you can speak, read, or write."
    },
    {
      icon: <FontAwesome5 name="briefcase" size={18} color={iconColor} />,
      title: "Experience",
      desc: "Your previous jobs and what you worked on."
    },
    {
      icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={iconColor} />,
      title: "Projects",
      desc: "Important projects you have completed."
    },
    {
      icon: <Ionicons name="star" size={20} color={iconColor} />,
      title: "Strengths",
      desc: "Your positive qualities and strong points."
    },
    {
      icon: <MaterialCommunityIcons name="certificate" size={20} color={iconColor} />,
      title: "Certificates",
      desc: "Courses or programs you completed with certificates."
    },
    {
      icon: <FontAwesome5 name="award" size={20} color={iconColor} />,
      title: "Awards",
      desc: "Prizes or recognitions you have received."
    },
    {
      icon: <FontAwesome5 name="user-tie" size={20} color={iconColor} />,
      title: "Professional Experience",
      desc: "Work roles where you gained real-world experience."
    },
    {
      icon: <Ionicons name="heart" size={20} color={iconColor} />,
      title: "Interests",
      desc: "Things you like doing or learning about."
    },
    {
      icon: <MaterialCommunityIcons name="book-open-variant" size={20} color={iconColor} />,
      title: "Courses",
      desc: "Extra learning programs or classes you took."
    },
    {
      icon: <MaterialCommunityIcons name="account-group" size={20} color={iconColor} />,
      title: "Organisations",
      desc: "Groups or communities you have been part of."
    },
    {
      icon: <FontAwesome5 name="newspaper" size={20} color={iconColor} />,
      title: "Publications",
      desc: "Articles, papers, or content you have published."
    },
    {
      icon: <MaterialCommunityIcons name="account-check" size={20} color={iconColor} />,
      title: "References",
      desc: "People who can confirm your skills and work."
    },
    {
      icon: <MaterialCommunityIcons name="clipboard-text-outline" size={20} color={iconColor} />,
      title: "Declaration",
      desc: "A statement saying all information is true."
    }
  ];



  return (
    <SafeAreaView className='flex-1 bg-light-white dark:bg-dark-black'>
      <CustomText className='text-2xl m-5 font-extrabold'>Add Content</CustomText>
      <ScrollView className='flex gap-2'>
        {contentcard.map((content) => {
          return <View key={content.title} className='m-5 p-5 flex gap-4 border border-light-activeborder/10 bg-dark-inputfield rounded-md'>
            <CustomText className='text-lg font-extrabold'>{content.icon} {content.title}</CustomText>
            <CustomText className='text-sm dark:text-dark-activeborder'>{content.desc}</CustomText>
          </View>
        })}
      </ScrollView>

    </SafeAreaView>
  )
}

export default content