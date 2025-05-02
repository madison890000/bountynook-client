'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { UseCaseSection } from "@/components/UserCaseSection";

export default function LandingPage() {
  const t = useTranslations('Landing')

  const features = [
    {
      icon: '🪙',
      title: t('features.post.title'),
      desc: t('features.post.desc'),
    },
    {
      icon: '🧭',
      title: t('features.pick.title'),
      desc: t('features.pick.desc'),
    },
    {
      icon: '🌍',
      title: t('features.i18n.title'),
      desc: t('features.i18n.desc'),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1b18] to-[#2d2c28] text-[#e7e3d5] px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto">
        <Image
          src="/logo.png"
          alt="BountyNook Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold tracking-widest text-yellow-100 mb-3">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-[#bcb8ab]">{t('hero.subtitle')}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#caa76d] to-[#9a7743] text-[#1e1d1a] font-bold hover:brightness-110 shadow-md"
          >
            🐾 {t('hero.join')}
          </Link>
          <Link
            href="/tasks"
            className="px-6 py-3 rounded-lg border border-[#8c7853] text-yellow-200 hover:bg-[#2f2d29] transition"
          >
            🔍 {t('hero.browse')}
          </Link>
        </div>
      </section>

      <UseCaseSection />

      {/* Features Section */}
      <section className="mt-20 max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        {features.map((f, idx) => (
          <div key={idx} className="bg-[#252421] border border-[#8c7853] rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold text-yellow-100">{f.title}</h3>
            <p className="text-sm text-[#b8b6a9] mt-2">{f.desc}</p>
          </div>
        ))}
      </section>


      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-[#66635a] space-y-2">
        <div>
          &copy; {new Date().getFullYear()} BountyNook · {t('footer')}
        </div>
        <div className="space-x-4">
          <a
            href="https://github.com/madison890000/bountynook-client"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="text-xs text-[#5e5b52]">
          Made by an indie developer. Also built&nbsp;
          <a
            href="https://chromewebstore.google.com/detail/keep-teams-online/pbbdmfajhenpandbgeanadmmkonjkaja"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-500 transition-colors"
          >
            this Chrome extension
          </a>
          .
        </div>
      </footer>
    </div>
  )
}
