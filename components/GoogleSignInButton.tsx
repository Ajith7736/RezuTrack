import { supabase } from '@/lib/supabase';
import { toast } from '@/lib/Toast/ToastUtility';
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

GoogleSignin.configure({
    webClientId: "872173205794-e37a9rd58uq5e79rg454ad17s2ou9h6l.apps.googleusercontent.com",
});

const GoogleSignInButton = () => {
    const [isLoading, setisLoading] = useState(false)

    const SignIn = async () => {
        try {
            setisLoading(true)
            await GoogleSignin.hasPlayServices();
            const res = await GoogleSignin.signIn();
            if (isSuccessResponse(res)) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: res.data.idToken as string
                })

                if (data.user) {
                    const { error: dberror } = await supabase.from('User').upsert({
                        id: data.user.id,
                        email: data.user.email as string,
                        fullname: data.user.user_metadata.full_name,
                        image: data.user.user_metadata.avatar_url
                    })

                    const { error: Usageerror } = await supabase.from('Usage').upsert({
                        userId: data.user.id
                    },{ onConflict : 'userId'})

                    if (dberror || Usageerror) {
                        console.error(dberror?.message || Usageerror?.message);
                        toast.error("Something went wrong!")
                    }
                }
            } else {
                toast.error("SignIn cancelled")
            }
        } catch (err) {
            if (isErrorWithCode(err)) {
                switch (err.code) {
                    case statusCodes.IN_PROGRESS:
                        toast.success('SignIn in progress')
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        toast.error('Play service not available')
                        break;
                    default:
                        console.log(err.message)
                        toast.error('Google SignIn Error occured')
                }
            } else {
                toast.error('Something went wrong!')
            }
        } finally {
            setisLoading(false);
        }
    }

    return (
        <Pressable className="bg-indigo-600 w-64 h-12 rounded-md flex flex-row items-center justify-center gap-4">
            {isLoading ? <ActivityIndicator size={'small'} color={'white'} /> : <><Text className="text-white tracking-widest font-semibold" onPress={SignIn}>Sign in with Google</Text>
                <Image
                    source={require('@/assets/images/google.png')}
                    style={{
                        height: 20,
                        width: 20
                    }}
                />
            </>
            }
        </Pressable>
    )
}

export default GoogleSignInButton