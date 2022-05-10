import { getProviders, signIn as signProvider } from 'next-auth/react';
import Header from '../../components/Header';

function signIn({ providers }) {
    return (
        <>
        <Header />
            <div className="mt-40 flex items-center justify-center">
                {Object.values(providers).map(provider => (
                    <div key={provider.name}>
                        <button className="p-3 bg-blue-500 rounded-lg text-white" 
                        onClick={() => signProvider(provider.id, { callbackUrl: "/" })}>
                            Sign In with { provider.name }
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    }
}

export default signIn
