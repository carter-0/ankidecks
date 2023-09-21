import Navbar from "@/components/global/Navbar";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function howToSeeYourSpotifyListeningTime() {
    return (
        <>
            <Head>
                <title>How to create Anki decks with AI</title>
                <meta key={'description'} name="description" content="With Anki Decks, a new website that converts your notes to flashcards, you can start learning up to 5X faster." />
                <meta key={'og:title'} property="og:title" content="How to create Anki decks with AI" />
            </Head>

            <div className={"bg-[#EEEEEE] dark:bg-[#111111] text-[#444] dark:text-[#BBBBBB]"}>
                <Navbar />
                <main>
                    <article className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center justify-left w-full bg-inherit py-4"}>
                        <div className={"flex flex-col w-full items-center"}>
                            <Image priority={true} className={"rounded-md w-[600px]"} src={"/assets/blog/htcadwa.png"} width={500} height={500} alt={''} />
                            <h1 className={"font-bold text-3xl pt-5"}>How to create Anki decks with AI</h1>
                            <p className={"text-lg font-medium"}>Posted by <span className={"font-bold"}>Carter</span> on <span className={"font-bold"}>September 21, 2023</span></p>
                        </div>

                        <div>
                            {/*<p className={"text-lg font-medium"}>Posted by <span className={"font-bold"}>carter</span> on <span className={"font-bold"}>June 10, 2021</span></p>*/}
                        </div>

                        <div className={"prose text-lg pt-10"}>
                            <p>If you&apos;re tired of spending hours creating flashcards, leaving no time to actually learn them - AI generated cards might be for you.</p>

                            <p>In this article, we&apos;ll show you how to automatically convert lecture sides and notes into effective Anki decks.</p>

                            <p>1. Go to the <Link href={"/"}>Anki Decks website</Link> and click on the &apos;Create a Deck&apos; button.</p>
                            <div className={"flex justify-center"}>
                                <Image className={"rounded-md w-[600px]"} src={"/assets/blog/step-1.png"} width={500} height={500} alt={''} />
                            </div>

                            <p>2. Log in with one of the available methods.</p>
                            <div className={"flex justify-center"}>
                                <Image className={"rounded-md w-[600px]"} src={"/assets/blog/step-2.png"} width={500} height={500} alt={''} />
                            </div>

                            <p>3. Once you&apos;re logged in, you&apos;ll be given the option to either &apos;Create a deck&apos; or &apos;Explore the dashboard&apos;.</p>
                            <div className={"flex justify-center"}>
                                <Image className={"rounded-md w-[600px]"} src={"/assets/blog/step-3.png"} width={500} height={500} alt={''} />
                            </div>

                            <p>4. Click on &apos;Create a deck&apos; and fill out all the required information. In the &apos;Flashcard Source&apos; box make sure to put your notes. You can always add more cards later so don&apos;t worry if they don&apos;t all fit in one request.</p>
                            <div className={"flex justify-center"}>
                                <Image className={"rounded-md w-[600px]"} src={"/assets/blog/step-4.png"} width={500} height={500} alt={''} />
                            </div>

                            <h2 className={"font-bold text-2xl"}>Benefits of AI Generated Anki Decks</h2>
                            <p>Now that you know how to generate AI Anki cards, lets discuss why you should start creating with Anki Decks. Here are some benefits to consider:</p>

                            {/*<h3 className={"font-bold text-xl"}>Method 2a: Change Your Username in the App</h3>*/}

                            <p>1. <b>Save time</b>: By deferring the creation of Anki Decks to an AI model, you can save hours. If you&apos;ve already made notes, why waste more time writing them out again in a different format?</p>
                            <p>2. <b>Increase productivity</b>: Anki Decks forces AI models to use the minimum information principle along with other research-backed methods to increase the effectiveness of the flashcards we generate. This means less time learning the science of making flashcards and more time learning!</p>
                            <p>3. <b>Add tags to learn specific subjects</b>: Anki Decks recently added a new feature: AI tagging. If you want to learn just a particular topic out of your deck, you can rely on us to tag your cards, allowing you to study how you want.</p>

                            <h2 className={"font-bold text-2xl"}>Start creating flashcards today with <Link href={"/"} className={"font-bold text-sp-green"}>Anki Decks</Link></h2>
                            <div className={"flex justify-center"}>
                                <Image className={"rounded-md w-[600px]"} src={"/assets/blog/htcadwa.png"} width={600} height={500} alt={''} />
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </>
    )
}