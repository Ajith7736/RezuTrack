import { colors } from "@/components/ui/colors";
import Loading from "@/components/ui/Loading";
import { useSession } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/lib/Toast/ToastUtility";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronRight, Crown, Info, LogOut, Trash2, Zap } from 'lucide-react-native';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Purchases from "react-native-purchases";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState<'' | 'signout' | 'delete'>("");

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
              setLoading('signout');
              await supabase.auth.signOut();
            } catch (error: any) {
              console.error("Sign Out error:", error);
              toast.error("SignOut Error");
            } finally {
              setLoading('');
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
              setLoading('delete');

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
              setLoading('');
            }
          }
        }
      ]
    );
  };


  const handlecancelSubscription = async () => {
    await Purchases.showManageSubscriptions();
  }



  return (
    <SafeAreaView className='h-screen bg-slate-50'>
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

        {/* Subscription Card */}
        {session?.user.app_metadata.subscription === 'Pro' ? (
          <View
            style={{ backgroundColor: colors.tailwind.indigo[500], borderRadius: 24, marginBottom: 24 }}
          >
            <View className="p-6">
              {/* Header */}
              <View className="flex-row items-center justify-between mb-5">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 rounded-2xl bg-white/20 items-center justify-center">
                    <Crown size={20} color="white" />
                  </View>
                  <View>
                    <Text className="text-white font-extrabold text-lg tracking-wide">Pro Plan</Text>
                    <Text className="text-indigo-200 text-xs font-medium">Active Subscription</Text>
                  </View>
                </View>
                <View className="bg-white/20 px-3 py-1.5 rounded-full border border-white/30">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-widest">Active</Text>
                </View>
              </View>

              {/* Usage Stats */}
              <View className="flex-row gap-3 mb-5">
                <View className="flex-1 bg-white/15 rounded-2xl p-4 border border-white/10">
                  <Text className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider mb-1">Resumes</Text>
                  <Text className="text-white text-2xl font-extrabold">∞</Text>
                  <Text className="text-indigo-200 text-xs mt-0.5">Unlimited</Text>
                </View>
                <View className="flex-1 bg-white/15 rounded-2xl p-4 border border-white/10">
                  <Text className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider mb-1">Applications</Text>
                  <Text className="text-white text-2xl font-extrabold">∞</Text>
                  <Text className="text-indigo-200 text-xs mt-0.5">Unlimited</Text>
                </View>
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={handlecancelSubscription}
                className="bg-white/15 border border-white/25 rounded-2xl p-4 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold text-sm tracking-wide">Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-white border border-slate-100 rounded-3xl p-6 mb-6 shadow-sm">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-2xl bg-slate-100 items-center justify-center">
                  <Zap size={20} color={colors.tailwind.slate[500]} />
                </View>
                <View>
                  <Text className="text-slate-800 font-extrabold text-lg tracking-wide">Free Plan</Text>
                  <Text className="text-slate-400 text-xs font-medium">Limited Access</Text>
                </View>
              </View>
              <View className="bg-slate-100 px-3 py-1.5 rounded-full">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Free</Text>
              </View>
            </View>

            {/* Usage Stats */}
            <View className="flex-row gap-3 mb-5">
              <View className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Resumes</Text>
                <Text className="text-slate-800 text-2xl font-extrabold">2</Text>
                <Text className="text-slate-400 text-xs mt-0.5">Max limit</Text>
              </View>
              <View className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Applications</Text>
                <Text className="text-slate-800 text-2xl font-extrabold">20</Text>
                <Text className="text-slate-400 text-xs mt-0.5">Max limit</Text>
              </View>
            </View>

            {/* Upgrade CTA */}
            <TouchableOpacity
              onPress={() => router.push('/paywall')}
              className="rounded-2xl p-4 items-center flex-row justify-center gap-2"
              style={{ backgroundColor: colors.tailwind.indigo[500] }}
              activeOpacity={0.8}
            >
              <Crown size={16} color="white" />
              <Text className="text-white font-bold text-sm tracking-wide">Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
        )}

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
              {loading === 'signout' ? <ActivityIndicator color={colors.tailwind.red[500]} /> : <ChevronRight size={20} color={colors.tailwind.red[200]} />}
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
              {loading === 'delete' ? <ActivityIndicator color={colors.tailwind.red[500]} /> : <ChevronRight size={20} color={colors.tailwind.red[200]} />}
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