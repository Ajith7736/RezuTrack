import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useResumeContent } from '@/context/ResumeContentContext'
import { Image } from 'expo-image'
import CustomText from '@/components/ui/CustomText'
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { colors } from '@/components/ui/colors'

const PersonalDetails = ({ id }: { id: string | string[]}) => {

    const { ResumeContent } = useResumeContent();

    const profileitems = [
        {
            icon: <MaterialCommunityIcons name="email-outline" size={18} color={colors.tailwind.stone[500]} />,
            value: ResumeContent?.email && ResumeContent.email !== '' ? ResumeContent?.email : 'Email'
        }, {
            icon: <MaterialCommunityIcons name="phone-outline" size={18} color={colors.tailwind.stone[500]} />,
            value: ResumeContent?.phonenumber && ResumeContent.phonenumber !== '' ? ResumeContent?.phonenumber : 'Phone Number'
        }, {
            icon: <Feather name="map-pin" size={18} color={colors.tailwind.stone[500]} />,
            value: ResumeContent?.address && ResumeContent.address !== '' ? ResumeContent?.address : 'Address'
        }

    ]

    return (
        <View style={styles.PersonalItem} className="flex flex-row justify-between w-[98%] mx-auto items-start   py-6 px-5 rounded-lg">
            <View className="flex gap-3 w-[90%]">
                {ResumeContent?.profilepic?.url && <View className='h-28 relative w-28 overflow-hidden  rounded-full flex items-center justify-center'>
                    <Image
                        source={ResumeContent.profilepic.url}
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        contentFit="cover"
                        contentPosition={'center'}
                    />
                </View>
                }
                <View>
                    <CustomText className="text-xl font-extrabold tracking-widest">{ResumeContent?.fullname && ResumeContent?.fullname !== '' ? ResumeContent?.fullname : <>Name</>}</CustomText>
                    <CustomText className="text-stone-700 italic">{ResumeContent?.professionaltitle && ResumeContent?.professionaltitle !== '' ? ResumeContent?.professionaltitle : <>Title</>}</CustomText>
                </View>
                {profileitems.map((item) => <View key={item.value} className="text-sm flex flex-row gap-3">
                    <CustomText className="text-stone-800">{item.icon}</CustomText>
                    <CustomText className="flex-1 flex-wrap w-full">{item.value}</CustomText>
                </View>)}
            </View>

            <Link href={{
                pathname: "/resume/[id]/[content]",
                params: {
                    id: id as string,
                    content: "profile"
                }
            }}><View style={[{
                elevation: 4,
                padding: 9,
                borderRadius: 8
            }]} className="  bg-indigo-500"><Octicons name="pencil" size={20} color="white" /></View> </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    PersonalItem: {
        borderWidth: 1,
        borderColor: colors.tailwind.stone[200],
        boxShadow: "0 3px 10px rgb(0,0,0,0.04)"
    }
})

export default PersonalDetails