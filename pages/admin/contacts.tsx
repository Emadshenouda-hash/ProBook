import { useEffect, useMemo, useState } from 'react';
import styled from '../../utils/styled';
import Link from 'next/link';

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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 0.9rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
`;

export default function AdminContacts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [unsub, setUnsub] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (type) params.set('type', type);
      if (unsub) params.set('unsubscribed', unsub);
      const res = await fetch(`/api/admin/contacts?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      setItems(data.items || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExport = async () => {
    const token = localStorage.getItem('admin_token') || '';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (type) params.set('type', type);
    if (unsub) params.set('unsubscribed', unsub);
    params.set('format', 'csv');
    const res = await fetch(`/api/admin/contacts?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleUnsub = async (id: string, val: boolean) => {
    const token = localStorage.getItem('admin_token') || '';
    const res = await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, unsubscribed: val })
    });
    if (res.ok) {
      setItems((prev) => prev.map((x) => (x.id === id ? { ...x, unsubscribed: val } : x)));
    }
  };

  return (
    <Container>
      <Header>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0 }}>👥 Contacts</h1>
            <div style={{ opacity: 0.85 }}>Subscribers, consultations, and contact messages</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link href="/admin/dashboard">← Dashboard</Link>
          </div>
        </div>
      </Header>
      <Main>
        <Actions>
          <Input placeholder="Search email or name" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            <option value="subscriber">Subscribers</option>
            <option value="consultation">Consultations</option>
            <option value="contact">Contacts</option>
          </Select>
          <Select value={unsub} onChange={(e) => setUnsub(e.target.value)}>
            <option value="">All</option>
            <option value="false">Subscribed</option>
            <option value="true">Unsubscribed</option>
          </Select>
          <Button onClick={load} disabled={loading}>Filter</Button>
          <Button onClick={onExport}>Export CSV</Button>
        </Actions>

        {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <div>Loading…</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Email</Th>
                <Th>Type</Th>
                <Th>Name</Th>
                <Th>Plan</Th>
                <Th>Promo</Th>
                <Th>Source</Th>
                <Th>Tags</Th>
                <Th>Consent</Th>
                <Th>Unsub</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <Td>{it.email}</Td>
                  <Td>{it.type}</Td>
                  <Td>{it.name || ''}</Td>
                  <Td>{it.selectedPlan || ''}</Td>
                  <Td>{[it.promoCode, it.promoName].filter(Boolean).join(' / ')}</Td>
                  <Td>{it.source || ''}</Td>
                  <Td>{(it.tags || []).join(', ')}</Td>
                  <Td>{it.consent ? 'Yes' : 'No'}</Td>
                  <Td>
                    <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                      <input type="checkbox" checked={!!it.unsubscribed} onChange={(e) => toggleUnsub(it.id, e.target.checked)} />
                      {it.unsubscribed ? 'Unsubscribed' : 'Active'}
                    </label>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Main>
    </Container>
  );
}

