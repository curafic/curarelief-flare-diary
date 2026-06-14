'use client';

import { useChat } from 'ai/react';
import { useState, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '600px', margin: '0 auto', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
      {/* Brand Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#333', fontWeight: '600' }}>CuraRelief Skin Coach</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#888' }}>14-Day Interactive Flare-Up Diary</p>
      </div>

      {/* Chat Messages Stream */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#666', padding: '0 20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤍</div>
            <p style={{ fontWeight: '600', margin: '0 0 8px' }}>Welcome to your tracking portal.</p>
            <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: '1.5' }}>Type "Hello" or "Start" below to accept our data privacy consent and begin tracking your active eczema flare-up metrics.</p>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap', backgroundColor: m.role === 'user' ? '#333' : '#f0f0f0', color: m.role === 'user' ? '#fff' : '#333' }}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ fontSize: '12px', color: '#999', italic: 'true' }}>Skin Coach is writing...</div>
        )}
      </div>

      {/* Interactive Form Controls */}
      <form onSubmit={(e) => handleSubmit(e, { experimental_attachments: files })} style={{ padding: '16px', borderTop: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
        {files && (
          <div style={{ padding: '4px 8px', marginBottom: '8px', backgroundColor: '#f0f7f4', borderRadius: '4px', fontSize: '12px', color: '#2e7d32', display: 'inline-block' }}>
            📸 Image attached ready to upload ({files.length})
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* File Upload Attachment Trigger */}
          <button type="button" onClick={() => fileInputRef.current?.click()} style={{ padding: '10px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
            📎
          </button>
          
          <input type="file" ref={fileInputRef} multiple onChange={(e) => setFiles(e.target.files)} style={{ display: 'none' }} accept="image/*" />

          {/* Text Input Line */}
          <input value={input} onChange={handleInputChange} placeholder="Type your skin update here..." style={{ flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }} />
          
          {/* Send Trigger */}
          <button type="submit" style={{ padding: '10px 16px', borderRadius: '24px', border: 'none', backgroundColor: '#333', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
