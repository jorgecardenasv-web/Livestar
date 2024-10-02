import { PasswordForm } from "@/features/profile/components/password-form";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { getSession } from "@/lib/iron-session/get-session";

export default async function Profile() {
  const session = await getSession();
  
  return (
    <section className="flex flex-col lg:flex-row gap-10">
      <ProfileForm user={session.user}/>
      <PasswordForm />
    </section>
  );
}
