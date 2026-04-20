export function OgCard({ pageLabel, subtitle }: { pageLabel?: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#3D5A73',
      }}
    >
      {pageLabel && (
        <div
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 22,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          {pageLabel}
        </div>
      )}
      <div
        style={{
          color: '#ffffff',
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          lineHeight: 1.1,
          display: 'flex',
        }}
      >
        Karan Singh Dhir
      </div>
      <div
        style={{
          width: 56,
          height: 3,
          backgroundColor: 'rgba(255,255,255,0.35)',
          marginTop: 28,
          marginBottom: 28,
          display: 'flex',
        }}
      />
      <div
        style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 26,
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
        }}
      >
        {subtitle ?? 'Senior Software Engineer · Vancouver, BC'}
      </div>
    </div>
  )
}
