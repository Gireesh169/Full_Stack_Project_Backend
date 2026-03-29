import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getNotificationsByRole, markNotificationAsRead } from '../api/notificationsApi'

const REFRESH_INTERVAL_MS = 8000

const NotificationBell = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const rootRef = useRef(null)

  const role = user?.role

  const fetchNotifications = async (silent = false) => {
    if (!role) return
    if (!silent) setLoading(true)

    try {
      const { data } = await getNotificationsByRole(role)
      const list = Array.isArray(data) ? data : []
      const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setNotifications(sorted)
    } catch {
      if (!silent) toast.error('Failed to load notifications')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [role])

  useEffect(() => {
    if (!role) return undefined

    const intervalId = setInterval(() => {
      fetchNotifications(true)
    }, REFRESH_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [role])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications],
  )

  const handleNotificationClick = async (item) => {
    if (!item || item.isRead) return

    try {
      await markNotificationAsRead(item.id)
      setNotifications((prev) =>
        prev.map((entry) =>
          entry.id === item.id ? { ...entry, isRead: true } : entry,
        ),
      )
    } catch {
      toast.error('Failed to mark notification as read')
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open
          setOpen(nextOpen)
          if (nextOpen) fetchNotifications(true)
        }}
        className="relative rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-white"
        aria-label="Notifications"
      >
        <span className="text-base">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
            <button
              type="button"
              onClick={() => fetchNotifications()}
              className="text-xs font-semibold text-teal-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-500">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">No notifications</p>
          ) : (
            <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {notifications.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNotificationClick(item)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                      item.isRead
                        ? 'border-slate-200 bg-slate-50 text-slate-600'
                        : 'border-teal-200 bg-teal-50 text-slate-800'
                    }`}
                  >
                    <p className="text-sm font-semibold">{item.message}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Just now'}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
