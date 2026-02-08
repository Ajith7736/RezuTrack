import { Image } from "expo-image";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/context/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Loading from "@/components/ui/Loading";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/lib/Toast/ToastUtility";



export default function Index() {

    const { isLoading, session } = useSession()


    if (isLoading || session) {
        return <Loading />
    }

    return (
        <SafeAreaView className="min-h-screen flex flex-col items-center justify-between p-10 ">
            <View className="flex w-full ">
                <Text className="text-center text-3xl font-bold tracking-widest w-full text-stone-700">Welcome</Text>
                <Text className="text-center tracking-widest italic text-stone-600"> Sign in to start tracking your multiple resumes.</Text>
            </View>

            <View className="flex flex-row gap-8">
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume3.webp')}
                        priority={'high'}
                        transition={0}
                        style={{
                            height: 300,
                            width: 200
                        }}
                    />
                </View>
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume4.webp')}
                        style={{
                            height: 300,
                            width: 200
                        }}
                        priority={'high'}
                        transition={0}
                    />
                </View>
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume5.webp')}
                        style={{
                            height: 300,
                            width: 200
                        }}
                        priority={'high'}
                        transition={0}
                    />
                </View>
            </View>
            <View className="flex flex-row gap-8">
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume1.webp')}
                        style={{
                            height: 300,
                            width: 200
                        }}
                        priority={'high'}
                        transition={0}
                    />
                </View>
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume.webp')}
                        style={{
                            height: 300,
                            width: 200
                        }}
                        priority={'high'}
                        transition={0}
                    />
                </View>
                <View style={{
                    height: 300,
                    width: 200,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.09)'
                }}>
                    <Image
                        source={require('@/assets/images/resume2.webp')}
                        style={{
                            height: 300,
                            width: 200
                        }}
                        priority={'high'}
                        transition={0}
                    />
                </View>
            </View>

            <View>
                <GoogleSignInButton />
            </View>

        </SafeAreaView>
    )
}
