import { useEffect, useState } from 'react';
import styled from '../../utils/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.5rem 0.9rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const Meta = styled.div`
  padding: 0.75rem;
  font-size: 0.9rem;
  display: grid;
  gap: 0.4rem;
`;

export default function AdminGallery() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const res = await fetch('/api/admin/photos', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      setItems(data.items || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this photo and its file?')) return;
    const token = localStorage.getItem('admin_token') || '';
    const url = `/api/admin/photos?id=${encodeURIComponent(id)}`;
    const res = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Delete failed');
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  if (!authenticated) {
    return (
      <Container>
        <div style={{ padding: '3rem', textAlign: 'center' }}>🔄 Loading…</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0 }}>📚 Admin Gallery</h1>
            <div style={{ opacity: 0.85 }}>View and manage uploaded photos</div>
          </div>
          <Actions>
            <Link href="/admin/photos"> <Button>📸 Upload Photos</Button></Link>
            <Link href="/admin/dashboard"> <Button>← Dashboard</Button></Link>
          </Actions>
        </div>
      </Header>
      <Main>
        {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <div>Loading…</div>
        ) : (
          <Grid>
            {items.map((it) => (
              <Card key={it.id}>
                <Thumb src={it.url} alt={it.filename || it.photoType || 'photo'} />
                <Meta>
                  <div><strong>Type:</strong> {it.photoType || '-'}</div>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} title={it.url}><strong>URL:</strong> {it.url}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Button onClick={() => window.open(it.url, '_blank')}>Open</Button>
                    <Button onClick={() => navigator.clipboard.writeText(it.url)}>Copy URL</Button>
                    <Button onClick={() => onDelete(it.id)}>Delete</Button>
                  </div>
                </Meta>
              </Card>
            ))}
          </Grid>
        )}
        {!loading && items.length === 0 && (
          <div style={{ color: '#6b7280' }}>No photos yet. Upload some from the Photo Manager.</div>
        )}
      </Main>
    </Container>
  );
}

