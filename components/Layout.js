export default function Layout({ children }) {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '700px', fontFamily: 'sans-serif' }}>
      <header>
        <h2 style={{ color: '#2c3e50' }}>🧾 The Ledger Lounge</h2>
        <hr />
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#888' }}>
        © {new Date().getFullYear()} Wasswa Ivan Lwanga. All rights reserved.
      </footer>
    </div>
  );
}
