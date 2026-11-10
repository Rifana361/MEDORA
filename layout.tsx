import type {Metadata} from 'next';
import './globals.css';
import './studio.css';
import './policies.css';
import './flashcards.css';
import './tutor-studio.css';
import './support-chat.css';
import './welcome.css';
export const metadata:Metadata={title:'MEDORA',icons:{icon:[{url:'/medora-logo-v2.png',type:'image/png'}],apple:[{url:'/medora-logo-v2.png',type:'image/png'}]},description:'Your sources. Your lightbulb moment. Upload, understand, visualise and test your knowledge with Medora.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<footer className="developer-credit">Developer : Rifana<nav className="medora-footer-links" aria-label="Medora information"><a href="/support">Support</a><a href="/privacy">Privacy policy</a><a href="/terms">Terms of use</a></nav></footer></body></html>}
