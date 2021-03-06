import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
function Login({ providers }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 bg-black">
      <Image
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
        className="mb-5 h-52"
        width={208}
        height={208}
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#18D860] p-5 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
