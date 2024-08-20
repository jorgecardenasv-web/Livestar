import { getServerSession } from "@/features/auth/services/auth";
import { PasswordForm } from "@/features/profile/components/password-form";
import { ProfileForm } from "@/features/profile/components/profile-form";

export default async function Profile() {
  const session = await getServerSession();
  
  return (
    <section className="flex flex-col lg:flex-row gap-10">
      <ProfileForm user={session?.user}/>
      <PasswordForm />
    </section>
  );
}
