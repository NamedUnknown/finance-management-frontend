import Navbar from "../components/Navbar";
import { getSession } from "next-auth/react"


export default function App({ session }) {
  if (!session) console.log("No session");
  return (
    <div className="h-[100vh] bg-[#0a0b1b]">
      <Navbar />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { session } }
}