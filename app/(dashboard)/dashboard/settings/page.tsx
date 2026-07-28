"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Save, Loader2, Lock, Key, ShieldCheck, LogOut, User } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [nameData, setNameData] = useState({ name: "" });
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setIsChangingPassword(true);
    try {
      const res = await authClient.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        revokeOtherSessions: true,
      });
      if (res.error) {
        toast.error(res.error.message || "Failed to change password.");
      } else {
        toast.success("Password changed successfully! Please log in again.");
        await signOut();
        router.push("/login");
      }
    } catch {
      toast.error("An error occurred while changing the password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your admin account.</p>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
          <User className="w-5 h-5 text-[#1a3a8f]" /> Account Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Name</span>
            <span className="text-sm font-semibold text-gray-900" suppressHydrationWarning>
              {session?.user?.name || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-sm font-semibold text-gray-900" suppressHydrationWarning>
              {session?.user?.email || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-500">Role</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-100 text-[#1a3a8f] px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Key className="w-5 h-5 text-[#f97316]" /> Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
                placeholder="Enter current password"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                minLength={8}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
                placeholder="Minimum 8 characters"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-[#1a3a8f] focus:border-[#1a3a8f] outline-none"
                placeholder="Re-enter new password"
              />
            </div>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center gap-2 bg-[#1a3a8f] hover:bg-[#0f2560] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-70 text-sm"
            >
              {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="text-base font-bold text-red-700 mb-4 flex items-center gap-2">
          <LogOut className="w-5 h-5" /> Session
        </h2>
        <p className="text-sm text-gray-500 mb-4">Sign out from the admin dashboard.</p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
