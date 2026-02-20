import { colors } from "@/components/ui/colors";
import Loading from "@/components/ui/Loading";
import { useSession } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/lib/Toast/ToastUtility";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ChevronRight, Info, LogOut, Trash2 } from 'lucide-react-native';
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);

  const handlesignout = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to Sign Out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await supabase.auth.signOut();
            } catch (error: any) {
              console.error("Sign Out error:", error);
              toast.error("SignOut Error");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is permanent and all your data will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);

              const { data, error: funcError } = await supabase.functions.invoke('delete-user');

              if (funcError && !funcError.message?.includes('Unauthorized')) {
                console.error("Delete function error:", funcError);
                throw funcError;
              }

              console.log("Delete response:", data);
              await supabase.auth.signOut();

            } catch (error: any) {
              console.error("Delete account error:", error);
              toast.error(error.message || "Failed to delete account");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };



  if (loading) {
    return <Loading />;
  }


  return (
    <SafeAreaView className='flex-1 bg-slate-50'>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-row items-center gap-5 mb-8">
          <View className="h-20 w-20 rounded-full p-1 bg-indigo-50 border-2 border-indigo-100">
            <Image
              source={session?.user.user_metadata.avatar_url ?? require('@/assets/images/person.png')}
              style={{ height: '100%', width: '100%', borderRadius: 999 }}
              contentFit="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-slate-800" numberOfLines={1}>
              {session?.user.user_metadata.name || "User"}
            </Text>
            <Text className="text-sm text-slate-500 font-medium mt-1" numberOfLines={1}>
              {session?.user.email}
            </Text>
            <View className="flex-row mt-3">
              <View className="bg-indigo-100 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-indigo-600">{session?.user.app_metadata.subscription === 'Pro' ? 'Pro Member' : 'Free Tier'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* General Section */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-2">General</Text>
          <View className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">

            <View className="h-[1px] bg-slate-100 w-full" />
            <Pressable onPress={() => router.push('/(settings)/about')} className="flex-row items-center justify-between p-4 py-5 active:bg-slate-50 transition-colors">
              <View className="flex-row items-center gap-4">
                <View className="h-10 w-10 rounded-full bg-indigo-50 items-center justify-center">
                  <Info size={20} color={colors.tailwind.indigo[600]} />
                </View>
                <Text className="text-base font-semibold text-slate-700" >About App</Text>
              </View>
              <ChevronRight size={20} color={colors.tailwind.slate[400]} />
            </Pressable>
          </View>
        </View>

        {/* Actions Section */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-2">Actions</Text>
          <View className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <Pressable
              onPress={handlesignout}
              className="flex-row items-center justify-between p-4 py-5 active:bg-slate-50 transition-colors"
            >
              <View className="flex-row items-center gap-4">
                <View className="h-10 w-10 rounded-full bg-orange-50 items-center justify-center">
                  <LogOut size={20} color={colors.tailwind.orange[500]} />
                </View>
                <Text className="text-base font-semibold text-slate-700">Log Out</Text>
              </View>
              <ChevronRight size={20} color={colors.tailwind.slate[400]} />
            </Pressable>

            <View className="h-[1px] bg-slate-100 w-full" />

            <Pressable
              onPress={handleDeleteAccount}
              className="flex-row items-center justify-between p-4 py-5 active:bg-red-50 transition-colors"
            >
              <View className="flex-row items-center gap-4">
                <View className="h-10 w-10 rounded-full bg-red-50 items-center justify-center">
                  <Trash2 size={20} color={colors.tailwind.red[500]} />
                </View>
                <Text className="text-base font-semibold text-red-500">Delete Account</Text>
              </View>
              <ChevronRight size={20} color={colors.tailwind.red[200]} />
            </Pressable>
          </View>
        </View>

        <View className="items-center mt-5">
          <Text className="text-slate-400 text-xs text-center">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;