import { colors } from "@/components/ui/colors";
import Loading from "@/components/ui/Loading";
import TitleBackButton from "@/components/ui/TitleBackButton";
import { useSession } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { AntDesign, Entypo, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import { Circle } from 'lucide-react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {

  const { session } = useSession()
  const [loading, setLoading] = useState(false)

  const handlesignout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />
  }


  return (
    <SafeAreaView className='flex-1 bg-slate-50 p-5 '>
      <View>
        <Text className="text-2xl font-extrabold tracking-widest text-slate-700">Settings</Text>
      </View>
      <View className="mt-5 flex gap-5">
        <View style={{
          backgroundColor: 'white',
          padding: 15,
          borderWidth: 1,
          borderColor: colors.tailwind.slate[200],
          borderRadius: 15,
          display: 'flex',
          gap: 3,
          alignItems: "flex-start",
        }}>
          <Text className="text-xl font-bold tracking-widest text-slate-700">Profile</Text>
          <View className="flex flex-row items-center gap-5 mt-2">
            <View style={{
              backgroundColor: colors.tailwind.gray[200]
            }} className="bg-slate-100 h-14 w-14 rounded-full overflow-hidden">
              <Image
                source={session?.user.user_metadata.avatar_url ?? require('@/assets/images/person.png')}
                style={{
                  height: '100%',
                  width: '100%'
                }}
                contentFit="cover"
                contentPosition={'center'}
              />
            </View>
            <View>
              <Text className="font-bold text-slate-700 text-lg">{session?.user.user_metadata.name}</Text>
              <Text className="text-slate-600 italic">{session?.user.email}</Text>
            </View>
          </View>

        </View>

        <View style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: colors.tailwind.slate[200],
          borderRadius: 15
        }}>
          <Pressable style={{
            display: 'flex',
            gap: 3,
            padding: 20,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: colors.tailwind.slate[200],
          }}>
            <View className="flex flex-row gap-8 items-center">
              <AntDesign name="exclamation-circle" size={20} />
              <Text className="tracking-widest text-slate-700">About App</Text>
            </View>

            <Entypo name="chevron-right" size={20} color="black" />
          </Pressable>

          <Pressable style={{
            display: 'flex',
            gap: 3,
            padding: 20,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: colors.tailwind.stone[200],
          }} onPress={handlesignout}>
            <View className="flex flex-row gap-8 items-center">
              <AntDesign name="logout" size={20} color="red" />
              <Text className="tracking-widest" style={{ color: colors.tailwind.red[500] }}>Logout</Text>
            </View>

            <Entypo name="chevron-right" size={20} color="black" />
          </Pressable>

          <Pressable style={{
            display: 'flex',
            gap: 3,
            padding: 20,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
          }} >
            <View className="flex flex-row gap-7 items-center">
              <MaterialIcons name="delete-outline" size={24} color="red" />
              <Text className="tracking-widest" style={{ color: colors.tailwind.red[500] }}>Delete My Account</Text>
            </View>

            <Entypo name="chevron-right" size={20} color="black" />
          </Pressable>


        </View>

      </View>
    </SafeAreaView >
  )
}


export default Settings