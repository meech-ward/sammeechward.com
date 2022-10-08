import { getSessionAndUser } from '../../server/user'
export default function Settings({user}) {
  return (
    <p>Settings {user.email}</p>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const { user, session } = await getSessionAndUser(req, res)

  if (!user) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(process.env.NEXTAUTH_URL)}/settings`,
        permanent: false,
      },
    }
  }

  return {
    props: {user}
  }
}