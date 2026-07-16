import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { FooterWrapper } from './Footer.styled';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
   const [username, setUsername] = useState<string | null>(
     typeof window !== 'undefined' ? sessionStorage.getItem('auth_username') : null,
   );

   useEffect(() => {
     function onAuthChange() {
       const u = typeof window !== 'undefined' ? sessionStorage.getItem('auth_username') : null;
       setUsername(u);
     }

     window.addEventListener('authChange', onAuthChange);
     return () => window.removeEventListener('authChange', onAuthChange);
   }, []);

   return (
      <FooterWrapper data-testid="Footer">
         <div>
            <div style={{ fontWeight: 600 }}>BankUI © {new Date().getFullYear()}</div>
            <div style={{ marginTop: 4, color: '#cbd5e1' }}>{username ? `Signed in as ${username}` : 'Not signed in'}</div>
         </div>
      </FooterWrapper>
   );
};

export default Footer;
