import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
export default function Welcome() {
    const { auth } = usePage().props;
    return (<>
            <Head title="Welcome"/>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (<Link href={dashboard()} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                Dashboard
                            </Link>) : (<>
                                <Link href={login()} className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">
                                    Log in
                                </Link>
                                <Link href={register()} className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                    Register
                                </Link>
                            </>)}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">
                                Let's get started
                            </h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Welcome to Task Manager.
                                <br />
                                Manage your tasks efficiently and get things done.
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]"/>
                                        </span>
                                    </span>
                                    <span>
                                        Already have an account?
                                        <Link href={login()} className="ml-1 inline-flex items-center space-x-1 font-medium text-[#2563eb] underline underline-offset-4 dark:text-[#60a5fa]">
                                            <span>Log in</span>
                                            <svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5">
                                                <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor" strokeLinecap="square"/>
                                            </svg>
                                        </Link>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]"/>
                                        </span>
                                    </span>
                                    <span>
                                        New here?
                                        <Link href={register()} className="ml-1 inline-flex items-center space-x-1 font-medium text-[#2563eb] underline underline-offset-4 dark:text-[#60a5fa]">
                                            <span>Create an account</span>
                                            <svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5">
                                                <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor" strokeLinecap="square"/>
                                            </svg>
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <Link href={login()} className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white">
                                        Get started
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/364] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#f0f7ff] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#0A1628]">
                            <svg className="w-full max-w-none translate-y-0 text-[#2563eb] opacity-100 transition-all duration-750 dark:text-[#60a5fa] starting:opacity-0 motion-safe:starting:translate-y-6" viewBox="0 0 438 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 52C20 39.85 29.85 30 42 30H118C130.15 30 140 39.85 140 52C140 64.15 130.15 74 118 74H42C29.85 74 20 64.15 20 52ZM47 52L55 60L80 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                <rect x="170" y="30" width="248" height="10" rx="5" fill="currentColor" opacity="0.3"/>
                                <rect x="170" y="50" width="180" height="10" rx="5" fill="currentColor" opacity="0.5"/>
                                <rect x="170" y="70" width="210" height="10" rx="5" fill="currentColor" opacity="0.2"/>
                            </svg>

                            <svg className="relative -mt-[6.6rem] -ml-8 w-[438px] max-w-none [--stroke-color:#1E40AF] lg:ml-0 dark:[--stroke-color:#93C5FD]" viewBox="0 0 440 392" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g className="text-[#1E3A8A] opacity-100 mix-blend-darken transition-all delay-300 duration-750 dark:text-[#1E3A8A] dark:mix-blend-normal starting:opacity-0">
                                    <rect x="40" y="60" width="300" height="280" rx="16" fill="#FFFFFF" fillOpacity="0.95" stroke="currentColor" strokeWidth="3"/>
                                    <rect x="70" y="100" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                                    <path d="M75 112L82 119L90 108" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="110" y="95" width="200" height="14" rx="7" fill="currentColor" fillOpacity="0.4"/>
                                    <rect x="110" y="115" width="140" height="10" rx="5" fill="currentColor" fillOpacity="0.2"/>
                                    <rect x="70" y="150" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                                    <path d="M75 162L82 169L90 158" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="110" y="145" width="180" height="14" rx="7" fill="currentColor" fillOpacity="0.4"/>
                                    <rect x="110" y="165" width="120" height="10" rx="5" fill="currentColor" fillOpacity="0.2"/>
                                    <rect x="70" y="200" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                                    <rect x="110" y="195" width="220" height="14" rx="7" fill="currentColor" fillOpacity="0.3"/>
                                    <rect x="110" y="215" width="160" height="10" rx="5" fill="currentColor" fillOpacity="0.15"/>
                                    <rect x="70" y="250" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="3"/>
                                    <rect x="110" y="245" width="190" height="14" rx="7" fill="currentColor" fillOpacity="0.3"/>
                                    <rect x="110" y="265" width="130" height="10" rx="5" fill="currentColor" fillOpacity="0.15"/>
                                </g>

                                <g className="text-[#DBEAFE] opacity-100 transition-all delay-400 duration-750 dark:text-[#1E40AF] starting:opacity-0 motion-safe:starting:-translate-x-[26px]">
                                    <rect x="65" y="85" width="300" height="280" rx="16" fill="currentColor" fillOpacity="0.35"/>
                                </g>

                                <g className="text-[#F59E0B] opacity-100 mix-blend-color transition-all delay-400 duration-750 dark:text-[#92400E] dark:mix-blend-hard-light starting:opacity-0 motion-safe:starting:-translate-x-[51px]">
                                    <circle cx="350" cy="90" r="42" fill="#10B981" fillOpacity="0.95"/>
                                    <path d="M332 92L344 104L368 78" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>

                                <g className="text-[#DBEAFE] opacity-100 mix-blend-multiply transition-all delay-400 duration-750 dark:text-[#1E40AF] dark:mix-blend-normal starting:opacity-0 motion-safe:starting:-translate-x-[78px]">
                                    <circle cx="88" cy="88" r="20" fill="currentColor" fillOpacity="0.6"/>
                                </g>

                                <g className="text-[#60A5FA] opacity-100 mix-blend-hard-light transition-all delay-400 duration-750 dark:text-[#3B82F6] starting:opacity-0 motion-safe:starting:-translate-x-[102px]">
                                    <circle cx="345" cy="310" r="26" fill="currentColor" fillOpacity="0.5"/>
                                </g>
                            </svg>
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#1e3a8a40]"></div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>);
}
