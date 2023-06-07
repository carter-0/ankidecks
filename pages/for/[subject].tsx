import Navbar from "@/components/global/Navbar";
import {useRouter} from "next/router";
import StandardHero from "@/components/landing/StandardHero";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <Navbar />

            <main>
                <h1>{router.query.subject}</h1>
                <StandardHero />
            </main>
        </>
    )
}
