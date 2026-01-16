import { useState } from 'react';
import { enableNotifications, disableNotifications, pushConfigured, storedPushToken } from '../lib/notifications';
export default function NotificationSettings({ roomId }: { roomId: string }) {
  const [enabledRoom, setEnabledRoom] = useState(() => storedPushToken() ? localStorage.getItem('push_room') : null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (!pushConfigured || !localStorage.getItem('token')) return null;
  async function change(enable: boolean) {
    setBusy(true); setError('');
    try {
      if (enable) await enableNotifications(roomId); else await disableNotifications();
      setEnabledRoom(enable ? roomId : null);
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not update alerts.'); }
    finally { setBusy(false); }
  }
  return <div className="px-6 py-3 border-b border-[var(--border-color)] text-sm">
    <button className="underline disabled:opacity-50" disabled={busy} onClick={() => change(enabledRoom !== roomId)}>
      {busy ? 'Updating alerts…' : enabledRoom === roomId ? 'Disable room notifications' : 'Notify me about this room'}
    </button>
    {enabledRoom && enabledRoom !== roomId && <button className="ml-4 underline" disabled={busy} onClick={() => change(false)}>Disable existing alerts</button>}
    <span className="ml-3 text-[var(--text-secondary)]">Alerts apply to one room on this browser.</span>
    {error && <p role="alert" className="mt-2 text-red-600">{error}</p>}
  </div>;
}
