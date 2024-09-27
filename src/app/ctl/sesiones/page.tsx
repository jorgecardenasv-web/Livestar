import { HeaderSessions } from "@/features/session/components/header-sessions";
import { ListSessions } from "@/features/session/components/list-sessions";
import { getSessions } from "@/features/session/loaders/get-sessions";
import { getSession } from "@/lib/iron-session/get-session";

export default async function SessionPage () {
  const session = await getSession();
  const sessions = await getSessions(session.sessionId!)
  return (
    <div>
      <HeaderSessions />
      <ListSessions sessions={sessions} />
    </div>
  )
}