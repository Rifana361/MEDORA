import type {ReactNode} from 'react';
export default function PolicyPage({title,intro,children}:{title:string;intro:string;children:ReactNode}) {
 return <main className="medora-policy"><a className="policy-brand" href="/"><img src="/medora-logo-v2.png" alt="" width={44} height={44}/>MEDORA</a><p className="policy-eyebrow">BY RIFANA · UPDATED 9 NOVEMBER 2026</p><h1>{title}</h1><p className="policy-intro">{intro}</p><nav aria-label="Medora information"><a href="/support">Support</a><a href="/privacy">Privacy policy</a><a href="/terms">Terms of use</a></nav><article>{children}</article><a className="policy-home" href="/">Return to Medora →</a></main>
}
