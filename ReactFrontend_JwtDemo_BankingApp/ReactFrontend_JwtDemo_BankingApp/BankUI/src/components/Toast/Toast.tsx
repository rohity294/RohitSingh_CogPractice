import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToastWrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 9999;
`;

const ToastCard = styled.div`
  background: rgba(15, 23, 42, 0.95);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.35);
  font-weight: 600;
`;

export default function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function onToast(e: Event) {
      const ce = e as CustomEvent<string>;
      setMessage(ce.detail ?? '');
      // hide after 3s
      setTimeout(() => setMessage(null), 3000);
    }

    window.addEventListener('toast', onToast as EventListener);
    return () => window.removeEventListener('toast', onToast as EventListener);
  }, []);

  if (!message) return null;
  return (
    <ToastWrapper>
      <ToastCard>{message}</ToastCard>
    </ToastWrapper>
  );
}
