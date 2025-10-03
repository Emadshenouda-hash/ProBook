import { useEffect, useMemo, useState } from 'react';
import styled from '../../utils/styled';
import Link from 'next/link';
import enData from '../../locales/en.json';
import arData from '../../locales/ar.json';

const Container = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
`;

const Header = styled.header`
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  padding: 1.25rem 2rem;
`;

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  align-items: start;
`;

const Panel = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
`;

const KeyItem = styled.div`
  padding: 0.5rem 0.25rem;
  border-bottom: 1px dashed var(--color-border);
  font-size: 0.95rem;
`;

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  Object.keys(obj || {}).forEach((k) => {
    const val = (obj as any)[k];
    const path = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(out, flatten(val, path));
    } else {
      out[path] = String(val);
    }
  });
  return out;
}

export default function AdminTranslations() {
  const [q, setQ] = useState('');
  const en = useMemo(() => flatten(enData as any), []);
  const ar = useMemo(() => flatten(arData as any), []);
  const keys = useMemo(() => Array.from(new Set([...Object.keys(en), ...Object.keys(ar)])).sort(), [en, ar]);

  const filtered = useMemo(() => {
    if (!q) return keys;
    const needle = q.toLowerCase();
    return keys.filter((k) => k.toLowerCase().includes(needle) || (en[k] || '').toLowerCase().includes(needle) || (ar[k] || '').toLowerCase().includes(needle));
  }, [keys, q, en, ar]);

  return (
    <Container>
      <Header>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0 }}>🌍 Translations</h1>
            <div style={{ opacity: 0.85 }}>Search and review i18n keys (read-only)</div>
          </div>
          <Link href="/admin/dashboard">← Dashboard</Link>
        </div>
      </Header>
      <Main>
        <Input placeholder="Search keys or text" value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)} />
        <Grid>
          <Panel>
            <h3>EN</h3>
            {filtered.map((k) => (
              <KeyItem key={`en:${k}`}>
                <div style={{ color: '#6b7280', fontSize: 12 }}>{k}</div>
                <div>{en[k] || <em style={{ color: '#dc2626' }}>— missing —</em>}</div>
              </KeyItem>
            ))}
          </Panel>
          <Panel>
            <h3>AR</h3>
            {filtered.map((k) => (
              <KeyItem key={`ar:${k}`}>
                <div style={{ color: '#6b7280', fontSize: 12 }}>{k}</div>
                <div dir="rtl">{ar[k] || <em style={{ color: '#dc2626' }}>— missing —</em>}</div>
              </KeyItem>
            ))}
          </Panel>
        </Grid>
      </Main>
    </Container>
  );
}

