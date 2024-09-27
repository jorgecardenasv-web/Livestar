import { ListSessions } from "@/features/session/components/list-sessions";
import { getSessions } from "@/features/session/loaders/get-sessions";
import { getSession } from "@/lib/iron-session/get-session";

export default async function SessionPage () {
  const session = await getSession();
  const sessions = await getSessions(session.sessionId!)
  return (
    <div>
      <h1>Sesiones</h1>
      <ListSessions sessions={sessions} />
    </div>
  )
}